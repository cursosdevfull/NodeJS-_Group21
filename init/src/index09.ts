import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async ()=> {
    const userRepository = AppDataSource.getRepository(UserEntity)
    const roleRepository = AppDataSource.getRepository(RoleEntity);

    const role = {roleId: 1, name: "Operator"}; // Example role object

    const newUser = new UserEntity();
    newUser.name = "Charles";
    newUser.lastname = "Doe";
    newUser.email = "charles.doe@email.com";
    newUser.age = 28;
    newUser.role = role as RoleEntity; // Assign the saved role to the user

    const userSaved = await userRepository.save(newUser);

    console.log("User saved successfully:", userSaved);


  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });