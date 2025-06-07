import axios from 'axios'
import { apiClientService } from './api-client.service'
import type { IProduct } from '../types/product.types'

export interface ICreateProductProps {
	name: string
	description: string
	price: number
	image: File
}

interface ICreateProductResponse {
	product: IProduct
	signedUrl: string
}

export async function createProduct({ name, description, price, image }: ICreateProductProps): Promise<IProduct> {
	const {
		data: { product, signedUrl },
	} = await apiClientService.post<ICreateProductResponse>('/product', {
		name,
		description,
		price,
		contentType: image.type,
	})

	await axios.put(signedUrl, image, {
		headers: {
			'Content-Type': image.type,
		},
	})

	return product
}

export interface IGetProductsProps {
	companyId: string
}

export async function getProducts({ companyId }: IGetProductsProps) {
	const { data } = await apiClientService.get<IProduct[]>(`/product/${companyId}`)

	return data
}
