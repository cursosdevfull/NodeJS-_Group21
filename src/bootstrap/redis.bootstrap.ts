import { Bootstrap } from "./bootstrap.type";
import IORedis from "ioredis";
import { env } from '../env';

export class RedisBootstrap implements Bootstrap {
    static client: IORedis

    async initialize() {
        return new Promise((resolve, reject) => {
            RedisBootstrap.client = new IORedis({
                host: env.REDIS_HOST,
                port: env.REDIS_PORT,
                password: env.REDIS_PASS,
            });

            RedisBootstrap.client
                .on('connect', () => {
                    console.log('Redis client connected successfully');
                    resolve('Redis connection established successfully');
                })
                .on('error', (err) => {
                    console.error('Redis connection error:', err);
                    reject(err);
                });
        })
    }

    static async get(key: string) {
        return this.client.get(key)
    }

    static async set(key: string, value: string) {
        this.client.set(key, value, "PX", env.REDIS_TTL_MINUTES * 60 * 1000);
    }

    static async clear(prefix: string) {
        const keys = await this.client.keys(`${prefix}*`)
        const pipeline = this.client.pipeline();

        keys.forEach(key => {
            pipeline.del(key);
        });

        await pipeline.exec();
    }


}