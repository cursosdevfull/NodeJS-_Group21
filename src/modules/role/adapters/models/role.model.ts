import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from '../../../user/adapters/models/user.model';

@Entity({ name: 'role' })
export class RoleModel {
    @PrimaryGeneratedColumn()
    roleId!: number;

    @Column({ type: 'varchar', length: 100 })
    name!: string;

    @ManyToMany(() => UserModel, (user) => user.roles)
    users!: UserModel[];
}
