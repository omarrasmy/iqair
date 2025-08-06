import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { AirQualityResponseDto } from 'src/air_qualities/dto/find-air_quality.dto';

export class CityResponseDto {
    @AutoMap()
    @ApiProperty({
        description: 'Unique identifier for the city',
        example: 1,
    })
    id: number;
    @AutoMap()
    @ApiProperty({
        description: 'Name of the city',
        example: 'Los Angeles',
    })
    name: string;
    @AutoMap()
    // @ApiProperty({
    //     type: () => Array<AirQualityResponseDto>,
    //     description: 'Air quality data associated with the city',
    // })
    airQualities?: AirQualityResponseDto[];
}