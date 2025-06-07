import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(StudentEntity);

    const students = await repository.find({order: {age: "DESC", email: "DESC"}});
    console.log("Loaded students: ", students);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });