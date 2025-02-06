import { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate } from 'react-router'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import ProtectedRoute from './ProtectedRoute'

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
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
])
