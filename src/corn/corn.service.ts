import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AirQualitiesService } from 'src/air_qualities/air_qualities.service';

@Injectable()
export class CornService {
    constructor(private readonly AirQualitiesService: AirQualitiesService) { }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleCron() {
        console.log('Running cron job to save Paris air quality data every minute');

        await this.AirQualitiesService.saveParisAirQuality();
    }
}
