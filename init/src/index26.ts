import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder(StudentEntity, "student")
      .select(["student.firstName", "student.age", "AddressEntity.street", "AddressEntity.city"])
      .innerJoin("student.addresses", "AddressEntity")
      .getMany();

    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });