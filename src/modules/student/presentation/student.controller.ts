import { Student, StudentProps, StudentUpdateProps } from "../application/student";
import { StudentApplication } from "../application/student.application";
import { NextFunction, Request, Response } from 'express';
import { StudentCreateDto, StudentIdDto, StudentPageDto } from "./dtos";
import { Endpoint } from '../../../core/decorator';
import { StudentUpdateDto } from "./dtos/student-update.dto";
import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';

export class StudentController {
    private application: StudentApplication;

    constructor(application: StudentApplication) {
        this.application = application
    }

    @Endpoint({
        schemaValidator: StudentCreateDto,
    })
    async create(req: Request, res: Response, next: NextFunction) {
        const props: StudentProps = req.body

        const student = new Student(props)
        try {
            const result = await this.application.create(student)

            await RedisBootstrap.clear("STUDENT");

            res.status(201).json(result);
        } catch (error: any) {
            return next(error)
        }
    }

    @Endpoint({
        schemaValidator: StudentUpdateDto,
    })
    async update(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.studentId;
        const props: StudentUpdateProps = req.body;

        try {
            const result = await this.application.update(Number(studentId), props);

            await RedisBootstrap.clear("STUDENT");

            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const students = await this.application.findAll()

            await RedisBootstrap.set(res.locals.cacheKey, JSON.stringify(students))

            res.json(students);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: StudentIdDto,
    })
    async findById(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.studentId;

        try {
            const student = await this.application.findById(Number(studentId));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(student))

            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: StudentIdDto,
    })
    async delete(req: Request, res: Response, next: NextFunction) {
        const studentId = req.params.studentId;

        try {
            const student = await this.application.delete(Number(studentId));

            await RedisBootstrap.clear("STUDENT");

            res.json(student);
        } catch (error) {
            next(error);
        }
    }

    @Endpoint({
        schemaValidator: StudentPageDto,
    })
    async getByPage(req: Request, res: Response, next: NextFunction) {
        const page = req.query.page
        const limit = req.query.limit

        try {
            const student = await this.application.getByPage(Number(page), Number(limit));

            await RedisBootstrap.client.set(res.locals.cacheKey, JSON.stringify(student))

            res.json(student);
        } catch (error) {
            next(error);
        }
    }
}