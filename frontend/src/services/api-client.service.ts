import axios from 'axios'
import { env } from '../env'

export const apiClientService = axios.create({
	baseURL: env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

apiClientService.interceptors.request.use(
	(config) => {
		const token = sessionStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)
