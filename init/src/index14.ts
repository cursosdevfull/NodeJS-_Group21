import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/user.entity";
import { RoleEntity } from "./entity/role.entity";


AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const roleRepository = AppDataSource.getRepository(RoleEntity);

    const users = await userRepository.find({relations: ["roles", "roles.areas"]});
    console.log("Loaded users: ", JSON.stringify(users, null, "\t"));

/*     const roles = await roleRepository.find({relations: ["users"]});
    console.log("Loaded roles: ", JSON.stringify(roles, null, "\t")); */

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });