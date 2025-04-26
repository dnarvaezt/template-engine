import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { useCategoryDetail } from '../../hooks'
import { CategoryBasePath } from '../category.router'
import { CategoryForm } from './category.form'

export const CategoryEdit = () => {
  const { id, category, loading, setLoading } = useCategoryDetail()

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: CategoryModel) => {
    if (!id) return

    try {
      setLoading(true)
      const category = await categoryService.findById(id)
      if (category) {
        const updatedCategory = category.updateName(values.name)
        await categoryService.update(updatedCategory)
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

  if (!category) return null

  return (
    <CategoryForm
      title="Editar Categoría"
      initialValues={category}
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
