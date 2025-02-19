import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { createProduct } from '../../../services/product.service'
import { handleApiErrorUtil } from '../../../utils/error-handler.util'

export function useCreateProduct() {
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			image: new File([], ''),
		},

		validate: {
			name: (value) => (value.length > 0 ? null : 'Campo obrigatório'),
			description: (value) => (value.length > 0 ? null : 'Campo obrigatório'),
			price: (value) => (value > 0 ? null : 'Campo obrigatório'),
			image: (value) => (value ? null : 'Campo obrigatório'),
		},
	})

	const mutation = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			notifications.show({
				message: 'Produto criado com sucesso!',
				color: 'green',
			})
			form.reset()
		},
		onError: (error) => {
			handleApiErrorUtil(error)
			form.reset()
		},
	})

	return {
		form,
		...mutation,
	}
}
