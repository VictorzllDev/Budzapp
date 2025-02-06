import { apiClientService } from './api-client.service'

// Create a new user - register
interface IRegisterRequest {
	email: string
	password: string
}
export async function registerAuth({ email, password }: IRegisterRequest) {
	await apiClientService.post('/auth/register', {
		email,
		password,
	})
}

// Login user - Login
interface ILoginRequest {
	email: string
	password: string
}
interface ILoginResponse {
	token: string
}
export async function loginAuth({ email, password }: ILoginRequest) {
	const result = await apiClientService.post<ILoginResponse>('/auth/login', {
		email,
		password,
	})

	return result.data
}
