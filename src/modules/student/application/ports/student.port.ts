import { Student, StudentUpdateProps } from "../student";
import { ResultPage } from '../../../../core/types/result-page';

export type StudentPort = {
    save(student: Student): Promise<Student>;
    //findByEmail(email: string): Promise<Student | undefined>;
    findById(studentId: number): Promise<Student>;
    findAll(): Promise<Student[]>;
    getByPage(page: number, limit: number): Promise<ResultPage<Student>>;
}