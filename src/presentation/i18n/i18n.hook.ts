import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from './i18n.config'

export interface I18nResource {
  lang: string
  resource: any
}

export interface UseI18nTranslationParams {
  namespace: string
  resources: I18nResource[]
}

export const useI18nTranslation = (params: UseI18nTranslationParams) => {
  const { namespace, resources } = params
  const translation = useTranslation(namespace)

  useEffect(() => {
    resources.forEach(({ lang, resource }) => {
      if (!i18n.hasResourceBundle(lang, namespace)) {
        i18n.addResourceBundle(lang, namespace, resource, true, true)
      }
    })
  }, [namespace, resources])

  return translation
}
