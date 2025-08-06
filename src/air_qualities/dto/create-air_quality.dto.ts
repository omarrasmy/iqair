import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNumber, IsOptional, Max, Min } from "class-validator";

export class CreateAirQualityDto {


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
    @IsDate()
    recordedAt: Date;
    @AutoMap()
    @ApiProperty({
        description: 'The city ID associated with the air quality record',
        example: 1,
    })
    cityId: number;
}