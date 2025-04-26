import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../infrastructure'

export const useCategoryDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [category, setCategory] = useState<CategoryModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        setError('Invalid category ID')
        return
      }

      try {
        setLoading(true)
        const fetchedCategory = await categoryService.findById(id)
        if (fetchedCategory) {
          setCategory(fetchedCategory)
        } else {
          setError('Category not found')
        }
      } catch (err) {
        setError('Error fetching category')
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [id])

  return { id, category, loading, error, setLoading }
}
