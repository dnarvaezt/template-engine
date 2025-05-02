import { createContext } from 'react'
import { GenericModuleModel } from '../../../infrastructure'

export interface GenericModuleHomeContextValue {
  items: GenericModuleModel[]
  loading: boolean
  loadItems: () => Promise<void>
}

export const GenericModuleHomeContext =
  createContext<GenericModuleHomeContextValue>({
    items: [],
    loading: true,
    loadItems: async () => {},
  })
