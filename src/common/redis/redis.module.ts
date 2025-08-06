import { Global, Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { RedisService } from './redis.service';

@Global()
@Module({
    imports: [
        RedisModule.forRoot({
            type: 'single',
            options: {
                host: process.env.REDIS_HOST,
                port: +process.env.REDIS_PORT,
                password: process.env.REDIS_PASSWORD,
            }
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisConfigModule { }
