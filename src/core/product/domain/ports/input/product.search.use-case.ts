import { Product } from '../../entities/product.entity'

export interface SearchProductInput extends Partial<Product> {}

export interface SearchProductUseCase {
  execute(args: SearchProductInput): Promise<Product[]>
}
