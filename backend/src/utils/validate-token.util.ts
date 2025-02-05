import { verify } from 'jsonwebtoken'
import { env } from '../env'

export function validateTokenUtil(token: string) {
	try {
		const decoded = verify(token, env.JWT_SECRET_KEY)
		return decoded
	} catch (error) {
		throw new Error('Invalid or expired token')
	}
}
