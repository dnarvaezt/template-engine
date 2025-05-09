import {
  CreateProductInput,
  CreateProductUseCase,
  InvalidProductDataError,
  Product,
  ProductRepository,
  ProductValidator,
} from '../domain'

export class CreateProductService implements CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(input: CreateProductInput): Promise<Product> {
    try {
      ProductValidator.validate(input)

      const product = new Product({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      })

      return await this.repository.create(product)
    } catch (error) {
      throw error instanceof InvalidProductDataError
        ? error
        : new InvalidProductDataError(
            `Failed to create product: ${error.message}`,
            error
          )
    }
  }
}
