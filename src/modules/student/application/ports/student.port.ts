import { Student, StudentUpdateProps } from "../student";

export type StudentPort = {
    create(student: Student): Promise<Student>;
    findByEmail(email: string): Promise<Student | undefined>;
    findById(studentId: number): Promise<Student | undefined>;
    findAll(): Promise<Student[]>;
    update(studentId: number, props: StudentUpdateProps): Promise<Student | null>;
    delete(studentId: number): Promise<Student | null>;
}