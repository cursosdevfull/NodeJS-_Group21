import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { StudentEntity } from "./entity/student.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentAdditionalEntity } from "./entity/student-additional.entity";


AppDataSource.initialize()
  .then(async () => {
    const studentRepository = AppDataSource.manager.getRepository(StudentEntity);

    const student = new StudentEntity();
    student.firstName = "Peter";
    student.lastName = "Doe"; 
    student.surName = "Smith";
    student.email = "peter.doe@email.com";
    student.age = 40;
    student.addresses = [
      new AddressEntity("123 Main St", "Springfield", "IL"),
      new AddressEntity("456 Elm St", "Shelbyville", "IL"),
      new AddressEntity("789 Oak St", "Capital City", "IL")
    ];
    student.additionalInfo = new StudentAdditionalEntity("999-999-9999", new Date("2001-05-15T00:00:00.000Z"), "Jane's additional info");

    await studentRepository.save(student);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });