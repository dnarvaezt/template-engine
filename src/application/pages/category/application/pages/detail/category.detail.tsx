import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteCategoryButton } from '../../components/category.delete-alert'
import { useCategoryDetail } from '../../hooks'
import { CategoryBasePath } from '../category.router'

export const CategoryDetail = () => {
  const navigate = useNavigate()
  const { id, category, loading } = useCategoryDetail()

  const handleEdit = () => {
    if (category) {
      navigate(`/categories/${category.id}/edit`)
    }
  }

  const handleDeleteSuccess = () => {
    navigate(CategoryBasePath)
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
        <Button onClick={() => navigate(CategoryBasePath)} disabled={loading}>
          Volver
        </Button>
      </Space>
    </div>
  )
}
