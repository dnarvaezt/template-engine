import { message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { CategoryRouteMap } from '../category.routes'
import { CategoryForm } from './category.form'

export const CategoryCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: CategoryModel) => {
    try {
      setLoading(true)
      const newCategory = new CategoryModel({ name: values.name })
      await categoryService.create(newCategory)
      message.success('Categoría creada exitosamente')
      navigate(CategoryRouteMap.BasePath)
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
