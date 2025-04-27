import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteCategoryButton } from '../../components/category.delete-alert'
import { useCategoryDetail } from '../../hooks'
import { CategoryRouteMap, getCategoryRouteUrl } from '../category.routes'

export const CategoryDetail = () => {
  const navigate = useNavigate()
  const { id, category, loading } = useCategoryDetail()

  const handleEdit = () => {
    if (category)
      navigate(getCategoryRouteUrl(CategoryRouteMap.Edit, { id: category.id }))
  }

  const handleDeleteSuccess = () => {
    navigate(CategoryRouteMap.BasePath)
  }

  if (loading && !category) {
    return <div>Cargando...</div>
  }

  if (!category) {
    return <div>No se encontró la categoría</div>
  }

  return (
    <div>
      <h1>Detalles de la Categoría {id}</h1>
      <div style={{ marginBottom: 16 }}>
        <p>
          <strong>Nombre:</strong> {category.name}
        </p>
      </div>
      <Space>
        <Button type="primary" onClick={handleEdit} disabled={loading}>
          Editar
        </Button>
        <DeleteCategoryButton
          category={category}
          onSuccess={handleDeleteSuccess}
        />
        <Button
          onClick={() => navigate(CategoryRouteMap.BasePath)}
          disabled={loading}
        >
          Volver
        </Button>
      </Space>
    </div>
  )
}
