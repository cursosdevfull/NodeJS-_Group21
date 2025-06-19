import { NextFunction, Request, Response } from 'express';
import { ForbiddenException } from '../exceptions';

export function Authorization(...rolesAllowed: string[]) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const user = res.locals.user;
        const roles = user.roles || [];

        const isAllowed = rolesAllowed.some(role => roles.includes(role))

        if (isAllowed) {
            next();
        } else {
            next(new ForbiddenException('You do not have permission to access this resource'));
        }

    }
}
