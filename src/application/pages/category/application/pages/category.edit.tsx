import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { categoryService } from '../../infrastructure'
import { CategoryForm } from '../components/category.form'
import { CategoryBasePath } from './category.router'

interface CategoryFormValues {
  name: string
}

export const CategoryEdit: React.FC = () => {
  const [initialValues, setInitialValues] = useState<
    CategoryFormValues | undefined
  >()
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        message.error('ID de categoría no válido')
        navigate(CategoryBasePath)
        return
      }

      try {
        setLoading(true)
        const category = await categoryService.getCategoryById(id)
        if (category) {
          setInitialValues({ name: category.name })
        } else {
          message.error('Categoría no encontrada')
          navigate(CategoryBasePath)
        }
      } catch (error) {
        console.error('Error al cargar categoría:', error)
        message.error('Error al cargar la categoría')
        navigate(CategoryBasePath)
      } finally {
        setLoading(false)
      }
    }

    fetchCategory()
  }, [id, navigate])

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: CategoryFormValues) => {
    if (!id) return

    try {
      setLoading(true)
      const category = await categoryService.getCategoryById(id)
      if (category) {
        const updatedCategory = category.updateName(values.name)
        await categoryService.updateCategory(updatedCategory)
        message.success('Categoría actualizada exitosamente')
        navigate(CategoryBasePath)
      } else {
        message.error('Categoría no encontrada')
        navigate(CategoryBasePath)
      }
    } catch (error) {
      console.error('Error al actualizar categoría:', error)
      message.error(
        'Error al actualizar la categoría. Por favor, intente nuevamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <CategoryForm
      title="Editar Categoría"
      initialValues={initialValues}
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
