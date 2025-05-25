import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GenericModule, genericModuleRepository } from '../../../core'
import { CreateGenericModuleInput } from '../../../core/domain'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleCreate = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { t } = useI18nGenericModule()

  const handleFinish = async (values: GenericModule) => {
    try {
      setLoading(true)
      const newGenericModule = {
        name: values.name,
      } as CreateGenericModuleInput
      await genericModuleRepository.create(newGenericModule)
      navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath))
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GenericModuleForm
      title={t('genericModule.create.title')}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
