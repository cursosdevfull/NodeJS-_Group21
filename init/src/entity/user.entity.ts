import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { RoleEntity } from "./role.entity"

@Entity({name: "user"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "varchar", length: 80 })
    name: string

    @Column({type: "varchar", length: 80, name: "last_name"})
    lastname: string

    @Column({type: "varchar", length: 80, unique: true})
    email: string

    @Column({type: "int", default: 0})
    age: number

    @Column({type: "timestamp", nullable: true})
    createdAt: Date | undefined

   @ManyToMany(() => RoleEntity, (role) => role.users)
   @JoinTable({name: "user_roles"})
   roles: RoleEntity[]
}