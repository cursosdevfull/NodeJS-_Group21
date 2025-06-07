import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(StudentEntity);

    const students = await repository.find({take: 2, skip: 0, where: { age: 28 }, order: {email: "ASC" }});
    console.log("Loaded students: ", students);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });