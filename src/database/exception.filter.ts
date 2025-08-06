import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { Response, Request } from 'express'; // Add this import if not already present
import { PostgresErrorCode, MysqlErrorCode } from './postgresErrorCodes.enum';

@Catch(
  QueryFailedError,
  EntityNotFoundError,
  InternalServerErrorException,
  ForbiddenException,
  HttpException,
  BadRequestException,
  Error,
)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name } = exception;
    let code = exception['code'];

    if (!code) code = exception['status'];
    let errorResponse = {
      timestamp: new Date().toISOString(),
    };
    switch (code) {
      case PostgresErrorCode.UniqueViolation:
      case MysqlErrorCode.DuplicateEntry:
        let detail = exception['detail'] ?? exception['driverError']?.message;
        if (detail) {
          errorResponse['message'] = [
            detail
              .split('=')[0]
              .split(' ')[1]
              .replace(/[()""]/g, '') + ' already exists',
          ];
        }
        errorResponse['statusCode'] = HttpStatus.BAD_REQUEST;
        break;

      case PostgresErrorCode.ForeignKeyViolation:
      case MysqlErrorCode.RowIsReferenced:
        const message = exception['driverError'].message.split('\n')[0];

        const regex =
          /update or delete on table "(.*?)" violates foreign key constraint .*? on table "(.*?)"/;
        const matches = message.match(regex);

        // if (matches && matches.length === 3)
        const mainTable = matches[1];
        const relatedTable = matches[2];

        const formattedMainTable = mainTable.replace('_', ' ').slice(0, -1); // Singularize and format
        const formattedRelatedTable = relatedTable.replace('_', ' ');

        errorResponse['message'] = [
          `You must delete all the ${formattedRelatedTable} of this ${formattedMainTable}.`,
        ];
        errorResponse['statusCode'] = HttpStatus.BAD_REQUEST;
        break;

      case PostgresErrorCode.InvalidForeignKey:
      case MysqlErrorCode.NoReferencedRow:
        errorResponse['message'] = ['key send are not found'];
        errorResponse['statusCode'] = HttpStatus.BAD_REQUEST;
        break;
      case HttpStatus.UNAUTHORIZED:
      case HttpStatus.BAD_REQUEST:
      case HttpStatus.NOT_FOUND:
      case HttpStatus.FORBIDDEN:
        errorResponse['message'] =
          typeof exception['response']['message'] != 'string'
            ? exception['response']['message']
            : [exception['response']['message']];
        errorResponse['statusCode'] = code;
        break;
      case PostgresErrorCode.NotNullViolation:
      case MysqlErrorCode.BadNullError:
        errorResponse['message'] = [exception['column'] + ' is required'];
        errorResponse['statusCode'] = HttpStatus.BAD_REQUEST;
        break;
      default:
        console.log(exception);
        console.log('Instance type:', exception.constructor.name);
        errorResponse['message'] = [
          'something went wrong please try again later',
        ];
        errorResponse['statusCode'] = HttpStatus.BAD_REQUEST;
    }
    response.status(errorResponse['statusCode']).json(errorResponse);
  }
}
