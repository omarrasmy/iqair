import { NotFoundException } from '@nestjs/common';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import {
  DeepPartial,
  DeleteResult,
  FindOneOptions,
} from 'typeorm';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
export interface IEntityRepository<TSchema extends IdentifiableEntitySchema, TEntity> {
  findAll(
    options: FindOneOptions<TSchema>,
    take?: number,
    page?: number,
  ): Promise<GenericFindAllDomainResponse<TEntity>>;

  findOne(options: FindOneOptions<TSchema>): Promise<TEntity>;
  create(entity: object): Promise<TEntity>;
  update(
    id: number,
    entity: DeepPartial<TSchema>,
  ): Promise<TEntity>;

  delete(id: number): Promise<DeleteResult>;
  softDelete(findOption: FindOneOptions<TSchema>): Promise<TSchema>;
}
