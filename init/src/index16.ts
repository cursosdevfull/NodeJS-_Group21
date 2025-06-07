import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/user.entity";
import { RoleEntity } from "./entity/role.entity";


AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const users = await userRepository.find({select: {id: true, name: true, roles: true}});
    console.log("Loaded users: ", JSON.stringify(users, null, "\t"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });