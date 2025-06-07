import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { RoleEntity } from "./entity/role.entity";
import { UserEntity } from "./entity/user.entity";

function getRoleEntity(roleId: number): RoleEntity {
  const role = new RoleEntity();
  role.roleId = roleId
  return role;
}

AppDataSource.initialize()
  .then(async () => {
    const userRepository = AppDataSource.getRepository(UserEntity);

    const roles = [
      { roleId: 1 },
      { roleId: 2 }
    ]

/*     const roles = [
      getRoleEntity(1),
      getRoleEntity(2),
    ] */

    const user = new UserEntity();
    user.name = "John";
    user.lastname = "Doe";
    user.email = "john.doe@email.com";
    user.age = 30;
    user.roles = roles as RoleEntity[];

    await userRepository.save(user);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });