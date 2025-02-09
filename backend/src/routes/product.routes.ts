import type { FastifyInstance } from 'fastify'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'
import z from 'zod'
import { ProductUseCase } from '../usecases/product.usecase'
import { ProductRepository } from '../repositories/product.repository'

const productUseCase = new ProductUseCase(new ProductRepository())

export function productRoutes(app: FastifyInstance) {
	app.addHook('preHandler', validateTokenMiddleware)

	app.post('/', async (req, reply) => {
		try {
			const productBodySchema = z.object({
				name: z.string(),
				description: z.string(),
				price: z.number(),
				contentType: z.string().regex(/image\/(png|jpg|jpeg)/),
				companyId: z.string(),
			})
			const body = productBodySchema.parse(req.body)
			const result = await productUseCase.create(body)
			reply.status(201).send(result)
		} catch (error) {
			console.log(error)
			reply.status(500).send(error)
		}
	})
}
