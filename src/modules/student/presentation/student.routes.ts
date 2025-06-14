import { Router } from "express";
import { StudentController } from "./student.controller";
import { StudentApplication, StudentPort } from "../application";
import { StudentAdapter } from "../adapters";
import { CacheMiddleware } from '../../../core/utils/cache.middleware';

class StudentRoutes {
    router: Router = Router();
    private controller: StudentController

    constructor(controller: StudentController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.get('/', CacheMiddleware("STUDENT"), this.controller.findAll.bind(this.controller));
        this.router.get('/page', CacheMiddleware("STUDENT"), this.controller.getByPage.bind(this.controller));
        this.router.get('/:studentId', CacheMiddleware("STUDENT"), this.controller.findById.bind(this.controller));
        this.router.put('/:studentId', this.controller.update.bind(this.controller));
        this.router.delete('/:studentId', this.controller.delete.bind(this.controller));

    }
}

const port: StudentPort = new StudentAdapter()
const application = new StudentApplication(port)
const controller = new StudentController(application)
export const studentRouter = new StudentRoutes(controller).router;