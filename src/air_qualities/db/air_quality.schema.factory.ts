import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { Mapper } from "@automapper/core";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { AirQualityInterfaceSchemaFactory } from "../interface/air_quality.interface.schema.factory";
import { AirQualities } from "./air_quality.entity";
import { AirQualityResponseDto } from "../dto/find-air_quality.dto";
import { CreateAirQualityDto } from "../dto/create-air_quality.dto";
import { CurrentDto, IqAirQualityApiResponseDto, IqAirQualityResponseDto } from "../dto/iqair-response.dto";

@Injectable()
export class AirQualitySchemaFactory implements AirQualityInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }
    createFromIqAirResponseToCreateAirQualityDto(dto: IqAirQualityResponseDto, id: number): CreateAirQualityDto {
        return this.mapper.map(dto, IqAirQualityResponseDto, CreateAirQualityDto, { extraArgs: () => ({ id }) });
    }

    findAllToDto(data: AirQualities[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<AirQualityResponseDto> {
        let entities = this.mapper.mapArray(data, AirQualities, AirQualityResponseDto);
        return new GenericFindAllDomainResponse<AirQualityResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: AirQualities): AirQualityResponseDto {
        return this.mapper.map(entitySchema, AirQualities, AirQualityResponseDto);
    }

    create(data: CreateAirQualityDto): DeepPartial<AirQualities> {
        return this.mapper.map(data, CreateAirQualityDto, AirQualities);
    }
    createFromIqApiNearestToIqAirResponseDto(dto: CurrentDto): IqAirQualityResponseDto {
        return this.mapper.map(dto, CurrentDto, IqAirQualityResponseDto);
    }

}