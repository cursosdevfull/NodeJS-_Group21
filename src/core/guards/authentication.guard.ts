import { Request, Response, NextFunction } from 'express';
import { ForbiddenException, UnauthorizedException } from '../exceptions';
import * as jwt from 'jsonwebtoken';
import { env } from '../../env';

export function Authentication(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        next(new UnauthorizedException('No token provided'));
    } else {
        try {
            const JWT_SECRET = env.JWT_SECRET;
            const payload = jwt.verify(token, JWT_SECRET)

            res.locals.user = payload;
            next()
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                next(new ForbiddenException('Token expired'));
            } else {
                next(new UnauthorizedException('Invalid token'));
            }
        }
    }
}

/* export function Authentication() {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                next(new UnauthorizedException('No token provided'));
            } else {
                try {
                    const JWT_SECRET = env.JWT_SECRET;
                    const payload = jwt.verify(token, JWT_SECRET)

                    res.locals.user = payload;
                    return originalMethod.apply(this, [req, res])
                } catch (error) {
                    if (error instanceof jwt.TokenExpiredError) {
                        next(new ForbiddenException('Token expired'));
                    } else {
                        next(new UnauthorizedException('Invalid token'));
                    }
                }
            }


        }

        return descriptor
    }
} */