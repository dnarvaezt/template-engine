import {
  Product,
  ProductNotFoundError,
  ProductRepository,
  ProductValidator,
  UpdateProductInput,
  UpdateProductUseCase,
} from '../domain'

export class UpdateProductService implements UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    ProductValidator.validate(input)

    const existingProduct = await this.productRepository.getById(input.id)
    if (!existingProduct) {
      throw new ProductNotFoundError(input.id)
    }

    const updatedProduct = {
      ...existingProduct,
      ...input,
      updatedAt: new Date(),
    }

    return await this.productRepository.update(updatedProduct)
  }
}
