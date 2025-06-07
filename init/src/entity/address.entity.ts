import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "./student.entity";

@Entity({ name: "address" })
export class AddressEntity {
    @PrimaryGeneratedColumn()
    addressId: number;

    @Column({ type: "varchar", length: 100 })
    street: string;

    @Column({ type: "varchar", length: 50 })
    city: string;

    @Column({ type: "varchar", length: 20 })
    state: string;

    @ManyToOne(() => StudentEntity, (student) => student.addresses)
    @JoinColumn({ name: "studentId" })
    student: StudentEntity; // Assuming StudentEntity is defined elsewhere

    constructor(street: string, city: string, state: string) {
        this.street = street;
        this.city = city;
        this.state = state;
    }
}