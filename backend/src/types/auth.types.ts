import type { ICompany } from './company.types'

export interface IPayloadJWT {
	companyId: string
}

export interface IAuthRequest {
	email: string
	password: string
}

export interface IAuthResponse {
	token: string
}

export interface IAuthUseCase {
	register(data: IAuthRequest): Promise<void>
	login(data: IAuthRequest): Promise<IAuthResponse>
	validateToken(token: string | undefined): Promise<void>
}

export interface IAuthRepository {
	findByEmail(email: string): Promise<ICompany | null>
	save(data: IAuthRequest): Promise<void>
}
