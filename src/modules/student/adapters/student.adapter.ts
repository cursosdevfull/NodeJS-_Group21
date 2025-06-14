import { StudentPort } from "../application/ports/student.port";
import { Student } from "../application/student";
import { StudentModel } from "./models";
import { StudentDto } from "./dtos";
import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { IsNull } from "typeorm";
import { DatabaseException, NotFoundException } from '../../../core/exceptions/handles';
import { ResultPage } from "src/core/types";

export class StudentAdapter implements StudentPort {
    async save(student: Student): Promise<Student> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(StudentModel)
            const model = StudentDto.fromDomainToData(student) as StudentModel;
            const result = await repository.save(model);

            return StudentDto.fromDataToDomain(result) as Student;
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }

    /* findByEmail(email: string): Promise<Student | undefined> {
        const student = this.students.find(student => student.properties().email === email);
        return Promise.resolve(student);
    } */

    async findById(studentId: number): Promise<Student> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(StudentModel)
            const studentMatched = await repository.findOne({ where: { studentId, deletedAt: IsNull() } });

            if (!studentMatched) {
                throw new NotFoundException(`Student with id ${studentId} not found`);
            }

            return StudentDto.fromDataToDomain(studentMatched) as Student;
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }

    }

    async findAll(): Promise<Student[]> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(StudentModel)
            const students = await repository.find({ where: { deletedAt: IsNull() } });

            return StudentDto.fromDataToDomain(students) as Student[];

        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }

    async getByPage(page: number, limit: number): Promise<ResultPage<Student>> {
        try {
            const repository = DatabaseBootstrap.dataSource.getRepository(StudentModel)
            const [students, total] = await repository.findAndCount({
                where: { deletedAt: IsNull() },
                skip: (page - 1) * limit,
                take: limit,
            })

            return {
                data: StudentDto.fromDataToDomain(students) as Student[],
                total,
                page,
                limit
            }
        } catch (error: any) {
            if (error.errors && error.errors.length > 0) {
                const errorMessage = error.errors.map((err: any) => err.message).join(', ');
                const errorStack = error.errors.map((err: any) => err.stack).join(', ');
                throw new DatabaseException(`Database error: ${errorMessage}`, errorStack);
            } else {
                throw new DatabaseException(error.message, error.stack)
            }
        }
    }
}