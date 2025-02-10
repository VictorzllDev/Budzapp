import type {
	IProductRepository,
	ICreateProductRequestRepository,
	ICreateProductResponseRepository,
} from '../types/product.types'
import { prisma } from '../utils/prisma-client.util'

export class ProductRepository implements IProductRepository {
	async save({
		name,
		description,
		price,
		filePath,
		companyId,
	}: ICreateProductRequestRepository): Promise<ICreateProductResponseRepository> {
		return await prisma.product.create({
			data: {
				name,
				description,
				price,
				filePath,
				companyId,
			},
		})
	}
}
