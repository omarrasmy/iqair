import { AutoMap } from "@automapper/classes";
import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEnum, IsIn, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { SupportedLanguage } from "../enums/languages.enum";
import { Transform, Type } from "class-transformer";
import { GenericFindAllDomainResponse } from "src/helper/dto/generic-domain-find-all-response.dto";
import { autoMap } from "@automapper/core";
import { CityResponseDto } from "src/cities/dto/find-city.dto";

export class AirQualityResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'The unique identifier of the air quality record',
        example: 1,
    })
    id: number;

    @AutoMap()
    @ApiProperty({
        description: 'The city where the air quality is measured',
        type: () => CityResponseDto,
    })
    city: CityResponseDto;

    @AutoMap()
    @ApiProperty({
        description: 'The pollution level in the city',
        example: 'Moderate',
    })
    pollutionLevelUS: number;

    @AutoMap()
    @ApiProperty({
        description: 'The pollution level in the city according to China standards',
        example: 'Moderate',
    })
    pollutionLevelChina: number;

    @AutoMap()
    @ApiProperty({
        description: 'The date when the air quality was recorded',
        example: '2023-10-01T12:00:00Z',
    })
    recordedAt: Date;

    @AutoMap()
    @ApiProperty({
        example: '2023-10-01T12:00:00Z',
        description: 'The date when the air quality record was created',
    })
    createdAt: Date;

}

export class AirQualitiesQueryParams {
    @IsLongitude()
    @ApiProperty({
        description: 'Longitude of the location to get air quality data',
        example: -118.2437,
        required: true,
    })
    @IsNotEmpty()
    lon: number;
    @IsLatitude()
    @ApiProperty({
        description: 'Latitude of the location to get air quality data',
        example: 34.0522,
        required: true,
    })
    @IsNotEmpty()
    lat: number;
}

@ApiExtraModels(AirQualityResponseDto)
export class FindAllResponseForSwagger extends GenericFindAllDomainResponse<AirQualityResponseDto> {
    @ApiProperty({
        type: [AirQualityResponseDto],
    })
    data: AirQualityResponseDto[];
}