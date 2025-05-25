import { createContext } from 'react'
import { GenericModule } from '../../../core'

export interface GenericModuleHomeContextValue {
  items: GenericModule[]
  loading: boolean
  loadItems: () => Promise<void>
}

export const GenericModuleHomeContext =
  createContext<GenericModuleHomeContextValue>({
    items: [],
    loading: true,
    loadItems: async () => {},
  })
