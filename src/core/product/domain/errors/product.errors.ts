import { BaseError } from './base.error'

export class InvalidProductDataError extends BaseError {
  constructor(message: string, details?: any) {
    super(message, details)
  }
}

export class ProductNotFoundError extends BaseError {
  constructor(productId: string) {
    super(`Product with ID ${productId} not found`)
  }
}
