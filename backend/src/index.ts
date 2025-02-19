import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { authRoutes } from './routes/auth.routes'
import { productRoutes } from './routes/product.routes'
import { prisma } from './utils/prisma-client.util'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
	origin: true,
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Budzapp API',
			version: '0.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(require('@scalar/fastify-api-reference'), {
	routePrefix: '/docs',
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
