import { IEntitySchemaFactory } from "src/database/interface.entity-schema.factory";
import { AirQualities } from "../db/air_quality.entity";
import { AirQualityResponseDto } from "../dto/find-air_quality.dto";
import { CurrentDto, IqAirQualityResponseDto } from "../dto/iqair-response.dto";
import { CreateAirQualityDto } from "../dto/create-air_quality.dto";

export interface AirQualityInterfaceSchemaFactory extends IEntitySchemaFactory<AirQualities, AirQualityResponseDto> {
    createFromIqApiNearestToIqAirResponseDto(dto: CurrentDto): IqAirQualityResponseDto;
    createFromIqAirResponseToCreateAirQualityDto(dto: IqAirQualityResponseDto, cityId: number): CreateAirQualityDto;

} 