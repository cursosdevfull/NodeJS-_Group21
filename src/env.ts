import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
})

type Env = z.infer<typeof envSchema>;

export const env:Env = envSchema.parse(process.env); 