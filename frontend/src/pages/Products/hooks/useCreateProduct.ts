import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../../../services/product.service'
import type { IProduct } from '../../../types/product.types'
import { handleApiErrorUtil } from '../../../utils/error-handler.util'

export function useCreateProduct() {
	const queryClient = useQueryClient()

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			name: '',
			description: '',
			price: 0,
			image: null as unknown as File,
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
