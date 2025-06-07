import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .select(["student.firstName", "student.age"])
      .from(StudentEntity, "student")
      .having("student.age > :age", { age: 20 })
      .orderBy("student.firstName", "ASC")
      .getRawOne();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  