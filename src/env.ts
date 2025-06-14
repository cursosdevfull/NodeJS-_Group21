import "dotenv/config";

import { z } from "zod/v4";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(9000),
    DB_USER: z.string().default("root"),
    DB_PASS: z.string().default("12345"),
    DB_NAME: z.string().default("db"),
    DB_SYNC: z.stringbool().default(true),
    DB_LOGG: z.stringbool().default(false),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.coerce.number().default(6379),
    REDIS_PASS: z.string().default("12345"),
    REDIS_TTL_MINUTES: z.coerce.number().default(60),
})

type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env); 