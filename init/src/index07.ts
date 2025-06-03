import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async ()=> {
    const roleRepository = AppDataSource.getRepository(RoleEntity)
    const userRepository = AppDataSource.getRepository(UserEntity)

    // Create a new role
    const newRole = roleRepository.create({
      name: "Admin"
    });

    // Save the new role to the database
    const roleSaved = await roleRepository.save(newRole)

    const newUser = new UserEntity();
    newUser.name = "John";
    newUser.lastname = "Doe";
    newUser.email = "john.doe@email.com";
    newUser.age = 30;
    newUser.role = roleSaved; // Assign the saved role to the user

    const userSaved = await userRepository.save(newUser);


  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });