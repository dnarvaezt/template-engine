import { Button, message, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { DeleteCategoryButton } from '../../components'
import { CategoryRouteMap } from '../category.routes'
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

  const handleView = (category: CategoryModel) => {
    navigate(`${CategoryRouteMap.BasePath}/${category.id}`)
  }

  const handleEdit = (category: CategoryModel) => {
    navigate(`${CategoryRouteMap.BasePath}/${category.id}/edit`)
  }

  const renderActions = (category: CategoryModel) => {
    return (
      <Space>
        <Button
          type="link"
          onClick={() =>
            navigate(`${CategoryRouteMap.BasePath}/${category.id}`)
          }
        >
          Ver
        </Button>
        <Button
          type="link"
          onClick={() =>
            navigate(`${CategoryRouteMap.BasePath}/${category.id}/edit`)
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
          onClick={() => navigate(`${CategoryRouteMap.BasePath}/new`)}
        >
          Nueva Categoría
        </Button>
      </div>

      <CategoryTable categories={categories} renderActions={renderActions} />
    </div>
  )
}
