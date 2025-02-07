import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

export function ProtectedRoute({ element }: { element: JSX.Element }) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <div>Carregando...</div>
	if (!isAuthenticated) return <Navigate to="/login" />

	return element
}
