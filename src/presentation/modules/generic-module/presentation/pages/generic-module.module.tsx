import { GenericModuleContext } from './generic-module.context'
import { useGenericModuleContext } from './generic-module.hook'
import { GenericModuleRoutes } from './generic-module.routes'

export const GenericModuleModule = () => {
  const contextValue = useGenericModuleContext()
  const { isReady } = contextValue

  if (!isReady) return null

  return (
    <GenericModuleContext.Provider value={contextValue}>
      <GenericModuleRoutes />
    </GenericModuleContext.Provider>
  )
}
