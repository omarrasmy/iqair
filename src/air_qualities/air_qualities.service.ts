import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AirQualityInterfaceRepository } from './interface/air_quality.interface.repository';
import { RedisService } from 'src/common/redis/redis.service';
import { AIRQUALITY_INTERFACE_REPOSITORY, AIRQUALITY_INTERFACE_SCHEMA_FACTORY } from './interface/air_quality.tokens';
import { AirQualitiesQueryParams } from './dto/find-air_quality.dto';
import { requests } from 'src/helper/utilities/requests';
import { RequestsWithoutBodyEnum } from 'src/helper/enums/requests.enum';
import { IqAirQualityApiResponseDto, IqAirQualityResponseDto } from './dto/iqair-response.dto';
import { AirQualityInterfaceSchemaFactory } from './interface/air_quality.interface.schema.factory';
import { CitiesService } from 'src/cities/cities.service';

@Injectable()
export class AirQualitiesService {


  constructor(
    @Inject(AIRQUALITY_INTERFACE_REPOSITORY)
    private readonly AirQualitiesRepository: AirQualityInterfaceRepository,
    @Inject(AIRQUALITY_INTERFACE_SCHEMA_FACTORY)
    private readonly AirQualitySchemaFactory: AirQualityInterfaceSchemaFactory,
    private readonly redisService: RedisService,
    private readonly citiesService: CitiesService, // Assuming you have a CitiesService to handle city-related operations
  ) { }
  parisLat = 48.856613;
  parisLon = 2.352222;

  async getAirQuality(query: AirQualitiesQueryParams): Promise<IqAirQualityResponseDto> {
    let result: { data: IqAirQualityApiResponseDto } = await requests(
      process.env.IQAIR_API_URL.replace('{lat}', query.lat.toString()).replace('{long}', query.lon.toString()).replace('{key}', process.env.IRQIR_API_KEY),
      undefined,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      },
      RequestsWithoutBodyEnum.GET,
      200,
      'Air Quality API Response Validation Failed (Invalid Response)',
    )
    if (!result?.data.current?.pollution) {
      throw new BadRequestException('Invalid response from Air Quality API');
    }

    return this.AirQualitySchemaFactory.createFromIqApiNearestToIqAirResponseDto(result.data.current);
  }
  async saveParisAirQuality() {

    const city = await this.citiesService.findOneBylongAndLat({ lat: this.parisLat, long: this.parisLon });
    if (!city) {
      return;
    }
    const airQualityData = await this.getAirQuality({ lat: this.parisLat, lon: this.parisLon });
    if (!airQualityData) {
      return;
    }
    let createAirQualityDto = this.AirQualitySchemaFactory.createFromIqAirResponseToCreateAirQualityDto(airQualityData, city.id);
    await this.AirQualitiesRepository.create(createAirQualityDto);
  }

  async getMostPollutedTime(isChinese) {
    let sort = isChinese == 'true' || Boolean(isChinese) ? 'pollutionLevelChina' : 'pollutionLevelUS';
    const city = await this.citiesService.findOneBylongAndLat({ lat: this.parisLat, long: this.parisLon });
    return this.AirQualitiesRepository.findOne({
      order: {
        [sort]: 'DESC',
        recordedAt: 'DESC',
        createdAt: 'DESC',
      },
      where: {
        cityId: city.id,
      },
      relations: ['city'],
    });
  }
}
