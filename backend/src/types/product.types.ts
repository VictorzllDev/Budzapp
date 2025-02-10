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

export interface ICreateProductRequest {
	name: string
	description: string
	price: number
	contentType: string
	companyId: string
}

export interface ICreateProductRequestRepository extends Omit<ICreateProductRequest, 'contentType'> {
	filePath: string
}

export interface ICreateProductResponse {
	product: Omit<IProduct, 'Company'>
	signedUrl: string
}

export interface ICreateProductResponseRepository extends Omit<IProduct, 'Company'> {}

export interface IProductUseCase {
	create(data: ICreateProductRequest): Promise<ICreateProductResponse>
}

export interface IProductRepository {
	save(data: ICreateProductRequestRepository): Promise<ICreateProductResponseRepository>
}
