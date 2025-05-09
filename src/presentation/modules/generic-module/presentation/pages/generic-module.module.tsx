import { GenericModuleContext } from './generic-module.context'
import { useGenericModuleContext } from './generic-module.hook'
import { GenericModuleRoutes } from './generic-module.routes'

export const GenericModuleModule = () => {
  const contextValue = useGenericModuleContext()

  return (
    <GenericModuleContext.Provider value={contextValue}>
      <GenericModuleRoutes />
    </GenericModuleContext.Provider>
  )
}
