import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../../../services/product.service'
import { handleApiErrorUtil } from '../../../utils/error-handler.util'
import { IProduct } from '../../../types/product.types'

export function useCreateProduct() {
	const queryClient = useQueryClient()

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			image: null,
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
		onSuccess: (data: IProduct) => {
			notifications.show({
				message: 'Produto criado com sucesso!',
				color: 'green',
			})

			queryClient.setQueryData(['productsData'], (oldData: IProduct[] | undefined) => {
				return oldData ? [...oldData, data] : [data]
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
