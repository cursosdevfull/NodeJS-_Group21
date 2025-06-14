import { DataSource } from "typeorm";
import { Bootstrap } from "./bootstrap.type";
import { env } from '../env';
import path from "node:path"

export class DatabaseBootstrap implements Bootstrap {
    static dataSource: DataSource;

    async initialize(): Promise<any> {
        const ds = new DataSource({
            type: "mysql",
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USER,
            password: env.DB_PASS,
            database: env.DB_NAME,
            synchronize: env.DB_SYNC,
            logging: env.DB_LOGG,
            entities: [path.join(__dirname, "../modules/**/adapters/models/*.model.{ts,js}")],
        })

        DatabaseBootstrap.dataSource = ds;

        await ds.initialize()

        console.log("Database connection established successfully");

        return "Database connection established successfully";
    }

}