import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AIRQUALITY_INTERFACE_REPOSITORY, AIRQUALITY_INTERFACE_SCHEMA_FACTORY } from './interface/air_quality.tokens';
import { AirQualitiesRepository } from './db/air_quality.repository';
import { AirQualitiesService } from './air_qualities.service';
import { AirQualitiesController } from './air_qualities.controller';
import { AirQualitySchemaFactory } from './db/air_quality.schema.factory';
import { AirQualitiesProfile } from 'src/automapper-profile/air_qualities.profile';
import { AirQualities } from './db/air_quality.entity';
import { CitiesModule } from 'src/cities/cities.module';

@Module({
  controllers: [AirQualitiesController],
  providers: [AirQualitiesService,
    {
      provide: AIRQUALITY_INTERFACE_REPOSITORY,
      useClass: AirQualitiesRepository // Assuming AirQualityInterfaceRepository is defined and imported
    },
    {
      provide: AIRQUALITY_INTERFACE_SCHEMA_FACTORY,
      useClass: AirQualitySchemaFactory // Assuming AirQualityInterfaceSchemaFactory is defined and imported
    },
    AirQualitiesProfile,
  ],
  imports: [
    TypeOrmModule.forFeature([AirQualities]), // Assuming AirQualities is the entity class
    CitiesModule
  ],
  exports: [
    AirQualitiesService
  ]
})
export class AirQualitiesModule { }
