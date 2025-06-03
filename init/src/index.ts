import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentEntity } from './entity/student.entity';

AppDataSource.initialize()
  .then(async ()=> {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const roles = [
     {roleId: 1},
     {roleId: 2}
    ]

    const user = new UserEntity();
    user.name = "John";
    user.lastname = "Doe";
    user.email = "john.doe@email.com";
    user.age = 30;
    user.roles = roles as RoleEntity[];


   await userRepository.save(user);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });