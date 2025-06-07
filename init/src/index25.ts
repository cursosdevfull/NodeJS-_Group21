import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder(StudentEntity, "student")
      .select(["student.studentId", "student.firstName", "student.lastName"])
      .where("student.age > :age")
      .andWhere("student.firstName = :name")
      //.setParameters({ age: 25, name: "Joe" })
      .setParameter("age", 25)
      .setParameter("name", "Joe")
      .getMany();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });