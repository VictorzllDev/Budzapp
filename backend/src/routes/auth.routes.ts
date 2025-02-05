import type { FastifyInstance } from 'fastify'
import { AuthRepository } from '../repositories/auth.repository'
import type { IAuthRequest } from '../types/auth.types'
import { AuthUseCase } from '../usecases/auth.usecase'

const authUseCase = new AuthUseCase(new AuthRepository())

export function authRoutes(app: FastifyInstance) {
	app.post<{ Body: IAuthRequest }>('/register', async (req, reply) => {
		const { email, password } = req.body

		try {
			const result = await authUseCase.register({ email, password })
			reply.status(201).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.post<{ Body: IAuthRequest }>('/login', async (req, reply) => {
		const { email, password } = req.body

		try {
			const result = await authUseCase.login({ email, password })
			reply.status(200).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.get('/validate', async (req, reply) => {
		const token = req.headers.authorization?.split(' ')[1]

		try {
			const result = await authUseCase.validateToken(token)
			reply.status(200).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})
}
