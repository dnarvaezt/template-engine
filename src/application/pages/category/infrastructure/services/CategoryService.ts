import { Category } from '../models/Category'

export interface CategoryService {
  getAllCategories(): Promise<Category[]>
  getCategoryById(id: string): Promise<Category | null>
  createCategory(category: Category): Promise<Category>
  updateCategory(category: Category): Promise<Category>
  deleteCategory(id: string): Promise<void>
}
