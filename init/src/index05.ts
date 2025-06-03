import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { UserEntity } from "./entity/user.entity";
import { Between } from "typeorm";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const repository = AppDataSource.getRepository(UserEntity);

    const users = await repository.find({
      where: { age: Between(20, 25) },
    });

    console.log("Users found with age between 20 and 25:", users);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
