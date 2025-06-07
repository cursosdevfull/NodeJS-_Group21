import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      /*.where("student.age >= :age", { age: 18 })
      .orWhere("student.firstName LIKE :firstName", { firstName: "%John%" })*/
      .where("student.age >= :age")
      .orWhere("student.firstName LIKE :firstName")
      //.setParameters({ age: 18, firstName: "%John%" })
      .setParameter("age", 28)
      .setParameter("firstName", "%Jane%")
      .getRawMany();


    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  