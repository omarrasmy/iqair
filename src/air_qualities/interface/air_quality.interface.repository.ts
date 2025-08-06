import { IEntityRepository } from "src/database/interface.entity.repository";
import { FindOneOptions } from "typeorm";
import { AirQualities } from "../db/air_quality.entity";
import { AirQualityResponseDto } from "../dto/find-air_quality.dto";

export interface AirQualityInterfaceRepository extends IEntityRepository<AirQualities, AirQualityResponseDto> {
}