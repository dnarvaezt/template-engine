import { useEffect, useState } from 'react'
import { MessageHandlerService } from 'src/infrastructure'
import {
  GenericModuleModel,
  genericModuleService,
} from '../../../infrastructure'
import { GenericModuleHomeContextValue } from './generic-module.home.context'

export const useGenericModuleHome = (): GenericModuleHomeContextValue => {
  const [items, setItems] = useState<GenericModuleModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadItems = async () => {
    try {
      setLoading(true)
      const data = await genericModuleService.search()
      setItems(data)
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error loading items',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  return { items, loading, loadItems }
}
