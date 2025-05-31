import { Router } from "express";
import { StudentController } from "./student.controller";
import { StudentApplication, StudentPort } from "../application";
import { StudentAdapter } from "../adapters";

class StudentRoutes {
    router: Router = Router();
    private controller: StudentController

    constructor(controller: StudentController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', this.controller.findAll.bind(this.controller));
        this.router.post('/', this.controller.create.bind(this.controller));
    }
}

const port: StudentPort = new StudentAdapter()
const application = new StudentApplication(port)
const controller = new StudentController(application)
export const studentRouter = new StudentRoutes(controller).router;