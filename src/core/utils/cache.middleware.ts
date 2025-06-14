import { Request, Response, NextFunction } from 'express';
import { RedisBootstrap } from '../../bootstrap';

export const CacheMiddleware = (prefix: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const cacheKey = getCacheKey(prefix, req);

        const cachedResponse = await RedisBootstrap.get(cacheKey)

        if (cachedResponse) {
            console.log(`Cache hit for key: ${cacheKey}`);
            res.json(JSON.parse(cachedResponse));
        } else {
            console.log(`Cache miss for key: ${cacheKey}`);
            res.locals.cacheKey = cacheKey; // Store the cache key in res.locals for later use
            next()
        }
    }
}

const getCacheKey = (prefix: string, req: Request) => {
    const { method, originalUrl, query, body, params } = req;

    let tailKey = "";

    ([query, body, params] as Array<any>).forEach((item: any) => {
        if (item && Object.keys(item).length > 0) {
            for (const key in item) {
                tailKey += `${key}=${item[key]}&`;
            }
        }
    })

    return `${prefix}:${method}:${originalUrl}${tailKey ? `?${tailKey.slice(0, -1)}` : ''}`;

}