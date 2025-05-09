import { GetProductUseCase, Product, ProductRepository } from '../domain'

export class GetProductService implements GetProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(productId: string): Promise<Product | null> {
    if (!productId) {
      throw new Error('Product ID is required')
    }

    try {
      return await this.productRepository.getById(productId)
    } catch (error) {
      throw new Error(`Failed to get product: ${error.message}`)
    }
  }
}
