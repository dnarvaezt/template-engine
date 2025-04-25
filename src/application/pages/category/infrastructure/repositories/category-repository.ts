import { Category } from '../models/category'

export interface CategoryRepository {
  findAll(): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  create(category: Category): Promise<Category>
  update(category: Category): Promise<Category>
  delete(id: string): Promise<void>
}
