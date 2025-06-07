import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentAdditionalEntity } from "./entity/student-additional.entity";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    await manager
      .createQueryBuilder()
      .from(AddressEntity, "address")
      .delete()
      .where("address.studentId = :id", { id: 3 })
      .execute();

    await manager
      .createQueryBuilder()
      .from(StudentAdditionalEntity, "additional")
      .delete()
      .where("studentId = :id", { id: 3 })
      .execute();

    await manager
      .createQueryBuilder()
      .from(StudentEntity, "student")
      .delete()
      .where("student.studentId = :id", { id: 3 })
      .execute();
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  