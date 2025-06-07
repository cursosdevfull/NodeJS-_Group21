import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from './entity/user.entity';
import { StudentEntity } from "./entity/student.entity";
import { RoleEntity } from "./entity/role.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentAdditionalEntity } from './entity/student-additional.entity';
import { CourseEntity } from "./entity/course.entity";
import { AreaEntity } from "./entity/area.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 9000,
    username: "user",
    password: "12345",
    database: "db",
    synchronize: true,
    logging: true,
    entities: [UserEntity, StudentEntity, RoleEntity, AddressEntity, StudentAdditionalEntity, AreaEntity],
    migrations: [],
    subscribers: [],
})
