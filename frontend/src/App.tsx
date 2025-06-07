import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { AuthProvider } from './contexts/AuthContext'
import { router } from './router/'
import { queryClient } from './utils/query-client.util'

export function App() {
	return (
		<MantineProvider>
			<Notifications position="top-right" />
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</AuthProvider>
		</MantineProvider>
	)
}
