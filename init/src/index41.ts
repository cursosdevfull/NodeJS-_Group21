import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      .orderBy("student.age", "DESC")
      .addOrderBy("student.lastName", "ASC")
      .addOrderBy("student.firstName", "ASC")
      .getRawMany();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  