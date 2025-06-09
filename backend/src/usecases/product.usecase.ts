import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuid } from 'uuid'
import { env } from '../env'
import type {
	ICreateProductRequest,
	ICreateProductResponse,
	IProduct,
	IProductRepository,
	IProductUseCase,
} from '../types/product.types'
import { r2 } from '../utils/cloudflare-client.util'
import { HttpError } from '../utils/http-error.util'

export class ProductUseCase implements IProductUseCase {
	constructor(private productRepository: IProductRepository) {}

	async create({
		name,
		description,
		price,
		contentType,
		companyId,
	}: ICreateProductRequest): Promise<ICreateProductResponse> {
		const filePath = `products/${companyId}/${uuid()}-${name}.${contentType.split('/')[1]}`

		const signedUrl = await getSignedUrl(
			r2,
			new PutObjectCommand({
				Bucket: env.CLOUDFLARE_BUCKET,
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

	async getAllByCompanyId(companyId: string): Promise<IProduct[]> {
		return await this.productRepository.getAllByCompanyId(companyId)
	}

	async deleteById(id: string, companyId: string): Promise<void> {
		const product = await this.productRepository.getById(id)
		if (!product) throw new HttpError('Produto não encontrado', 404)

		if (product.companyId !== companyId) {
			throw new HttpError('Você não está autorizado a excluir este produto', 403)
		}

		await r2.send(
			new DeleteObjectCommand({
				Bucket: env.CLOUDFLARE_BUCKET,
				Key: product.filePath,
			}),
		)

		await this.productRepository.deleteById(id)
	}
}
