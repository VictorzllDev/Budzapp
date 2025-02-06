import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { RouterProvider } from 'react-router'
import { router } from './router/'
import { AuthProvider } from './contexts/AuthContext'

export function App() {
	return (
		<MantineProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</MantineProvider>
	)
}
