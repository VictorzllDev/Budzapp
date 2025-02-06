import { createContext, useEffect, useState } from 'react'
import { validateTokenAuth } from '../services/auth.service'
import { handleApiErrorUtil } from '../utils/error-handler.util'

interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	logout: () => void
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
				console.error(handleApiErrorUtil(error))
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
		setIsAuthenticated(false)
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
			{children}
		</AuthContext.Provider>
	)
}
