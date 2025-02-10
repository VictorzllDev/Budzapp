import { z } from 'zod'

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
	DATABASE_URL: z.string().url(),
	JWT_SECRET_KEY: z.string(),
	CLOUDFLARE_ENDPOINT: z.string().url(),
	CLOUDFLARE_ACCESS_KEY_ID: z.string(),
	CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
