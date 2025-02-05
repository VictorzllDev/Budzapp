import type { IUser } from './user.types'

export interface IAuthRequest {
	email: string
	password: string
}

export interface IAuthResponse {
	token: string
}

export interface IAuthUseCase {
	register(data: IAuthRequest): Promise<void>
}

export interface IAuthRepository {
	findByEmail(email: string): Promise<IUser | null>
	save(data: IAuthRequest): Promise<void>
}
