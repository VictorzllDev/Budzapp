import type { IProductRepository, IProductRequestRepository, IProductResponseRepository } from '../types/product.types'
import { prisma } from '../utils/prisma-client.util'

export class ProductRepository implements IProductRepository {
	async save({
		name,
		description,
		price,
		filePath,
		companyId,
	}: IProductRequestRepository): Promise<IProductResponseRepository> {
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
