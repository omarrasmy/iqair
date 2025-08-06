import { createMap, forMember, mapFrom, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { AirQualities } from "src/air_qualities/db/air_quality.entity";
import { AirQualityResponseDto } from "src/air_qualities/dto/find-air_quality.dto";
import { Cities } from "src/cities/db/city.entity";
import { CityResponseDto } from "src/cities/dto/find-city.dto";

@Injectable()
export class CitiesProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Cities, CityResponseDto,
                forMember((des) => des.airQualities, mapFrom((src) => {
                    if (src.airQualities)
                        return mapper.mapArray(src.airQualities, AirQualities, AirQualityResponseDto);
                    return undefined;
                }))
            );
            createMap(mapper, CityResponseDto, Cities);

        };
    }
}