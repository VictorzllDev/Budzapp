import fastify from 'fastify'
import { env } from './env'
import fastifyCors from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {
	origin: true,
})

app.get('/', async (_req, reply) => {
	reply.code(200).send({ hello: 'world' })
})

app.listen({ port: env.PORT }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
