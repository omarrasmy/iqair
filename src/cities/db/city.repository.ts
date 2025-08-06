import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { Cities } from "./city.entity";
import { CITY_INTERFACE_SCHEMA_FACTORY } from "../interface/city.tokens";
import { CityResponseDto } from "../dto/find-city.dto";
import { CityInterfaceRepository } from "../interface/city.interface.repository";
import { CityInterfaceSchemaFactory } from "../interface/city.interface.schema.factory";

@Injectable()
export class CitiesRepository extends EntityRepository<Cities, CityResponseDto> implements CityInterfaceRepository {
    constructor(
        @InjectRepository(Cities)
        protected readonly repository: Repository<Cities>,
        @Inject(CITY_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: CityInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }
    async findOneBylongAndLat(options: { long: number, lat: number }): Promise<CityResponseDto> {
        const city = await this.repository
            .createQueryBuilder('cities')
            .orderBy(
                `ST_Distance_Sphere(cities.location, ST_GeomFromText('POINT(${options.long} ${options.lat})', 4326))`,
            )
            .limit(1)
            .getOne();
        return this.entitySchemaFactory.createFromSchema(city);
    }


}