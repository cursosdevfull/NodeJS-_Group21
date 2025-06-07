import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity({ name: "studentAdditional" })
export class StudentAdditionalEntity {
  @PrimaryGeneratedColumn()
  additionalId: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  phoneNumber: string;

  @Column({ type: "date", nullable: true })
  birthDate: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  emergencyContact: string;

  @OneToOne(() => StudentEntity, (student) => student.additionalInfo)
  @JoinColumn({ name: "studentId" })
  student: StudentEntity;

  constructor(phoneNumber?: string, birthDate?: Date, emergencyContact?: string) {
    this.phoneNumber = phoneNumber || null;
    this.birthDate = birthDate || null;
    this.emergencyContact = emergencyContact || null;
  }
}