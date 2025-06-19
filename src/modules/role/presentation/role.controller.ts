import { Role, RoleProps, RoleUpdateProps } from "../application/role";
import { RoleApplication } from "../application/role.application";
import { NextFunction, Request, Response } from 'express';
import { RoleCreateDto, RoleIdDto, RolePageDto, RoleUpdateDto } from "./dtos";
import { Endpoint } from '../../../core/decorator';
import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';

export class RoleController {
    private application: RoleApplication;

    constructor(application: RoleApplication) {
        this.application = application
    }

    @Endpoint({
        schemaValidator: RoleCreateDto
    })
    async create(req: Request, res: Response, next: NextFunction) {
        const props: RoleProps = req.body

        const role = new Role(props)
        try {
            const result = await this.application.create(role)
            res.status(201).json(result);
        } catch (error: any) {
            return next(error)
        }
    }

    @Endpoint({
        schemaValidator: RoleUpdateDto
    })
    async update(req: Request, res: Response, next: NextFunction) {
        const roleId = req.params.roleId;
        const props: RoleUpdateProps = req.body;

        try {
            const result = await this.application.update(Number(roleId), props);

            await RedisBootstrap.clear("ROLE");

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = await this.application.findAll()

            await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(roles))

            res.json(roles);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: RoleIdDto,
    })
    async findById(req: Request, res: Response, next: NextFunction) {
        const roleId = req.params.roleId;

        try {
            const role = await this.application.findById(Number(roleId));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(role))

            res.json(role);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: RoleIdDto,
    })
    async delete(req: Request, res: Response, next: NextFunction) {
        const roleId = req.params.roleId;

        try {
            const role = await this.application.delete(Number(roleId));

            await RedisBootstrap.clear("ROLE");

            res.json(role);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: RolePageDto,
    })
    async getByPage(req: Request, res: Response, next: NextFunction) {
        const page = req.query.page
        const limit = req.query.limit

        try {
            const role = await this.application.getByPage(Number(page), Number(limit));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(role))

            res.json(role);
        } catch (error) {
            next(error);
        }
    }
}
