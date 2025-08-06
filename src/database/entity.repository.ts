import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Brackets,
  DeepPartial,
  DeleteResult,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { IEntitySchemaFactory } from './interface.entity-schema.factory';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { GenericFindAllDomainResponse } from 'src/helper/dto/generic-domain-find-all-response.dto';
export abstract class EntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends object,
> {
  constructor(
    protected readonly entityRepository: Repository<TSchema>,
    protected readonly entitySchemaFactory: IEntitySchemaFactory<
      TSchema,
      TEntity
    >,
  ) { }

  async findAll(
    options: FindOneOptions<TSchema>,
    take?: number,
    page?: number,
  ): Promise<GenericFindAllDomainResponse<TEntity>> {
    let skip = 0;
    if (!take || page === undefined || page === null) {
      take = 10; // Default value if not provided
      page = 1; // Default value if not provided
    }
    else {
      skip = (page - 1) * take; // Calculate skip based on page number
    }
    const [data, count] = await this.entityRepository.findAndCount({
      ...options,
      take,
      skip,
    });
    return this.entitySchemaFactory.findAllToDto(data, data.length, count, page, take);
  }
  async findOne(options: FindOneOptions<TSchema>): Promise<TEntity> {
    const entity = await this.entityRepository.findOne(options);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return this.entitySchemaFactory.createFromSchema(entity);
  }

  async create(entity: object): Promise<TEntity> {
    const user = this.entitySchemaFactory.create(entity);
    return this.entitySchemaFactory.createFromSchema(await this.entityRepository.save(user));
  }

  async update(
    id: number,
    entity: object,
  ): Promise<TEntity> {
    let updatedEntity = this.entitySchemaFactory.create(entity);
    const updateResult = await this.entityRepository.update(id, updatedEntity as QueryDeepPartialEntity<TSchema>);
    if (updateResult.affected === 0) {
      throw new NotFoundException('User not found for update');
    }
    return this.findOne({ where: { id } as FindOptionsWhere<TSchema> });
  }

  async delete(id: number): Promise<DeleteResult> {
    const result = await this.entityRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found for deletion');
    }
    return result;
  }

  async softDelete(
    entityFilterQuery: FindOneOptions<TSchema>,
  ): Promise<TSchema> {
    const oldEntity = await this.entityRepository.findOne(entityFilterQuery);
    if (!oldEntity) throw new NotFoundException('Entity is not found!');
    return this.entityRepository.softRemove(oldEntity);
  }


}
