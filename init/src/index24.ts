import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder(StudentEntity, "student")
      .select(["student.studentId", "student.firstName", "student.lastName"])
      //.where("student.age > 25")
      //.where("student.age > :age and student.firstName = :name", { age: 25, name: "Joe" })
      .where("student.age > :age", { age: 25 })
      .andWhere("student.firstName = :name", { name: "Joe" })
      .getMany();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });