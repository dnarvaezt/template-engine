import { Button, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Category, categoryService } from '../../../infrastructure'
import { CategoryBasePath } from '../category.router'
import { CategoryTable } from './category.table'

export const CategoryList = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAllCategories()
      setCategories(data)
    } catch (error) {
      message.error('Error al cargar las categorías')
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleView = (category: Category) => {
    navigate(`${CategoryBasePath}/${category.id}`)
  }

  const handleEdit = (category: Category) => {
    navigate(`${CategoryBasePath}/${category.id}/edit`)
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={() => navigate(`${CategoryBasePath}/new`)}
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
