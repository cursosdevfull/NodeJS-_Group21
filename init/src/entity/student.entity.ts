import { Column, Entity, Index, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { StudentAdditionalEntity } from "./student-additional.entity";

@Entity({ name: "student" })
@Index("idx_lastname_email", ["lastName", "email"], { unique: true })
export class StudentEntity {
  @PrimaryGeneratedColumn()
  studentId: number;

  @Column({ type: "varchar", length: 80 })
  firstName: string;

  @Column({ type: "varchar", length: 80 })
  lastName: string;

  @Column({ type: "varchar", length: 80, nullable: true })
  surName: string;

  @Column({ type: "varchar", length: 80, unique: true })
  email: string;

  @Column({ type: "int" })
  age: number;

  @OneToMany(() => AddressEntity, (address) => address.student, { cascade: true })
  addresses: AddressEntity[]; 

  @OneToOne(() => StudentAdditionalEntity, (additional) => additional.student, { cascade: true })
  additionalInfo: StudentAdditionalEntity;
}
