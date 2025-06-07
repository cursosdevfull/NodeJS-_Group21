import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";
import { AddressEntity } from "./entity/address.entity";
import { StudentEntity } from './entity/student.entity';

AppDataSource.initialize()
  .then(async ()=> {
    const studentRepository = AppDataSource.getRepository(StudentEntity);
    const address = AppDataSource.getRepository(AddressEntity)

    const newAddress = new AddressEntity("123 Main St", "Springfield", "IL");
    // newAddress.street = "123 Main St";
    // newAddress.city = "Springfield";
    // newAddress.state = "IL";

/*     const savedAddress = await address.save(newAddress);
    console.log("Address has been saved: ", savedAddress); */

    const studentUser = new StudentEntity();
    studentUser.firstName = "Karin";
    studentUser.lastName = "Carter";
    studentUser.surName = "Smith";
    studentUser.email = "karin.carter@email.com";
    studentUser.age = 20;
    studentUser.addresses = [newAddress];

    const savedStudent = await studentRepository.save(studentUser);
    console.log("Student has been saved: ", savedStudent);


  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });