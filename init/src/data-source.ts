import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from './entity/user.entity';
import { StudentEntity } from "./entity/student.entity";
import { RoleEntity } from "./entity/role.entity";
import { AddressEntity } from "./entity/address.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 9000,
    username: "user",
    password: "12345",
    database: "db",
    synchronize: true,
    logging: true,
    entities: [UserEntity, StudentEntity, RoleEntity, AddressEntity],
    migrations: [],
    subscribers: [],
})
