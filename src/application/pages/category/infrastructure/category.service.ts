import { CategoryModel } from './category.model'
import { CategoryRepository } from './category.repository'

export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async search(): Promise<CategoryModel[]> {
    return this.repository.search()
  }

  async findById(id: string): Promise<CategoryModel | null> {
    return this.repository.findById(id)
  }

  async create(category: CategoryModel): Promise<CategoryModel> {
    return this.repository.create(category)
  }

  async update(category: CategoryModel): Promise<CategoryModel> {
    return this.repository.update(category)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
