import type { IAuthRepository, IAuthRequest } from '../types/auth.types'
import type { ICompany } from '../types/company.types'
import { prisma } from '../utils/prisma-client.util'

export class AuthRepository implements IAuthRepository {
	async findByEmail(email: string): Promise<ICompany | null> {
		return await prisma.company.findUnique({ where: { email } })
	}

	async save({ email, password }: IAuthRequest): Promise<void> {
		await prisma.company.create({
			data: {
				email,
				password,
			},
		})
	}
}
