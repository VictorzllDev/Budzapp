import { z, ZodError } from 'zod'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import { ProductRepository } from '../repositories/product.repository'
import type { FastifyTypeInstace } from '../types/fastify.types'
import { ProductUseCase } from '../usecases/product.usecase'

const productUseCase = new ProductUseCase(new ProductRepository())

export function productRoutes(app: FastifyTypeInstace) {
	app.post(
		'/',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['product'],
				description: 'Create new product',
				body: z.object({
					name: z.string(),
					description: z.string(),
					price: z.number(),
					contentType: z.string().regex(/image\/(png|jpg|jpeg)/),
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
					500: z.unknown(),
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
		'/:companyId',
		{
			schema: {
				tags: ['product'],
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
					500: z.unknown(),
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

	app.delete(
		'/:id',
		{
			preHandler: validateTokenMiddleware,
			schema: {
				tags: ['product'],
				description: 'Delete product by id',
				params: z.object({
					id: z.string(),
				}),
				response: {
					204: z.void(),
					500: z.unknown(),
				},
			},
		},
		async (req, reply) => {
			try {
				const { id } = req.params
				const companyId = req.company.id

				const result = await productUseCase.deleteById(id, companyId)
				reply.code(204).send(result)
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
