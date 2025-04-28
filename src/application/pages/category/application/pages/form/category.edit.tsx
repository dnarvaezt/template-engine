import { useNavigate } from 'react-router-dom'
import { MessageHandlerService } from 'src/infrastructure'
import { CategoryModel, categoryService } from '../../../infrastructure'
import { useCategoryDetail } from '../../hooks'
import { CategoryRouteMap } from '../category.routes'
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
      const category = await categoryService.get(id)
      if (category) {
        category.name = values.name
        const updatedCategory = category
        await categoryService.update(updatedCategory)
        MessageHandlerService.success('Categoría actualizada exitosamente')
        navigate(CategoryRouteMap.BasePath)
      } else {
        MessageHandlerService.error({
          defaultMessage: 'Categoría no encontrada',
        })
        navigate(CategoryRouteMap.BasePath)
      }
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage:
          'Error al actualizar la categoría. Por favor, intente nuevamente.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!category) return null

  return (
    <CategoryForm
      title="Editar Categoría"
      category={category}
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
