import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis'; // Import the 'Redis' type from the 'ioredis' package

@Injectable()
export class RedisService {
    private readonly defaultTTL = 7 * 24 * 60 * 60; // 7 days in seconds

    constructor(
        @InjectRedis() private readonly redis: Redis,
    ) { }

    async set(key: string, value: any, ttl: number = this.defaultTTL): Promise<void> {
        const serializedValue = JSON.stringify(value);
        await this.redis.set(key, serializedValue, 'EX', ttl);
    }

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value) as T;
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }
    async clearAllCache(): Promise<void> {
        await this.redis.flushall();
    }
}
