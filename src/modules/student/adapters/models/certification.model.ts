import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentModel } from "./student.model";

@Entity({ name: 'certification' })
export class CertificationModel {
    @PrimaryGeneratedColumn()
    certificationId!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 100 })
    institution!: string;

    @Column({ type: 'date' })
    date!: Date;

    @ManyToOne(() => StudentModel, (student) => student.certifications)
    @JoinColumn({ name: 'studentId' })
    student!: StudentModel;
}