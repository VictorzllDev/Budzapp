import axios from 'axios'
import { apiClientService } from './api-client.service'

// Create a new product - product
export interface ICreateProduct {
	name: string
	description: string
	price: number
	image: File
}
export async function createProduct({ name, description, price, image }: ICreateProduct) {
	const {
		data: { signedUrl, product },
	} = await apiClientService.post('/product', {
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
