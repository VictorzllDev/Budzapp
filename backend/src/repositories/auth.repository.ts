import type { IAuthRepository, IAuthRequest } from '../types/auth.types'
import type { IUser } from '../types/user.types'
import { prisma } from '../utils/prisma-client.util'

export class AuthRepository implements IAuthRepository {
	async findByEmail(email: string): Promise<IUser | null> {
		return await prisma.user.findUnique({ where: { email } })
	}

	async save({ email, password }: IAuthRequest): Promise<void> {
		await prisma.user.create({
			data: {
				email,
				password,
			},
		})
	}
}
