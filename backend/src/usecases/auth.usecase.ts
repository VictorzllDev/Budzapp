import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { env } from '../env'
import type {
	IAuthRepository,
	IAuthRequest,
	IAuthResponse,
	IAuthUseCase,
} from '../types/auth.types'
import { isValidEmail } from '../utils/email-validator.util'
import { validateTokenUtil } from '../utils/validate-token.util'

export class AuthUseCase implements IAuthUseCase {
	constructor(private authRepository: IAuthRepository) {}

	async register({ email, password }: IAuthRequest): Promise<void> {
		if (!email || !password) {
			throw new Error('Email and password are required')
		}

		if (!isValidEmail(email)) {
			throw new Error('Invalid email')
		}

		if (password.length < 6) {
			throw new Error('Password must be at least 6 characters')
		}

		const existingCompany = await this.authRepository.findByEmail(email)
		if (existingCompany) throw new Error('Company already exists')

		const passwordHash = await hash(password, 8)
		password = passwordHash

		this.authRepository.save({ email, password })
	}

	async login({ email, password }: IAuthRequest): Promise<IAuthResponse> {
		if (!email || !password) {
			throw new Error('Email and password are required')
		}

		const company = await this.authRepository.findByEmail(email)
		if (!company) throw new Error('Company not found')

		const isPasswordValid = await compare(password, company.password)
		if (!isPasswordValid) throw new Error('Invalid password')

		const token = sign({ id: company.id }, env.JWT_SECRET_KEY, {
			expiresIn: '1d',
		})

		return { token }
	}

	async validateToken(token: string | undefined): Promise<void> {
		if (!token) {
			throw new Error('Token not provided')
		}

		validateTokenUtil(token)
	}
}
