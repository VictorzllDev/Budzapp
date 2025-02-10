import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { validateTokenUtil } from '../utils/validate-token.util'

export function validateTokenMiddleware(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
	const token = req.headers.authorization?.split(' ')[1]
	try {
		if (!token) {
			throw new Error('Token not provided')
		}

		validateTokenUtil(token)
		done()
	} catch (error) {
		console.log(error)
		reply.code(401).send({ error: 'Unauthorized' })
	}
}
