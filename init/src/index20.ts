import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const repository = AppDataSource.getRepository(StudentEntity);

    const pageSize = 2

    const [students, count] = await repository.findAndCount({ select: { studentId: true, firstName: true, email: true, addresses: {city: true, state: true} }, take: pageSize, skip: 0, /* where: { age: 28 },  */order: { email: "ASC" }, relations: ["addresses"] });
    console.log("Loaded students: ", JSON.stringify(students, null, "\t"));
    console.log("Count of students: ", count);
    console.log("Total pages: ", Math.ceil(count / pageSize));

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });