import { Navigate } from 'react-router'
import { PageLoader } from '../components/PageLoader'
import { useAuth } from '../hooks/useAuth'

export function RedirectIfLoggedIn({ element }: { element: JSX.Element }) {
	const { isAuthenticated, isLoading } = useAuth()

	if (isLoading) return <PageLoader />
	if (isAuthenticated) return <Navigate to="/" />

	return element
}
