import { message } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Category, categoryService } from '../../infrastructure'
import { CategoryForm } from '../components/category.form'
import { CategoryBasePath } from './category.router'

interface CategoryFormValues {
  name: string
}

export const CategoryCreate: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: CategoryFormValues) => {
    try {
      setLoading(true)
      const newCategory = new Category({ name: values.name })
      await categoryService.createCategory(newCategory)
      message.success('Categoría creada exitosamente')
      navigate(CategoryBasePath)
    } catch (error) {
      console.error('Error al crear categoría:', error)
      message.error(
        'Error al crear la categoría. Por favor, intente nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <CategoryForm
      title="Crear Categoría"
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
