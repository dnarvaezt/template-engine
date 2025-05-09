import {
  CreateProductService,
  DeleteProductService,
  GetProductService,
  SearchProductService,
  UpdateProductService,
} from '../application'
import { ProductRepository } from '../domain'
import { ProductAdapter } from './product.adapter'

export class ProductServiceFactory {
  static create(repository: ProductRepository): ProductAdapter {
    const createProductService = new CreateProductService(repository)
    const updateProductService = new UpdateProductService(repository)
    const deleteProductService = new DeleteProductService(repository)
    const getProductService = new GetProductService(repository)
    const searchProductService = new SearchProductService(repository)

    return new ProductAdapter(
      createProductService,
      updateProductService,
      deleteProductService,
      getProductService,
      searchProductService
    )
  }
}
