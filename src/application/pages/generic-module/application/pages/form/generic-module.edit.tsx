import { useNavigate } from 'react-router-dom'
import { MessageHandlerService } from 'src/infrastructure'
import {
  GenericModuleModel,
  genericModuleService,
} from '../../../infrastructure'
import { useGenericModuleDetail } from '../../hooks'
import { GenericModuleRouteMap } from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleEdit = () => {
  const { id, genericModule, loading, setLoading } = useGenericModuleDetail()

  const navigate = useNavigate()

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: GenericModuleModel) => {
    if (!id) return

    try {
      setLoading(true)
      const genericModule = await genericModuleService.get(id)
      if (genericModule) {
        genericModule.name = values.name
        const updatedGenericModule = genericModule
        await genericModuleService.update(updatedGenericModule)
        MessageHandlerService.success('Item updated successfully')
        navigate(GenericModuleRouteMap.BasePath)
      } else {
        MessageHandlerService.error({
          defaultMessage: 'Item not found',
        })
        navigate(GenericModuleRouteMap.BasePath)
      }
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error updating item. Please try again.',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!genericModule) return null

  return (
    <GenericModuleForm
      title="Edit Item"
      genericModule={genericModule}
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
