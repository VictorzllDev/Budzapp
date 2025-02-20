import { z, ZodError } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { ProductRepository } from '../repositories/product.repository'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { ProductUseCase } from '../usecases/product.usecase'
import { HttpError } from '../utils/http-error.util'

const productUseCase = new ProductUseCase(new ProductRepository())

export function productRoutes(app: FastifyTypeInstace) {
	app.post(
		'/',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Products'],
				description: 'Create new product',
				headers: z.object({
					authorization: z.string(),
				}),
				body: z.object({
					name: z.string(),
					description: z.string(),
					price: z.number(),
					contentType: z.enum(['image/png', 'image/jpeg', 'image/jpg']),
				}),
				response: {
					201: z.object({
						product: z.object({
							id: z.string(),
							name: z.string(),
							description: z.string(),
							price: z.number(),
							filePath: z.string(),
							createdAt: z.date(),
							updatedAt: z.date(),
							companyId: z.string(),
						}),
						signedUrl: z.string(),
					}),
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
				const { name, description, price, contentType } = req.body
				const result = await productUseCase.create({ name, description, price, contentType, companyId: req.company.id })
				reply.status(201).send(result)
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
		'/:companyId',
		{
			schema: {
				tags: ['Products'],
				description: 'Get all products by company id',
				params: z.object({
					companyId: z.string(),
				}),
				response: {
					200: z.array(
						z.object({
							id: z.string(),
							name: z.string(),
							description: z.string(),
							price: z.number(),
							filePath: z.string(),
							createdAt: z.date(),
							updatedAt: z.date(),
							companyId: z.string(),
						}),
					),
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
				const { companyId } = req.params

				const result = await productUseCase.getAllByCompanyId(companyId)
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

	app.delete(
		'/:id',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['Products'],
				description: 'Delete product by id',
				headers: z.object({
					authorization: z.string(),
				}),
				params: z.object({
					id: z.string(),
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
					403: z.object({
						message: z.string(),
					}),
					404: z.object({
						message: z.string(),
					}),

					500: z.null(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { id } = req.params
				const companyId = req.company.id

				await productUseCase.deleteById(id, companyId)
				reply.code(204).send(null)
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
