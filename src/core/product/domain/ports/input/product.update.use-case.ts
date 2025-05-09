import { Product } from '../../entities/product.entity'

export interface UpdateProductInput extends Partial<Product> {
  id: string
}

export interface UpdateProductOutput extends Product {}

export interface UpdateProductUseCase {
  execute(item: UpdateProductInput): Promise<UpdateProductOutput>
}
