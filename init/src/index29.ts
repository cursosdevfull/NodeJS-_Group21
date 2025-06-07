import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .select(["student.firstName", "student.age", "AddressEntity.street", "AddressEntity.city"])
      .from(StudentEntity, "student")
      .innerJoin("student.addresses", "AddressEntity")
      .where("student.age > :age", { age: 25 })
      .orWhere("student.firstName = :name", { name: "Joe" })
      .getMany()

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  