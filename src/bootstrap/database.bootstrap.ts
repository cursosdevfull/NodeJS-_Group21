import { DataSource } from "typeorm";
import { Bootstrap } from "./bootstrap.type";

export class DatabaseBootstrap implements Bootstrap {
    static dataSource: DataSource;

    async initialize(): Promise<any> {
        const ds = new DataSource({
            type: "mysql",
            host: "localhost",
            port: 9000,
            username: "root",
            password: "12345",
            database: "db",
            synchronize: true,
            logging: true,
        })

        DatabaseBootstrap.dataSource = ds;

        await ds.initialize()

        return "Database connection established successfully";
    }

}