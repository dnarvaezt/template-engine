import { createContext } from 'react'

export interface GenericModuleContextValue {
  isReady: boolean
}

export const GenericModuleContext = createContext<GenericModuleContextValue>({
  isReady: false,
})
