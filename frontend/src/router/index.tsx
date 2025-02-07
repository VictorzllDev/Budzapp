import { createBrowserRouter } from 'react-router'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ProtectedRoute } from './ProtectedRoute'
import { RedirectIfLoggedIn } from './RedirectIfLoggedIn'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '/',
				element: <ProtectedRoute element={<Home />} />,
			},
			{
				path: '/register',
				element: <RedirectIfLoggedIn element={<Register />} />,
			},
			{
				path: '/login',
				element: <RedirectIfLoggedIn element={<Login />} />,
			},
		],
	},
])
