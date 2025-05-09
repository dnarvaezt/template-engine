import { Product, ProductRepository, SearchProductUseCase } from '../domain'

export class SearchProductService implements SearchProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(criteria: Partial<Product>): Promise<Product[]> {
    try {
      return await this.productRepository.search(criteria)
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`)
    }
  }
}
