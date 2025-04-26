import { Category } from './category.model'
import { CategoryRepository } from './category.repository'

export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}

  async search(): Promise<Category[]> {
    return this.repository.search()
  }

  async findById(id: string): Promise<Category | null> {
    return this.repository.findById(id)
  }

  async create(category: Category): Promise<Category> {
    return this.repository.create(category)
  }

  async update(category: Category): Promise<Category> {
    return this.repository.update(category)
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id)
  }
}
