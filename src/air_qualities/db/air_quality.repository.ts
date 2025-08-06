import { EntityRepository } from "src/database/entity.repository";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AIRQUALITY_INTERFACE_SCHEMA_FACTORY } from "../interface/air_quality.tokens";
import { AirQualities } from "./air_quality.entity";
import { AirQualityResponseDto } from "../dto/find-air_quality.dto";
import { AirQualityInterfaceRepository } from "../interface/air_quality.interface.repository";
import { AirQualityInterfaceSchemaFactory } from "../interface/air_quality.interface.schema.factory";

@Injectable()
export class AirQualitiesRepository extends EntityRepository<AirQualities, AirQualityResponseDto> implements AirQualityInterfaceRepository {
    constructor(
        @InjectRepository(AirQualities)
        protected readonly repository: Repository<AirQualities>,
        @Inject(AIRQUALITY_INTERFACE_SCHEMA_FACTORY)
        protected readonly entitySchemaFactory: AirQualityInterfaceSchemaFactory,
    ) {
        super(repository, entitySchemaFactory);
    }


}