import { Product } from '../../entities'

export interface ProductRepository {
  create(item: Product): Promise<Product>
  update(item: Product): Promise<Product>
  delete(itemId: string): Promise<void>
  getById(itemId: string): Promise<Product | null>
  search(args: Partial<Product>): Promise<Product[]>
}
