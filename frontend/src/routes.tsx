import { createBrowserRouter } from 'react-router'
import { Home } from './pages/Home'
import { Register } from './pages/Register'

export const router = createBrowserRouter([
	{
		path: '/',
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},
])
