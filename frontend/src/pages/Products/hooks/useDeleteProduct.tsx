import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteProduct } from '../../../services/product.service'
import type { IProduct } from '../../../types/product.types'
import { handleApiErrorUtil } from '../../../utils/error-handler.util'

export function useDeleteProduct() {
	const queryClient = useQueryClient()
	const mutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: (_, id) => {
			notifications.show({
				message: 'Produto deletado com sucesso!',
				color: 'green',
			})

			queryClient.setQueryData(['productsData'], (oldData: IProduct[] | undefined) => {
				return oldData?.filter((product) => product.id !== id)
			})
		},
		onError: (error) => {
			handleApiErrorUtil(error)
		},
	})

	return {
		...mutation,
	}
}
