import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentModel } from "./student.model";

@Entity({ name: 'education' })
export class EducationModel {
    @PrimaryGeneratedColumn()
    educationId!: number;

    @Column({ type: 'varchar', length: 100 })
    degree!: string;

    @Column({ type: 'varchar', length: 100 })
    institution!: string;

    @Column({ type: 'int' })
    yearOfGraduation!: number;

    @ManyToOne(() => StudentModel, (student) => student.education)
    @JoinColumn({ name: 'studentId' })
    student!: StudentModel;
}