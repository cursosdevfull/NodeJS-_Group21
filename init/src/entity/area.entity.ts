import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";

@Entity({ name: "area" })
export class AreaEntity {
    @PrimaryGeneratedColumn()
    areaId: number;

    @Column({ type: "varchar", length: 80 })
    name: string;

    @ManyToOne(() => RoleEntity, (role) => role.areas)
    @JoinColumn({ name: "roleId" })
    role: RoleEntity;
}