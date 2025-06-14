import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';

export function Validator(schemaValidator: new (...args: any[]) => any) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response) {
            const parameters = { ...req.body, ...req.params, ...req.query };

            const instance = plainToInstance(schemaValidator, parameters)

            const errors = await validate(instance)
            if (errors && errors.length > 0) {
                return res.status(411).json(errors);
            }

            return originalMethod.apply(this, [req, res])
        }
    }
}