import "reflect-metadata";
import { AppDataSource } from "./data-source";
import { CourseEntity } from "./entity/course.entity";


AppDataSource.initialize()
  .then(async () => {
    const course = new CourseEntity();
    course.title = "Introduction to TypeScript";

    await course.save()

    const result = await CourseEntity.find()

    console.log("Courses in the database:", result);

  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });