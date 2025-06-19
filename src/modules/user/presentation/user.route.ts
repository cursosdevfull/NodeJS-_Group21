import { Router } from "express";
import { UserController } from "./user.controller";
import { UserApplication, UserPort } from "../application";
import { UserAdapter } from "../adapters";
import { CacheMiddleware } from '../../../core/utils/cache.middleware';

class UserRoutes {
    router: Router = Router();
    private controller: UserController

    constructor(controller: UserController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.get('/', CacheMiddleware("USER"), this.controller.findAll.bind(this.controller));
        this.router.get('/page', CacheMiddleware("USER"), this.controller.getByPage.bind(this.controller));
        this.router.get('/:userId', CacheMiddleware("USER"), this.controller.findById.bind(this.controller));
        this.router.put('/:userId', this.controller.update.bind(this.controller));
        this.router.delete('/:userId', this.controller.delete.bind(this.controller));

    }
}

const port: UserPort = new UserAdapter()
const application = new UserApplication(port)
const controller = new UserController(application)
export const userRouter = new UserRoutes(controller).router;