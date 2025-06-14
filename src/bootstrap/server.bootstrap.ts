import http from "http";
import { Application } from "express";
import { Bootstrap } from "./bootstrap.type";
import { env } from '../env';

export class ServerBootstrap implements Bootstrap {
  constructor(private readonly app: Application) {}

  initialize() {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      server
        .listen(env.PORT)
        .on("error", (err: Error) => {
          reject(err);
        })
        .on("listening", () => {
          resolve(server);
          console.log(`Server is running on port ${env.PORT}`);
        });
    });
  }
}
