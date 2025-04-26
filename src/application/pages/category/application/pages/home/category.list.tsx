import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { CategoryRouteMap } from '../category.routes'
import { CategoryTable } from './category.table'

export const CategoryList = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<CategoryModel[]>([])

  const loadCategories = async () => {
    try {
      const data = await categoryService.search()
      setCategories(data)
    } catch (error) {
      message.error('Error al cargar las categorías')
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleView = (category: CategoryModel) => {
    navigate(`${CategoryRouteMap.BasePath}/${category.id}`)
  }

  const handleEdit = (category: CategoryModel) => {
    navigate(`${CategoryRouteMap.BasePath}/${category.id}/edit`)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate(`${CategoryRouteMap.BasePath}/new`)}
        >
          Nueva Categoría
        </Button>
      </div>

      <CategoryTable
        categories={categories}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={() => {}} // Esta prop ya no es necesaria pero la mantenemos por compatibilidad
        onSuccess={loadCategories}
      />
    </div>
  )
}
