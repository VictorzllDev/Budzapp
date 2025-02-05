import { z } from 'zod'

const envSchema = z.object({
	PORT: z.string().transform((port) => Number(port)),
})

export const env = envSchema.parse(process.env)
