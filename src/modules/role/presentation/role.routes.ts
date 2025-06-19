import { Router } from "express";
import { RoleController } from "./role.controller";
import { RoleApplication, RolePort } from "../application";
import { RoleAdapter } from "../adapters";
import { CacheMiddleware } from '../../../core/utils/cache.middleware';
import { Authentication } from '../../../core/guards/authentication.guard';
import { Authorization } from '../../../core/guards/authorization.guard';

class RoleRoutes {
    router: Router = Router();
    private controller: RoleController

    constructor(controller: RoleController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.controller.create.bind(this.controller));
        this.router.get('/', Authentication, Authorization("MEDIC", "CALLER", "ADMIN"), CacheMiddleware("ROLE"), this.controller.findAll.bind(this.controller));
        this.router.get('/page', CacheMiddleware("ROLE"), this.controller.getByPage.bind(this.controller));
        this.router.get('/:roleId', CacheMiddleware("ROLE"), this.controller.findById.bind(this.controller));
        this.router.put('/:roleId', this.controller.update.bind(this.controller));
        this.router.delete('/:roleId', this.controller.delete.bind(this.controller));
    }
}

const port: RolePort = new RoleAdapter()
const application = new RoleApplication(port)
const controller = new RoleController(application)
export const roleRouter = new RoleRoutes(controller).router;
