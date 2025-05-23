import http from 'http';
import { Application } from 'express';

export class ServerBootstrap {
    app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    initialize() {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(3000)
                .on("error", (err: Error) => {
                    reject(err);
                })
                .on("listening", () => {
                    resolve(server);
                    console.log("Server is running on port 3000");
                })
        })
    }
}