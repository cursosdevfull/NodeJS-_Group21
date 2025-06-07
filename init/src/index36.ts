import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const results = await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      .innerJoin("student.addresses", "AddressEntity")
      .innerJoin("student.additionalInfo", "StudentAdditionalEntity")
      .select([
        "student.studentId",
        "student.firstName",
        "student.lastName",
        "AddressEntity.street",
        "AddressEntity.city",
        "AddressEntity.state",
        "StudentAdditionalEntity.phoneNumber",
        "StudentAdditionalEntity.birthDate",
      ])
      .getMany();



    console.log("Results:", JSON.stringify(results, null, 2));
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  