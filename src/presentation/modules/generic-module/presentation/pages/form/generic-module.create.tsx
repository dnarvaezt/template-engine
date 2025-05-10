import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GenericModule, genericModuleRepository } from '../../../application'
import { CreateGenericModuleInput } from '../../../application/domain'
import { useI18nGenericModule } from '../../i18n'
import { GenericModuleRouteMap } from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { t } = useI18nGenericModule()

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
      navigate(GenericModuleRouteMap.BasePath)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericModuleForm
      title={t('genericModule.create.title')}
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
