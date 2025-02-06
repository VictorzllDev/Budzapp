import axios from 'axios'
import { env } from '../env'

export const apiClientService = axios.create({
	baseURL: env.VITE_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
