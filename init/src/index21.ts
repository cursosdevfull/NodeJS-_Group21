import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";
import { MoreThan, MoreThanOrEqual } from "typeorm";


AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(StudentEntity);

    const results = await repository.find({
      where: {age: MoreThanOrEqual(25)}
    });

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });