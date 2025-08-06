import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { DatabaseModule } from './database/database.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { QueryFailedExceptionFilter } from './database/exception.filter';
import { RedisConfigModule } from './common/redis/redis.module';
import { AirQualitiesModule } from './air_qualities/air_qualities.module';
import { CornModule } from './corn/corn.module';
import { CitiesModule } from './cities/cities.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    DatabaseModule,
    RedisConfigModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AirQualitiesModule,
    ScheduleModule.forRoot(),
    CornModule,
    CitiesModule,

  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: QueryFailedExceptionFilter,
    },
  ],
})
export class AppModule { }
