import { ServerBootstrap } from "./bootstrap";
import { DatabaseBootstrap } from "./bootstrap";
import { app } from "./app";
import "./env"
import { gracefullyShutdown } from "./core/exceptions"

(async () => {
    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();

    try {
        const bootstraps = [serverBootstrap.initialize(), databaseBootstrap.initialize()];

        await Promise.all(bootstraps);
    } catch (error) {
        console.error("Error during initialization:", error);
        gracefullyShutdown();
    }
})()
