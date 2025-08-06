import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNumber, IsString, ValidateNested } from "class-validator";



class LocationDto {
    @IsString()
    type: string;

    @IsArray()
    @IsNumber({}, { each: true })
    coordinates: [number, number]; // [longitude, latitude]
}

export class PollutionDto {
    @IsDateString()
    @ApiProperty({
        description: 'Timestamp of the pollution data',
        example: '2023-10-01T12:00:00Z',
    })
    ts: Date;

    @IsNumber()
    @ApiProperty({
        description: 'Air Quality Index in US standard',
        example: 42,
    })
    aqius: number;

    @IsString()
    @ApiProperty({
        description: 'Main pollutant in US standard',
        example: 'PM2.5',
    })
    mainus: string;

    @IsNumber()
    @ApiProperty({
        description: 'Air Quality Index in China standard',
        example: 50,
    })
    aqicn: number;

    @IsString()
    @ApiProperty({
        description: 'Main pollutant in China standard',
        example: 'PM2.5',
    })
    maincn: string;
}

class WeatherDto {
    @IsDateString()
    ts: string;

    @IsString()
    ic: string;

    @IsNumber()
    hu: number;

    @IsNumber()
    pr: number;

    @IsNumber()
    tp: number;

    @IsNumber()
    wd: number;

    @IsNumber()
    ws: number;

    @IsNumber()
    heat_index: number;
}
export class IqAirQualityPopulation {
    @ValidateNested()
    @Type(() => PollutionDto)
    @AutoMap()
    @ApiProperty({
        description: 'Pollution data including AQI and main pollutants',
        type: () => PollutionDto,
    })
    pollution: PollutionDto;
}

export class CurrentDto extends IqAirQualityPopulation {

    @ValidateNested()
    @Type(() => WeatherDto)
    weather: WeatherDto;
}

export class IqAirQualityApiResponseDto {
    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @ValidateNested()
    @Type(() => LocationDto)
    location: LocationDto;

    @ValidateNested()
    @Type(() => CurrentDto)
    current: CurrentDto;
}


export class IqAirQualityResponseDto {
    @ApiProperty({
        description: 'City name',
        type: () => IqAirQualityPopulation,
    })
    @ValidateNested()
    @Type(() => IqAirQualityPopulation)
    Result: IqAirQualityPopulation;
    @ApiProperty({
        description: 'HTTP status code',
        example: 200,
    })
    status: number;
    @ApiProperty({
        description: 'Response message',
        example: 'Air Quality data fetched successfully',
    })
    message: string;
}