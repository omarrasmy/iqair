import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiDocs } from 'src/helper/decorator/swagger';
import { AirQualitiesQueryParams, AirQualityResponseDto, FindAllResponseForSwagger } from './dto/find-air_quality.dto';
import { AirQualitiesService } from './air_qualities.service';
import { IqAirQualityResponseDto } from './dto/iqair-response.dto';

@ApiTags('AirQualities')
@Controller('air-qualities')
export class AirQualitiesController {
  constructor(private readonly AirQualitiesService: AirQualitiesService) { }

  // @Post()
  // create(@Body() createAirQualityDto: CreateAirQualityDto) {
  //   return this.AirQualitiesService.create(createAirQualityDto);
  // }

  @Get()
  @ApiDocs({
    summary: 'Get AirQualities',
    statusCode: 200,
    isPublic: true,
    response: IqAirQualityResponseDto,
  })
  async getAirQuality(
    @Query() query: AirQualitiesQueryParams,
  ) {
    return this.AirQualitiesService.getAirQuality(query);
  }

  //should be by city id
  @Get('most-polluted')
  @ApiDocs({
    summary: 'Get Most Polluted Time In Paris It should be by city id',
    statusCode: 200,
    isPublic: true,
    response: AirQualityResponseDto,
  })
  @ApiQuery({
    name: 'Chinese',
    required: false,
    description: 'If true, returns the pollution level according to China standards',
    type: Boolean,
    example: false,
  })

  async getMostPolluted(
    @Query('Chinese') isChinese: boolean = false,

  ) {
    return this.AirQualitiesService.getMostPollutedTime(isChinese);
  }
}
