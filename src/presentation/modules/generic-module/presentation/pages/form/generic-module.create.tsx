import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageHandlerService } from 'src/application'
import { GenericModule, genericModuleRepository } from '../../../application'
import { CreateGenericModuleInput } from '../../../application/domain'
import { GenericModuleRouteMap } from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: GenericModule) => {
    try {
      setLoading(true)
      const newGenericModule = {
        name: values.name,
      } as CreateGenericModuleInput
      await genericModuleRepository.create(newGenericModule)
      MessageHandlerService.success('Item created successfully')
      navigate(GenericModuleRouteMap.BasePath)
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error creating item',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericModuleForm
      title="Create Item"
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
