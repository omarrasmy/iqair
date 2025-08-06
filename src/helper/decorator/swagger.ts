// src/common/decorators/swagger/api-doc.decorator.ts
import {
    applyDecorators,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiAcceptedResponse,
    ApiBearerAuth,
    ApiBody,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorator/public.decorator';

export function ApiDocs(options: {
    summary: string;
    body?: Function;
    response?: Function;
    statusCode?: HttpStatus;
    isPublic?: boolean;
}) {
    return applyDecorators(
        ApiOperation({ summary: options.summary }),
        options.body ? ApiBody({ type: options.body }) : () => { },
        options.response
            ? ApiAcceptedResponse({
                type: options.response,
                description: `${options.summary} successfully`,
            })
            : () => { },

        options.isPublic ? Public()
            : ApiBearerAuth(),
        HttpCode(options.statusCode ?? HttpStatus.CREATED),
    );
}
