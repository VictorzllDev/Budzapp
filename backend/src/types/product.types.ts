import type { ICompany } from './company.types'

export interface IProduct {
	id: string
	name: string
	description: string
	price: number
	filePath: string
	createdAt: Date
	updatedAt: Date
	Company: ICompany
	companyId: string
}

export interface IProductRequest {
	name: string
	description: string
	price: number
	contentType: string
	companyId: string
}

export interface IProductRequestRepository extends Omit<IProductRequest, 'contentType'> {
	filePath: string
}

export interface IProductResponse {
	product: Omit<IProduct, 'Company'>
	signedUrl: string
}
export interface IProductResponseRepository extends Omit<IProduct, 'Company'> {}

export interface IProductUseCase {
	create(data: IProductRequest): Promise<IProductResponse>
}

export interface IProductRepository {
	save(data: IProductRequestRepository): Promise<IProductResponseRepository>
}
