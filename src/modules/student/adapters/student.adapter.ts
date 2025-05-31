import { StudentPort } from "../application/ports/student.port";
import { Student, StudentUpdateProps } from "../application/student";

export class StudentAdapter implements StudentPort {
    students: Student[] = [];

    create(student: Student): Promise<Student> {
        this.students.push(student);
        return Promise.resolve(student);
    }

    findByEmail(email: string): Promise<Student | undefined> {
        const student = this.students.find(student => student.properties().email === email);
        return Promise.resolve(student);
    }

    findById(studentId: number): Promise<Student | undefined> {
        const student = this.students.find(student => student.properties().studentId === studentId);
        return Promise.resolve(student);
    }

    findAll(): Promise<Student[]> {
        return Promise.resolve(this.students);
    }

    update(studentId: number,  props: StudentUpdateProps): Promise<Student | null> {
        const studentIndex = this.students.findIndex(student => student.properties().studentId === studentId);
        if (studentIndex === -1) {
            return Promise.resolve(null);
        }
        const student = this.students[studentIndex];
        student.update(props);
        this.students[studentIndex] = student;
        return Promise.resolve(student);
    }

    delete(studentId: number): Promise<Student | null>{
        const studentIndex = this.students.findIndex(student => student.properties().studentId === studentId);
        if (studentIndex === -1) {
            return Promise.resolve(null);
        }
        const student = this.students[studentIndex];
        student.delete();
        this.students[studentIndex] = student;
        return Promise.resolve(student);
    }
}