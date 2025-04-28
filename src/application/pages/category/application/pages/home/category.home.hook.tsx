import { useEffect, useState } from 'react'
import { MessageHandlerService } from 'src/infrastructure'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { CategoryHomeContextValue } from './category.home.context'

export const useCategoryHome = (): CategoryHomeContextValue => {
  const [categories, setCategories] = useState<CategoryModel[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const loadCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryService.search()
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
