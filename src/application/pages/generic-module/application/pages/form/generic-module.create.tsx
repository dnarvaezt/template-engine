import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageHandlerService } from 'src/infrastructure'
import {
  GenericModuleModel,
  genericModuleService,
} from '../../../infrastructure'
import { GenericModuleRouteMap } from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: GenericModuleModel) => {
    try {
      setLoading(true)
      const newGenericModule = new GenericModuleModel({ name: values.name })
      await genericModuleService.set(newGenericModule)
      MessageHandlerService.success('Categoría creada exitosamente')
      navigate(GenericModuleRouteMap.BasePath)
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error al crear la categoría',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericModuleForm
      title="Crear Categoría"
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
