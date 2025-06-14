import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { ParametersException } from '../exceptions';

export type EndpointParams = {
    schemaValidator?: new (...args: any[]) => any;
    guards?: any[];
}

export function Endpoint(params: EndpointParams) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
            if (params.schemaValidator) {
                const parameters = { ...req.body, ...req.params, ...req.query };

                const instance = plainToInstance(params.schemaValidator, parameters)

                const errors = await validate(instance)
                if (errors && errors.length > 0) {
                    return next(new ParametersException("Invalid parameters", errors.join(', ')));
                }
            }

            if (params.guards && params.guards.length > 0) {
                for (const guard of params.guards) {
                    if (typeof guard === 'function') {
                        guard()(target, propertyKey, descriptor);
                    } else {
                        throw new Error('Guard must be a function');
                    }
                }
            }

            return originalMethod.apply(this, [req, res, next]);
        };

        return descriptor;
    };
}