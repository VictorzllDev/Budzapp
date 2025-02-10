import 'fastify'

declare module 'fastify' {
	interface FastifyRequest {
		company: {
			id: string
		}
	}
}
