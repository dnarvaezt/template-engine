import { Product } from '../entities'

export class ProductValidator {
  static validate(product: Partial<Product>): void {
    if (!product.name || product.name.trim() === '') {
      throw new Error('Product name is required')
    }
    if (!product.description || product.description.trim() === '') {
      throw new Error('Product description is required')
    }
    if (product.price !== undefined && product.price <= 0) {
      throw new Error('Product price must be greater than zero')
    }
    if (product.stock !== undefined && product.stock < 0) {
      throw new Error('Product stock cannot be negative')
    }
  }
}
