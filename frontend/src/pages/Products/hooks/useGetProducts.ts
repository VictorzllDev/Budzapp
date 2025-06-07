import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import type { IPayloadJWT } from '../../../services/auth.service'
import { getProducts } from '../../../services/product.service'

export function useGetProducts() {
	return useQuery({
		queryKey: ['productsData'],
		queryFn: async () => {
			const token = sessionStorage.getItem('token')

			if (token) {
				const { id } = jwtDecode<IPayloadJWT>(token)
				return await getProducts({ companyId: id })
			}
		},
	})
}
