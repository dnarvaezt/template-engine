import {
  InvalidProductDataError,
  Product,
  ProductNotFoundError,
  ProductRepository,
  ProductValidator,
} from '../../domain'

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = []

  async create(product: Product): Promise<Product> {
    try {
      ProductValidator.validate(product)
    } catch (error) {
      throw new InvalidProductDataError(error.message)
    }

    product.id = (this.products.length + 1).toString()
    this.products.push(product)
    return product
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex((p) => p.id === product.id)
    if (index === -1) throw new ProductNotFoundError(product.id)

    try {
      ProductValidator.validate(product)
    } catch (error) {
      throw new InvalidProductDataError(error.message)
    }

    this.products[index] = {
      ...this.products[index],
      ...product,
      updatedAt: new Date(),
    }
    return this.products[index]
  }

  async delete(productId: string): Promise<void> {
    const index = this.products.findIndex((p) => p.id === productId)
    if (index === -1) throw new ProductNotFoundError(productId)

    this.products.splice(index, 1)
  }

  async getById(productId: string): Promise<Product | null> {
    if (!productId) throw new InvalidProductDataError('Product ID is required')

    return this.products.find((p) => p.id === productId) || null
  }

  async search(criteria: Partial<Product>): Promise<Product[]> {
    return this.products.filter((product) =>
      Object.entries(criteria).every(
        ([key, value]) => product[key as keyof Product] === value
      )
    )
  }
}
