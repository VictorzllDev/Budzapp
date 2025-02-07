import { useAuth } from '../../hooks/useAuth'

export function Home() {
	const { logout } = useAuth()

	return (
		<>
			<h1>Home</h1>
			<button onClick={logout} type="button">
				logout
			</button>
		</>
	)
}
