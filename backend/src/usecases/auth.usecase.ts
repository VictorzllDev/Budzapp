import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../env'
import type { IAuthRepository, IAuthRequest, IAuthResponse, IAuthUseCase } from '../types/auth.types'
import { validateTokenUtil } from '../utils/validate-token.util'

export class AuthUseCase implements IAuthUseCase {
	constructor(private authRepository: IAuthRepository) {}

	async register({ email, password }: IAuthRequest): Promise<void> {
		const existingCompany = await this.authRepository.findByEmail(email)
		if (existingCompany) throw new Error('Empresa já existe')

		const passwordHash = await hash(password, 8)
		password = passwordHash

		await this.authRepository.save({ email, password })
	}

	async login({ email, password }: IAuthRequest): Promise<IAuthResponse> {
		const company = await this.authRepository.findByEmail(email)
		if (!company) throw new Error('email ou senha incorretos')

		const isPasswordValid = await compare(password, company.password)
		if (!isPasswordValid) throw new Error('email ou senha incorretos')

		const token = sign({ id: company.id }, env.JWT_SECRET_KEY, {
			expiresIn: '1H',
		})

		return { token }
	}

	async validateToken(token: string | undefined): Promise<void> {
		if (!token) {
			throw new Error('Token não fornecido')
		}

		validateTokenUtil(token)
	}
}
