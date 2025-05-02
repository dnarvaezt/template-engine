import { createContext } from 'react'
import { GenericModuleModel } from '../../../infrastructure'

export interface GenericModuleHomeContextValue {
  categories: GenericModuleModel[]
  loading: boolean
  loadCategories: () => Promise<void>
}

export const GenericModuleHomeContext =
  createContext<GenericModuleHomeContextValue>({
    categories: [],
    loading: true,
    loadCategories: async () => {},
  })
