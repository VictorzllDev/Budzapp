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
		return error.response.data.message
	}

	return 'Ocorreu um erro inesperado. Tente novamente.'
}
