import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Category,
  CategoryRepositoryImpl,
  CategoryServiceImpl,
} from '../../infrastructure'
import { CategoryTable } from '../components/category.table'
import { CategoryBasePath } from './category.router'

const repository = new CategoryRepositoryImpl()
const categoryService = new CategoryServiceImpl(repository)

export const CategoryList: React.FC = () => {
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
