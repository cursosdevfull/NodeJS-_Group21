import { Request, Response } from 'express';

export function Authorization(...roles: string[]) {
    return function (
        target: any,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (req: Request, res: Response) {
            console.log('Authorization guard executed');
            console.log('Required roles:', roles);

            return originalMethod.apply(this, [req, res])
        }
    }
}