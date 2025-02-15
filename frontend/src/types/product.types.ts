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
