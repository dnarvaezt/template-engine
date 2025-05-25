import { useEffect, useState } from 'react'
import { GenericModule, genericModuleRepository } from '../../../core'
import { ErrorFactory } from '../../../core/domain'
import { GenericModuleHomeContextValue } from './generic-module.home.context'

export const useGenericModuleHome = (): GenericModuleHomeContextValue => {
  const [items, setItems] = useState<GenericModule[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadItems = async () => {
    try {
      setLoading(true)
      const response = await genericModuleRepository.search({})
      setItems(response.data)
    } catch (error) {
      throw ErrorFactory.genericError('Error loading items', {
        originalError: error as Error,
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
