import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import { env } from './env'
import { authRoutes } from './routes/auth.routes'
import { productRoutes } from './routes/product.routes'
import { prisma } from './utils/prisma-client.util'

const app = fastify()

app.register(fastifyCors, {
	origin: true,
})

app.register(authRoutes, {
	prefix: '/auth',
})

app.register(productRoutes, {
	prefix: '/product',
})

app.listen({ port: env.PORT }, async (err, address) => {
	if (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
