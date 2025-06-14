import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EducationModel } from "./education.model";
import { ExperienceModel } from "./experience.model";
import { CertificationModel } from "./certification.model";

@Entity({name: 'student'})
export class StudentModel {
    @PrimaryGeneratedColumn()
    studentId!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 100 })
    lastname!: string;

    @Column({ type: 'int' })
    age!: number

    @Column({ type: 'varchar', length: 100})
    email!: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone?: string;

    @Column({ type: 'varchar', length: 10, nullable: true })
    gender?: string;

    @Column({ type: 'json', nullable: true })
    skills?: string[];

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: Date;

    @Column({type: "date", nullable: true})
    updatedAt?: Date;

    @Column({type: "date", nullable: true})
    deletedAt?: Date;

    @OneToMany(() => EducationModel, (education) => education.student, { cascade: true })
    education?: EducationModel[];

    @OneToMany(() => ExperienceModel, (experience) => experience.student, { cascade: true })
    experience?: ExperienceModel[];

    @OneToMany(() => CertificationModel, (certification) => certification.student, { cascade: true })
    certifications?: CertificationModel[];



}