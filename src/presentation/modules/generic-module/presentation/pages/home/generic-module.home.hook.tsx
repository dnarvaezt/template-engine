import { useEffect, useState } from 'react'
import { GenericModule, genericModuleRepository } from '../../../core'
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
      throw new Error(`Failed to load items ${error}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadItems()
  }, [])

  return { items, loading, loadItems }
}
