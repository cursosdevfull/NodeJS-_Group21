import express, { Application } from 'express';
import { studentRouter } from './modules/student/presentation';
import helmet from 'helmet';
import { TimingMiddleware } from './core/utils/timing.middleware';
import { RedisBootstrap } from './bootstrap';
import { userRouter } from './modules/user/presentation';
import { roleRouter } from './modules/role/presentation';
import { authRouter } from './modules/auth/presentation';

class App {
    readonly app: Application = express();

    constructor() {
        this.mountMiddlewares();
        this.mountRoutes();
        this.mountCache()
        this.mountExceptions();
    }

    private mountMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(TimingMiddleware);
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private mountRoutes() {
        this.app.use("/auth", authRouter)
        this.app.use("/student", studentRouter)
        this.app.use("/user", userRouter)
        this.app.use("/role", roleRouter)
    }

    private mountCache() {
        this.app.get("/invalidate-cache", async (req, res) => {
            await RedisBootstrap.clear("")
            res.status(200).json({ message: "Cache cleared successfully" });
        })
    }

    private mountExceptions() {
        this.app.use((req: express.Request, res: express.Response) => {
            res.status(404).json({ message: "Not Found", url: req.originalUrl });
        });

        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            const response: Record<string, string> = { message: err.message }

            if (process.env.NODE_ENV === 'development' && err.stack) {
                response.stack = err.stack;
            }
            res.status(err.status || 500).json(response);
        });
    }
}

export const app = new App().app;