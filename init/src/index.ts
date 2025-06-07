import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentAdditionalEntity } from "./entity/student-additional.entity";
import { Brackets } from "typeorm";


AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const students = await manager
      .createQueryBuilder(StudentEntity, "student")
      .select(["student.studentId", "student.firstName", "student.age"])
      .where("student.studentId >= :id", { id: 2 })
      .orWhere(
        new Brackets((query) => {
          query
            .where("student.firstName = :firstName", { firstName: "Jane" })
            .andWhere("student.age >= :age", { age: 25 });
        })
      )
      .getRawMany();

    console.log("Students:", students);
    
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


  