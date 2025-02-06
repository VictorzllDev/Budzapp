import { notifications } from '@mantine/notifications'

export function handleApiErrorUtil(error: unknown) {
	if (
		error &&
		typeof error === 'object' &&
		'response' in error &&
		error.response &&
		typeof error.response === 'object' &&
		'data' in error.response &&
		error.response.data &&
		typeof error.response.data === 'object' &&
		'message' in error.response.data
	) {
		const errorMessage = (error as { response: { data: { message: string } } })
			.response.data.message
		return notifications.show({
			color: 'red',
			title: 'Error',
			message: errorMessage,
		})
	}

	notifications.show({
		message: 'Ocorreu um erro inesperado. Tente novamente.',
	})
}
