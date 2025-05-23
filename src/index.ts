import { Server } from "http";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import app from "./app";


(async () => {
    const serverBootstrap = new ServerBootstrap(app);
    await serverBootstrap.initialize()
})()