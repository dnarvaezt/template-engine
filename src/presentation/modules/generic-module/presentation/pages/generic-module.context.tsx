import { createContext } from 'react'

export interface GenericModuleContextValue {}

export const GenericModuleContext = createContext<GenericModuleContextValue>({})
