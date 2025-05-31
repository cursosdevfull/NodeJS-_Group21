import { Student, StudentProps } from "../application/student";
import { StudentApplication } from "../application/student.application";
import { Request, Response } from 'express';

export class StudentController {
    private application: StudentApplication;

    constructor(application: StudentApplication) { 
        this.application = application
    }

    async create(req: Request, res: Response) {
        const props: StudentProps = {
            name: "Carmen",
            lastname: "Gonzalez",
            email: "carmen.gonzalez@email.com",
            age: 40
        }

        const student = new Student(props)
        await this.application.create(student)
        res.status(201).json(student);
    }

    async findAll(req: Request, res: Response) {
        const students = await this.application.findAll()

        res.json(students);
    }
}