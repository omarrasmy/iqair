import { Inject, Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { CitiesRepository } from './db/city.repository';
import { CITY_INTERFACE_REPOSITORY } from './interface/city.tokens';
import { Cities } from './db/city.entity';
import { FindOneOptions } from 'typeorm';
import { CityResponseDto } from './dto/find-city.dto';
import { CityInterfaceRepository } from './interface/city.interface.repository';

@Injectable()
export class CitiesService {
  constructor(
    @Inject(CITY_INTERFACE_REPOSITORY)
    private readonly CityInterfaceRepository: CityInterfaceRepository,
  ) { }
  findOneBylongAndLat(options: { long: number, lat: number }): Promise<CityResponseDto> {
    return this.CityInterfaceRepository.findOneBylongAndLat(options);
  }
}
