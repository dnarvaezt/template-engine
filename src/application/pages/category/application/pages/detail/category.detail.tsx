import { Button, message, Space } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Category, categoryService } from '../../../infrastructure'
import { DeleteCategoryButton } from '../../components/category.delete-alert'
import { CategoryBasePath } from '../category.router'

export const CategoryDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)

  const loadCategory = useCallback(async () => {
    try {
      setLoading(true)
      if (id) {
        const data = await categoryService.findById(id)
        setCategory(data)
      }
    } catch (error) {
      message.error('Error al cargar la categoría')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      loadCategory()
    }
  }, [id, loadCategory])

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
