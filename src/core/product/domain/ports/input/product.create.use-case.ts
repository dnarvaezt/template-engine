import { Product } from '../../entities/product.entity'

export interface CreateProductInput {
  name: string
  description: string
  price: number
  stock: number
}

export interface CreateProductOutput extends Product {}

export interface CreateProductUseCase {
  execute(item: CreateProductInput): Promise<CreateProductOutput>
}
