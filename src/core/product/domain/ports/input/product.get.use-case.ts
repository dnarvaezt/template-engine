import { Product } from '../../entities/product.entity'

export interface GetProductUseCase {
  execute(itemId: string): Promise<Product | null>
}
