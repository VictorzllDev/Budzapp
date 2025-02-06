import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './router/'

export function App() {
	return (
		<MantineProvider>
			<Notifications position="top-right" />
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</MantineProvider>
	)
}
