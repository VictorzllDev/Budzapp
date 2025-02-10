import type { FastifyInstance } from 'fastify'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import z from 'zod'
import { ProductUseCase } from '../usecases/product.usecase'
import { ProductRepository } from '../repositories/product.repository'

const productUseCase = new ProductUseCase(new ProductRepository())

export function productRoutes(app: FastifyInstance) {
	app.post('/', { preHandler: validateTokenMiddleware }, async (req, reply) => {
		try {
			const productBodySchema = z.object({
				name: z.string(),
				description: z.string(),
				price: z.number(),
				contentType: z.string().regex(/image\/(png|jpg|jpeg)/),
			})
			const { name, description, price, contentType } = productBodySchema.parse(req.body)
			const result = await productUseCase.create({ name, description, price, contentType, companyId: req.company.id })
			reply.status(201).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.get('/:companyId', async (req, reply) => {
		try {
			const paramsSchema = z.object({
				companyId: z.string(),
			})
			const { companyId } = paramsSchema.parse(req.params)

			const result = await productUseCase.getAllByCompanyId(companyId)
			reply.status(200).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})

	app.delete('/:id', { preHandler: validateTokenMiddleware }, async (req, reply) => {
		try {
			const paramsSchema = z.object({
				id: z.string(),
			})

			const { id } = paramsSchema.parse(req.params)
			const companyId = req.company.id

			await productUseCase.deleteById(id, companyId)
			reply.code(204).send()
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})
}
