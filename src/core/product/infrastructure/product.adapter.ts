import {
  CreateProductUseCase,
  DeleteProductUseCase,
  GetProductUseCase,
  Product,
  ProductRepository,
  SearchProductUseCase,
  UpdateProductUseCase,
} from '../domain'

export class ProductAdapter implements ProductRepository {
  constructor(
    private readonly createProductService: CreateProductUseCase,
    private readonly updateProductService: UpdateProductUseCase,
    private readonly deleteProductService: DeleteProductUseCase,
    private readonly getProductService: GetProductUseCase,
    private readonly searchProductService: SearchProductUseCase
  ) {}

  async create(product: Product): Promise<Product> {
    return this.createProductService.execute(product)
  }

  async update(product: Product): Promise<Product> {
    return this.updateProductService.execute(product)
  }

  async delete(productId: string): Promise<void> {
    return this.deleteProductService.execute(productId)
  }

  async getById(productId: string): Promise<Product | null> {
    return this.getProductService.execute(productId)
  }

  async search(criteria: Partial<Product>): Promise<Product[]> {
    return this.searchProductService.execute(criteria)
  }
}
