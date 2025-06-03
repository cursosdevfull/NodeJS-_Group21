import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const repository = AppDataSource.getRepository(UserEntity)

    const users = await repository.find()

    console.log("Users found:", users);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
