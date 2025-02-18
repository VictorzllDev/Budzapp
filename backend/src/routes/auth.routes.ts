import { z, ZodError } from 'zod'
import { AuthRepository } from '../repositories/auth.repository'
import type { IAuthRequest } from '../types/auth.types'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { AuthUseCase } from '../usecases/auth.usecase'

const authUseCase = new AuthUseCase(new AuthRepository())

export function authRoutes(app: FastifyTypeInstace) {
	app.post(
		'/register',
		{
			schema: {
				tags: ['auth'],
				description: 'Register new user',
				body: z.object({
					email: z.string().email(),
					password: z.string().min(6).max(32),
				}),
				response: {
					201: z.void(),
					500: z.unknown(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { email, password } = req.body

				const result = await authUseCase.register({ email, password })
				reply.status(201).send(result)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send({
						message: 'Validation failed',
						errors: error.errors.map((e) => ({
							message: e.message,
							path: e.path,
						})),
					})
				} else {
					console.log(error)
					reply.status(500).send(error)
				}
			}
		},
	)

	app.post(
		'/login',
		{
			schema: {
				tags: ['auth'],
				description: 'Login user',
				body: z.object({
					email: z.string().email(),
					password: z.string().min(6).max(32),
				}),
				response: {
					200: z.object({
						token: z.string(),
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
					reply.status(400).send({
						message: 'Validation failed',
						errors: error.errors.map((e) => ({
							message: e.message,
							path: e.path,
						})),
					})
				} else {
					console.log(error)
					reply.status(500).send(error)
				}
			}
		},
	)

	app.get(
		'/validate',
		{
			schema: {
				tags: ['auth'],
				description: 'Validate token',
				headers: z.object({
					authorization: z.string(),
				}),
				response: {
					200: z.void(),
					500: z.unknown(),
				},
			},
		},
		async (req, reply) => {
			try {
				const headersSchema = z.object({
					authorization: z.string(),
				})
				const { authorization } = headersSchema.parse(req.headers)
				const token = authorization.split(' ')[1]

				const result = await authUseCase.validateToken(token)
				reply.status(200).send(result)
			} catch (error) {
				if (error instanceof ZodError) {
					reply.status(400).send({
						message: 'Validation failed',
						errors: error.errors.map((e) => ({
							message: e.message,
							path: e.path,
						})),
					})
				} else {
					console.log(error)
					reply.status(500).send(error)
				}
			}
		},
	)
}
