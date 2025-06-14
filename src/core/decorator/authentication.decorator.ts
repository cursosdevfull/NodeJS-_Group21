import { Request, Response } from 'express';

export function Authentication() {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response) {
            console.log('Authentication guard executed');
            return originalMethod.apply(this, [req, res])
        }
    }
}