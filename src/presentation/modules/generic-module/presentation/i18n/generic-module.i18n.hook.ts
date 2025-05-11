import { I18nResource, useI18nTranslation } from '@app/presentation/i18n'
import { useEffect, useState } from 'react'
import enGenericModule from './locales/en.generic-module.json'
import esGenericModule from './locales/es.generic-module.json'

export const useI18nGenericModule = () => {
  const [isReady, setIsReady] = useState(false)
  const namespace = 'genericModule'
  const resources: I18nResource[] = [
    { lang: 'en', resource: enGenericModule },
    { lang: 'es', resource: esGenericModule },
  ]

  const translation = useI18nTranslation({ namespace, resources })

  useEffect(() => {
    if (translation.i18n.isInitialized) {
      setIsReady(true)
    }
  }, [translation.i18n.isInitialized])

  return { ...translation, isReady }
}
