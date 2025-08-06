
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
import { DeepPartial } from 'typeorm';

export interface IEntitySchemaFactory<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends object,
> {
  create(entity: object): DeepPartial<TSchema>;
  createFromSchema(entitySchema: TSchema): TEntity;
  findAllToDto(
    data: TSchema[],
    dataLength: number,
    count: number,
    page: number,
    take: number,
  ): GenericFindAllDomainResponse<TEntity>;
}
