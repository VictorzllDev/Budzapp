import type { FastifyInstance } from 'fastify'
import { validateTokenMiddleware } from '../middlewares/validate-token.middleware'

export function productsRoutes(app: FastifyInstance) {
	app.addHook('preHandler', validateTokenMiddleware)

	app.get('/', async (_req, reply) => {
		reply.send({ hello: 'world' })
	})
}
