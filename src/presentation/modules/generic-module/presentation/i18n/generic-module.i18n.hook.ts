import { I18nResource, useI18nTranslation } from 'src/presentation/i18n'
import enGenericModule from './locales/en.generic-module.json'
import esGenericModule from './locales/es.generic-module.json'

export const useI18nGenericModule = () => {
  const namespace = 'genericModule'
  const resources: I18nResource[] = [
    { lang: 'en', resource: enGenericModule },
    { lang: 'es', resource: esGenericModule },
  ]

  return useI18nTranslation({ namespace, resources })
}
