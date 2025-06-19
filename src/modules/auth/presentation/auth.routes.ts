import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthApplication, AuthPort } from "../application";
import { AuthAdapter } from "../adapters";

class AuthRoutes {
    router: Router = Router();
    private controller: AuthController

    constructor(controller: AuthController) {
        this.controller = controller
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/login', this.controller.login.bind(this.controller));
        this.router.post('/refresh', this.controller.refreshToken.bind(this.controller));
    }
}

const port: AuthPort = new AuthAdapter()
const application = new AuthApplication(port)
const controller = new AuthController(application)
export const authRouter = new AuthRoutes(controller).router;
