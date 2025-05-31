import express, { Application } from 'express';
import { StudentController } from './modules/student/presentation/student.controller';
import { studentRouter } from './modules/student/presentation';

class App {
    readonly app: Application = express();

    constructor(){
        this.mountMiddlewares();
        this.mountRoutes();
    }

    private mountMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private mountRoutes() {
        this.app.use("/student", studentRouter)
    }
}

export const app = new App().app;