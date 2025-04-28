import { Repository, WebRepository } from 'src/infrastructure'
import { CategoryModel } from './category.model'

export abstract class CategoryRepository extends Repository<CategoryModel> {}

export class CategoryWebRepository
  extends WebRepository<CategoryModel>
  implements CategoryRepository
{
  constructor() {
    super('categories')
  }
}
