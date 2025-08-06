import { Module } from '@nestjs/common';
import { CornService } from './corn.service';
import { AirQualitiesModule } from 'src/air_qualities/air_qualities.module';

@Module({
  controllers: [],
  providers: [CornService],
  imports: [
    AirQualitiesModule, // Importing AirQualitiesModule to use its services
  ]
})
export class CornModule { }
