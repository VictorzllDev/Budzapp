import { notifications } from '@mantine/notifications'
import { createContext, useEffect, useState } from 'react'
import { loginAuth, validateTokenAuth } from '../services/auth.service'
import { queryClient } from '../utils/query-client.util'

interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	logout: () => void
	login: ({ email, password }: { email: string; password: string }) => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await validateTokenAuth()
				setIsAuthenticated(true)
			} catch (error) {
				sessionStorage.removeItem('token')
				setIsAuthenticated(false)
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	const logout = () => {
		sessionStorage.removeItem('token')
		queryClient.clear()
		setIsAuthenticated(false)

		notifications.show({
			title: 'Sucesso',
			message: 'Logout realizado com sucesso',
			color: 'green',
		})
	}

	const login = async ({ email, password }: { email: string; password: string }) => {
		const { token } = await loginAuth({ email, password })

		sessionStorage.removeItem('token')
		sessionStorage.setItem('token', token)

		setIsAuthenticated(true)

		notifications.show({
			title: 'Sucesso',
			message: 'Login realizado com sucesso',
			color: 'green',
		})
	}

	return <AuthContext.Provider value={{ isAuthenticated, isLoading, logout, login }}>{children}</AuthContext.Provider>
}
