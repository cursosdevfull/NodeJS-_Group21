import { StudentPort } from "./ports/student.port";
import { Student, StudentUpdateProps } from "./student";
import { NotFoundException } from '../../../core/exceptions/handles';

export class StudentApplication {
    constructor(private readonly port: StudentPort) { }

    async create(student: Student) {
        return this.port.save(student);
    }

    /* async findByEmail(email: string) {
        return this.port.findByEmail(email);
    } */

    async findById(id: number) {
        return this.port.findById(id);
    }

    async findAll() {
        return this.port.findAll();
    }

    async update(studentId: number, props: StudentUpdateProps) {
        const student = await this.port.findById(studentId);
        if (student) {
            student.update(props);
            return this.port.save(student);
        }
        throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    async delete(studentId: number) {
        const student = await this.port.findById(studentId);
        if (student) {
            student.delete();
            return this.port.save(student);
        }
        throw new NotFoundException(`Student with id ${studentId} not found`);
    }

    async getByPage(page: number, limit: number) {
        return this.port.getByPage(page, limit);
    }

}