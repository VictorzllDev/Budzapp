import type { IProduct } from './product.types'

export interface ICompany {
	id: string
	email: string
	password: string
	createdAt: Date
	updatedAt: Date
	products?: IProduct[]
}
