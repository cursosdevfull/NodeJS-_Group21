import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { UserEntity } from "./entity/user.entity";
import { RoleEntity } from "./entity/role.entity";


AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const user = await userRepository.findOne({where: {id: 2}, relations: ["roles"]});
    console.log("Loaded user: ", JSON.stringify(user, null, "\t"));
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });