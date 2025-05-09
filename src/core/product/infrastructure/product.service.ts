import { ProductRepository } from '../domain'
import { ProductServiceFactory } from './product.factory'
import { InMemoryProductRepository } from './repository'

export const productService: ProductRepository = ProductServiceFactory.create(
  new InMemoryProductRepository()
)
