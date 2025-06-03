import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const repository = AppDataSource.getRepository(UserEntity)

    const user = new UserEntity();
    user.name = "John";
    user.lastname = "Doe";
    user.email = "john.doe@email.com";

    const userCreated = await repository.save(user)

    console.log("User created:", userCreated);
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
