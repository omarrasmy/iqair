import { createMap, forMember, mapFrom, Mapper, MappingProfile, mapWithArguments } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { AirQualities } from "src/air_qualities/db/air_quality.entity";
import { CreateAirQualityDto } from "src/air_qualities/dto/create-air_quality.dto";
import { AirQualityResponseDto } from "src/air_qualities/dto/find-air_quality.dto";
import { CurrentDto, IqAirQualityResponseDto } from "src/air_qualities/dto/iqair-response.dto";

@Injectable()
export class AirQualitiesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, AirQualities, AirQualityResponseDto);
            createMap(mapper, AirQualityResponseDto, AirQualities);
            createMap(mapper, CreateAirQualityDto, AirQualities)
            createMap(mapper, CurrentDto, IqAirQualityResponseDto,
                forMember((des) => des.Result.pollution, mapFrom((src) => src.pollution)),
                forMember((des) => des.status, mapFrom(() => 200)),
                forMember((des) => des.message, mapFrom(() => 'IqAir Quality Data Retrieved Successfully'))
            )
            createMap(mapper, IqAirQualityResponseDto, CreateAirQualityDto
                , forMember((des) => des.pollutionLevelChina, mapFrom((src) => src.Result.pollution.aqicn)),
                forMember((des) => des.pollutionLevelUS, mapFrom((src) => src.Result.pollution.aqius)),
                forMember((des) => des.recordedAt, mapFrom((src) => src.Result.pollution.ts)),
                forMember((des) => des.cityId, mapWithArguments((src, object: { id }) => object.id))
            )
        };
    }
}