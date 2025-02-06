import { apiClientService } from './api-client.service'

// Create a new user - register
interface IRegisterAuth {
	email: string
	password: string
}
export async function registerAuth({ email, password }: IRegisterAuth) {
	await apiClientService.post<void>('/auth/register', {
		email,
		password,
	})
}

// Login user - Login
export function loginAuth() {}
