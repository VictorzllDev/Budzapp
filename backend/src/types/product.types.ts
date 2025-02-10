import type { ICompany } from './company.types'

export interface IProduct {
	id: string
	name: string
	description: string
	price: number
	filePath: string
	createdAt: Date
	updatedAt: Date
	Company?: ICompany
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
	product: IProduct
	signedUrl: string
}

export interface IProductUseCase {
	create(data: ICreateProductRequest): Promise<ICreateProductResponse>
	getAllByCompanyId(companyId: string): Promise<IProduct[]>
	deleteById(id: string, companyId: string): Promise<void>
}

export interface IProductRepository {
	save(data: ICreateProductRequestRepository): Promise<IProduct>
	getAllByCompanyId(companyId: string): Promise<IProduct[]>
	deleteById(id: string): Promise<void>
	getById(id: string): Promise<IProduct | null>
}
