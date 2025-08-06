import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CITY_INTERFACE_REPOSITORY, CITY_INTERFACE_SCHEMA_FACTORY } from './interface/city.tokens';
import { CitiesRepository } from './db/city.repository';
import { CitySchemaFactory } from './db/city.schema.factory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './db/city.entity';
import { CitiesProfile } from 'src/automapper-profile/cities.profile';

@Module({
  controllers: [CitiesController],
  providers: [CitiesService,
    {
      provide: CITY_INTERFACE_REPOSITORY,
      useClass: CitiesRepository // Assuming CitiesService implements CityInterfaceRepository
    },
    {
      provide: CITY_INTERFACE_SCHEMA_FACTORY,
      useClass: CitySchemaFactory // Assuming CitySchemaFactory implements CityInterfaceSchemaFactory
    },
    CitiesProfile

  ],
  exports: [CitiesService],
  imports: [
    TypeOrmModule.forFeature([Cities]), // Assuming Cities is the entity class, add it here
  ]
})
export class CitiesModule { }
