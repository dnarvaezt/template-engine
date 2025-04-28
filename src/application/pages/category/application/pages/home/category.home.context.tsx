import { createContext } from 'react'
import { CategoryModel } from '../../../infrastructure'

export interface CategoryHomeContextValue {
  categories: CategoryModel[]
  loading: boolean
  loadCategories: () => Promise<void>
}

export const CategoryHomeContext = createContext<CategoryHomeContextValue>({
  categories: [],
  loading: true,
  loadCategories: async () => {},
})
