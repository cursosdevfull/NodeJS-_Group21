import { AppDataSource } from "./data-source";
import "reflect-metadata";
import { UserEntity } from "./entity/user.entity";

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    const repository = AppDataSource.getRepository(UserEntity)

    const user01 = new UserEntity();
    user01.name = "Jane";
    user01.lastname = "Doe";
    user01.email = "jane.doe@email.com";
    user01.age = 25;

    const user02 = new UserEntity();
    user02.name = "Alice";
    user02.lastname = "Smith";
    user02.email = "alice.smith@email.com";
    user02.age = 30;

    const user03 = new UserEntity();
    user03.name = "Bob";
    user03.lastname = "Johnson";
    user03.email = "bob.johnson@email.com";
    user03.age = 22;

    await repository.save(user01)
    await repository.save(user02)
    await repository.save(user03)

    console.log("Users created:", [user01, user02, user03]);
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
