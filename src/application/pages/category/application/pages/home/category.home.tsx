import { Button, message, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { DeleteCategoryButton } from '../../components'
import { CategoryRouteMap, getCategoryRouteUrl } from '../category.routes'
import { CategoryTable } from './category.table'

export const CategoryHome = () => {
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

  const renderActions = (category: CategoryModel) => {
    return (
      <Space>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getCategoryRouteUrl(CategoryRouteMap.Detail, { id: category.id })
            )
          }
        >
          Ver
        </Button>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getCategoryRouteUrl(CategoryRouteMap.Edit, { id: category.id })
            )
          }
        >
          Editar
        </Button>
        <DeleteCategoryButton category={category} onSuccess={loadCategories} />
      </Space>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate(getCategoryRouteUrl(CategoryRouteMap.New))}
        >
          Nueva Categoría
        </Button>
      </div>

      <CategoryTable categories={categories} renderActions={renderActions} />
    </div>
  )
}
