import { User, UserProps, UserUpdateProps } from "../application/user";
import { UserApplication } from "../application/user.application";
import { NextFunction, Request, Response } from 'express';
import { UserCreateDto, UserIdDto, UserPageDto } from "./dtos";
import { Endpoint } from '../../../core/decorator';
import { UserUpdateDto } from "./dtos/user-update.dto";
import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';
import { encrypt } from '../../../core/services/crypt.service';

export class UserController {
    private application: UserApplication;

    constructor(application: UserApplication) {
        this.application = application
    }

    @Endpoint({
        schemaValidator: UserCreateDto,
    })
    async create(req: Request, res: Response, next: NextFunction) {
        const props: UserProps = req.body
        props.password = await encrypt(props.password)

        const user = new User(props)
        try {
            const result = await this.application.create(user)

            await RedisBootstrap.clear("USER");

            res.status(201).json(result);
        } catch (error: any) {
            return next(error)
        }
    }

    @Endpoint({
        schemaValidator: UserUpdateDto,
    })
    async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;
        const props: UserUpdateProps = req.body;

        if (props.password) {
            props.password = await encrypt(props.password)
        }

        try {
            const result = await this.application.update(Number(userId), props);

            await RedisBootstrap.clear("USER");

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.application.findAll()

            await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(users))

            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: UserIdDto,
    })
    async findById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;

        try {
            const user = await this.application.findById(Number(userId));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(user))

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: UserIdDto,
    })
    async delete(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.userId;

        try {
            const user = await this.application.delete(Number(userId));

            await RedisBootstrap.clear("USER");

            res.json(user);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: UserPageDto,
    })
    async getByPage(req: Request, res: Response, next: NextFunction) {
        const page = req.query.page
        const limit = req.query.limit

        try {
            const user = await this.application.getByPage(Number(page), Number(limit));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(user))

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}