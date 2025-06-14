import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentModel } from "./student.model";

@Entity({ name: 'experience' })
export class ExperienceModel {
    @PrimaryGeneratedColumn()
    experienceId!: number;

    @Column({ type: 'varchar', length: 100 })
    company!: string

    @Column({ type: 'varchar', length: 100 })
    role!: string;

    @Column({ type: 'date' })
    startDate!: Date;

    @Column({ type: 'date', nullable: true })
    endDate?: Date;

    @ManyToOne(() => StudentModel, (student) => student.experience)
    @JoinColumn({ name: 'studentId' })
    student!: StudentModel;

}