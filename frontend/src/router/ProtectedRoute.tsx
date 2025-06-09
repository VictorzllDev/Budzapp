import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { PageLoader } from '../components/PageLoader'

export function ProtectedRoute({ element }: { element: JSX.Element }) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <PageLoader />
	if (!isAuthenticated) return <Navigate to="/login" />

	return element
}
