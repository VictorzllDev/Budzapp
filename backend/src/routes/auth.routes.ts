import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { AuthRepository } from '../repositories/auth.repository'
import type { IAuthRequest } from '../types/auth.types'
import { AuthUseCase } from '../usecases/auth.usecase'

const authUseCase = new AuthUseCase(new AuthRepository())

export function authRoutes(app: FastifyInstance) {
	app.post<{ Body: IAuthRequest }>('/register', async (req, reply) => {
		try {
			const bodySchema = z.object({
				email: z.string().email(),
				password: z.string().min(6).max(32),
			})
			const { email, password } = bodySchema.parse(req.body)

			const result = await authUseCase.register({ email, password })
			reply.status(201).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.post<{ Body: IAuthRequest }>('/login', async (req, reply) => {
		try {
			const bodySchema = z.object({
				email: z.string().email(),
				password: z.string().min(6).max(32),
			})
			const { email, password } = bodySchema.parse(req.body)

			const result = await authUseCase.login({ email, password })
			reply.status(200).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.get('/validate', async (req, reply) => {
		try {
			const headersSchema = z.object({
				authorization: z.string(),
			})
			const { authorization } = headersSchema.parse(req.headers)
			const token = authorization.split(' ')[1]

			const result = await authUseCase.validateToken(token)
			reply.status(200).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})
}
