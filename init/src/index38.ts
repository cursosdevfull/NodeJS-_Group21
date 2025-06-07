import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      .select("sum(student.age)", "totalAge")
      .addSelect("count(student.studentId)", "totalCount")
      .addSelect("avg(student.age)", "averageAge")
      .addSelect("min(student.age)", "minAge")
      .addSelect("max(student.age)", "maxAge")
      .getRawOne();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  