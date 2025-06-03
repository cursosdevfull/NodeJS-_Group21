import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async ()=> {
    const userRepository = AppDataSource.getRepository(UserEntity)
    const roleRepository = AppDataSource.getRepository(RoleEntity);

    const roleMatched = await roleRepository.findOne({ where: { roleId: 1 } })

    const newUser = new UserEntity();
    newUser.name = "Jane";
    newUser.lastname = "Doe";
    newUser.email = "jane.doe@email.com";
    newUser.age = 23;
    newUser.role = roleMatched; // Assign the saved role to the user

    const userSaved = await userRepository.save(newUser);


  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });