import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { AreaEntity } from "./area.entity";

@Entity({name: "role"})
export class RoleEntity {
    @PrimaryGeneratedColumn()
    roleId: number;

    @Column({ type: "varchar", length: 80 })
    name: string

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];

    @OneToMany(()=>AreaEntity, (area) => area.role, {eager: true})
    areas: AreaEntity[];
}