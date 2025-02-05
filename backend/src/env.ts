import { z } from 'zod'

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	DATABASE_URL: z.string().url(),
	JWT_SECRET_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
