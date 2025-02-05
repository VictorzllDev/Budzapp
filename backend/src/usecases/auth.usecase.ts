import { hash } from 'bcrypt'
import type {
	IAuthRepository,
	IAuthRequest,
	IAuthUseCase,
} from '../types/auth.types'
import { isValidEmail } from '../utils/email-validator.util'

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

		const existingUser = await this.authRepository.findByEmail(email)
		if (existingUser) throw new Error('User already exists')

		const passwordHash = await hash(password, 8)
		password = passwordHash

		this.authRepository.save({ email, password })
	}
}
