import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      .select(["student.studentId", "student.firstName", "student.lastName"])
      .addSelect(["AddressEntity.street", "AddressEntity.city"])
      .where("student.age > :age", { age: 25 })
      .andWhere("student.firstName = :name", { name: "Joe" })
      .innerJoin("student.addresses", "AddressEntity")
      .getMany()

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  