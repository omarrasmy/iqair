// param-check.decorator.ts

import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import entities from 'src/database/entities/entities';
import { Repository } from 'typeorm';
import { EntitiesEnum } from '../enums/entities.enum';
type ParamsToCheck = string[];

export const ParamCheck = createParamDecorator(
  async (
    data: { tableName: Array<EntitiesEnum>; paramsToCheck: Array<string> },
    ctx: ExecutionContext,
  ) => {
    let { tableName, paramsToCheck } = data as {
      tableName: ParamsToCheck;
      paramsToCheck: ParamsToCheck;
    };
    const request = ctx.switchToHttp().getRequest();
    if (tableName.length !== paramsToCheck.length) {
      throw new BadRequestException('Invalid params');
    }
    for (let i = 0; i < tableName.length; i++) {
      const repository = entities[tableName[i]] as Repository<any>;
      const paramValue = parseInt(request.params[paramsToCheck[i]]);

      const entity = await repository.findOne({ where: { id: paramValue } });
      if (!entity) {
        throw new NotFoundException(`Entity Not Found`);
      }
    }
    return paramsToCheck.reduce((params, paramName) => {
      params[paramName] = isNaN(Number(request.params[paramName])) ? request.params[paramName] : parseInt(request.params[paramName]);
      return params;
    }, {});
  },
);
