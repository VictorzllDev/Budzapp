import { createBrowserRouter } from 'react-router'
import { Dashboard } from '../pages/Dashboard/'
import { Login } from '../pages/Login/'
import { NotFound } from '../pages/NotFound/'
import { Register } from '../pages/Register/'
import { ProtectedRoute } from './ProtectedRoute'
import { RedirectIfLoggedIn } from './RedirectIfLoggedIn'
import { AutenticatedLayout } from '../pages/_layouts/AutenticatedLayout/'
import { Products } from '../pages/Products'
import { Settings } from '../pages/Settings'

export const router = createBrowserRouter([
	{
		path: '/',
		errorElement: <NotFound />,
		children: [
			{
				path: '/',
				element: <ProtectedRoute element={<AutenticatedLayout />} />,
				children: [
					{
						path: '/',
						element: <Dashboard />,
					},
					{
						path: '/products',
						element: <Products />,
					},
					{
						path: '/settings',
						element: <Settings />,
					},
				],
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
