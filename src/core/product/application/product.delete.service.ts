import { DeleteProductUseCase, ProductRepository } from '../domain'

export class DeleteProductService implements DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    if (!productId) {
      throw new Error('Product ID is required')
    }

    try {
      await this.repository.delete(productId)
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`)
    }
  }
}
