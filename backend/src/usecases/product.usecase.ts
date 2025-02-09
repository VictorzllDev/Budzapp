import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuid } from 'uuid'
import type { ProductRepository } from '../repositories/product.repository'
import type {
	IProductRequest,
	IProductResponse,
	IProductUseCase,
} from '../types/product.types'
import { r2 } from '../utils/cloudflare-client.util'

export class ProductUseCase implements IProductUseCase {
	constructor(private productRepository: ProductRepository) {}

	async create({
		name,
		description,
		price,
		contentType,
		companyId,
	}: IProductRequest): Promise<IProductResponse> {
		const filePath = `products/${companyId}/${uuid()}-${name}.${contentType.split('/')[1]}`

		const signedUrl = await getSignedUrl(
			r2,
			new PutObjectCommand({
				Bucket: 'budzapp-dev',
				Key: filePath,
				ContentType: contentType,
			}),
			{ expiresIn: 60 * 5 }, // 5 minutes
		)

		const product = await this.productRepository.save({
			name,
			description,
			price,
			filePath,
			companyId,
		})

		return {
			product,
			signedUrl,
		}
	}
}
