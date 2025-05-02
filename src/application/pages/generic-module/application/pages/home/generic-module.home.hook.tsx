import { useEffect, useState } from 'react'
import { MessageHandlerService } from 'src/infrastructure'
import {
  GenericModuleModel,
  genericModuleService,
} from '../../../infrastructure'
import { GenericModuleHomeContextValue } from './generic-module.home.context'

export const useGenericModuleHome = (): GenericModuleHomeContextValue => {
  const [categories, setCategories] = useState<GenericModuleModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await genericModuleService.search()
      setCategories(data)
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error al cargar las categorías',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return { categories, loading, loadCategories }
}
