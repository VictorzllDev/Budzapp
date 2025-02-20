import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import { validateTokenUtil } from '../utils/validate-token.util'
import type { IPayloadJWT } from '../types/auth.types'

export function validateTokenMiddleware(req: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
	const token = req.headers.authorization?.split(' ')[1]
	try {
		if (!token) {
			throw new Error('Token not provided')
		}

		const decoded = validateTokenUtil(token)

		req.company = decoded as IPayloadJWT

		done()
	} catch (error) {
		console.log(error)
		reply.code(401).send({ error: 'Unauthorized' })
	}
}
