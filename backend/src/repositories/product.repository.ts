import type { ICreateProductRequestRepository, IProduct, IProductRepository } from '../types/product.types'
import { prisma } from '../utils/prisma-client.util'

export class ProductRepository implements IProductRepository {
	async save({ name, description, price, filePath, companyId }: ICreateProductRequestRepository): Promise<IProduct> {
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

	async getAllByCompanyId(companyId: string): Promise<IProduct[]> {
		return await prisma.product.findMany({
			where: {
				companyId,
			},
		})
	}

	async deleteById(id: string): Promise<void> {
		await prisma.product.delete({
			where: {
				id,
			},
		})
	}

	async getById(id: string): Promise<IProduct | null> {
		return await prisma.product.findUnique({
			where: {
				id,
			},
		})
	}
}
