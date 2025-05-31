import { StudentPort } from "./ports/student.port";
import { Student, StudentUpdateProps } from "./student";

export class StudentApplication {
    constructor(private readonly port: StudentPort) { }

    async create(student: Student) {
        return this.port.create(student);
    }

    async findByEmail(email: string) {
        return this.port.findByEmail(email);
    }

    async findById(id: number) {
        return this.port.findById(id);
    }

    async findAll() {
        return this.port.findAll();
    }

    async update(studentId: number, props: StudentUpdateProps) {
        return this.port.update(studentId, props);
    }

    async delete(studentId: number) {
        return this.port.delete(studentId);
    }

}