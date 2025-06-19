import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleModel } from '../../../role/adapters/models/role.model';

@Entity({ name: 'user' })
export class UserModel {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @Column({ type: 'varchar', length: 100 })
    lastname!: string;

    @Column({ type: 'varchar', length: 200 })
    password!: string;

    @Column({ type: 'varchar', length: 200 })
    refreshToken!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    phone?: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt!: Date;

    @Column({ type: "date", nullable: true })
    updatedAt?: Date;

    @Column({ type: "date", nullable: true })
    deletedAt?: Date;

    @ManyToMany(() => RoleModel, (role) => role.users)
    @JoinTable({
        name: "user_roles"
    })
    roles!: RoleModel[];
}