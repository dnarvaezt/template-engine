import { useI18nGenericModule } from '../i18n'
import { GenericModuleContextValue } from './generic-module.context'

export const useGenericModuleContext = (): GenericModuleContextValue => {
  const { isReady } = useI18nGenericModule()

  return { isReady }
}
