import { verify } from 'jsonwebtoken'
import { env } from '../env'
import { HttpError } from './http-error.util'

export function validateTokenUtil(token: string) {
	try {
		const decoded = verify(token, env.JWT_SECRET_KEY)
		return decoded
	} catch (error) {
		throw new HttpError('Token inválido ou expirado', 401)
	}
}
