import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const repository = AppDataSource.getRepository(UserEntity);

    const users = await repository.find({ where: { age: 25 } });

    console.log("Users found with age 25:", users);

    const usersWithLastname = await repository.find({
      where: {
        lastname: "Doe",
      },
    });

    console.log("Users found with lastname 'Doe':", usersWithLastname);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
