import type {
	IProductRepository,
	ICreateProductRequestRepository,
	ICreateProductResponseRepository,
	IProduct,
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

	async getAllByCompanyId(companyId: string): Promise<Omit<IProduct, 'Company'>[]> {
		return await prisma.product.findMany({
			where: {
				companyId,
			},
		})
	}
}
