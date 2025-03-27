// src/redis-test.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class RedisTestService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async testConnection() {
    await this.redis.set('test', 'NestJS Redis OK');
    return this.redis.get('test');
  }
}