import { z, ZodError } from 'zod'
import { AuthRepository } from '../repositories/auth.repository'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { AuthUseCase } from '../usecases/auth.usecase'
import { HttpError } from '../utils/http-error.util'

const authUseCase = new AuthUseCase(new AuthRepository())

export function authRoutes(app: FastifyTypeInstace) {
	app.post(
		'/register',
		{
			schema: {
				tags: ['Auth'],
				description: 'Register new user',
				body: z.object({
					email: z.string().email(),
					password: z.string().min(6).max(32),
				}),
				response: {
					204: z.null(),
					400: z
						.object({
							statusCode: z.number(),
							code: z.string(),
							error: z.string(),
							message: z.string(),
						})
						.or(z.unknown()),
					422: z.object({
						message: z.string(),
					}),
					500: z.null(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { email, password } = req.body

				await authUseCase.register({ email, password })
				reply.status(204).send(null)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)

	app.post(
		'/login',
		{
			schema: {
				tags: ['Auth'],
				description: 'Login user',
				body: z.object({
					email: z.string().email(),
					password: z.string().min(6).max(32),
				}),
				response: {
					200: z.object({
						token: z.string(),
					}),
					400: z
						.object({
							statusCode: z.number(),
							code: z.string(),
							error: z.string(),
							message: z.string(),
						})
						.or(z.unknown()),
					422: z.object({
						message: z.string(),
					}),
					500: z.unknown(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { email, password } = req.body

				const result = await authUseCase.login({ email, password })
				reply.status(200).send(result)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)

	app.get(
		'/validate',
		{
			schema: {
				tags: ['Auth'],
				description: 'Validate token',
				headers: z.object({
					authorization: z.string(),
				}),
				response: {
					200: z.null(),
					400: z
						.object({
							statusCode: z.number(),
							code: z.string(),
							error: z.string(),
							message: z.string(),
						})
						.or(z.unknown()),
					500: z.null(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { authorization } = req.headers
				const token = authorization.split(' ')[1]

				await authUseCase.validateToken(token)
				reply.status(200).send(null)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send(error)
				} else if (error instanceof HttpError) {
					reply.status(error.statusCode).send({ message: error.message })
				} else {
					console.log(error)
					reply.status(500).send(null)
				}
			}
		},
	)
}
