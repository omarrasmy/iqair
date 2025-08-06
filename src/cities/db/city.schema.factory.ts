import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { Mapper } from "@automapper/core";
import { DeepPartial, FindOneOptions } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectMapper } from "@automapper/nestjs";
import { CityInterfaceSchemaFactory } from "../interface/city.interface.schema.factory";
import { Cities } from "./city.entity";
import { CityResponseDto } from "../dto/find-city.dto";
import { CreateCityDto } from "../dto/create-city.dto";
import { CurrentDto } from "src/air_qualities/dto/iqair-response.dto";

@Injectable()
export class CitySchemaFactory implements CityInterfaceSchemaFactory {
    constructor(@InjectMapper() private readonly mapper: Mapper) { }

    findAllToDto(data: Cities[], dataLength: number, count: number, page: number, take: number): GenericFindAllDomainResponse<CityResponseDto> {
        let entities = this.mapper.mapArray(data, Cities, CityResponseDto);
        return new GenericFindAllDomainResponse<CityResponseDto>(
            entities,
            page,
            count > (page * take) ? page + 1 : null,
            count,
            dataLength
        );
    }
    createFromSchema(entitySchema: Cities): CityResponseDto {
        return this.mapper.map(entitySchema, Cities, CityResponseDto);
    }

    create(data: CreateCityDto): DeepPartial<Cities> {
        return this.mapper.map(data, CreateCityDto, Cities);
    }

}