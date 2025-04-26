import {
  CategoryRepository,
  CategoryWebRepository,
} from './category.repository'
import { CategoryService } from './category.service'

const categoryRepository: CategoryRepository = new CategoryWebRepository()

export const categoryService = new CategoryService(categoryRepository)
