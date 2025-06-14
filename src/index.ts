import { ServerBootstrap, DatabaseBootstrap, RedisBootstrap } from "./bootstrap";
import { app } from "./app";
import "./env"
import { gracefullyShutdown } from "./core/exceptions"


(async () => {
    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();
    const redisBootstrap = new RedisBootstrap();

    try {
        const bootstraps = [serverBootstrap.initialize(), databaseBootstrap.initialize(), redisBootstrap.initialize()];

        await Promise.all(bootstraps);

    } catch (error) {
        console.error("Error during initialization:", error);
        gracefullyShutdown();
    }
})()
