import { useNavigate } from 'react-router-dom'
import { GenericModule, genericModuleRepository } from '../../../core'
import { GenericModuleNotFound } from '../../components/generic-module.not-found'
import { useGenericModuleDetail } from '../../hooks'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'
import { GenericModuleForm } from './generic-module.form'

export const GenericModuleEdit = () => {
  const { id, genericModule, loading, setLoading } = useGenericModuleDetail()
  const { t } = useI18nGenericModule()
  const navigate = useNavigate()

  const handleFinish = async (values: GenericModule) => {
    if (!id) return

    try {
      setLoading(true)
      const genericModule = await genericModuleRepository.get(id)
      if (genericModule) {
        if (!values.name?.trim()) return

        genericModule.name = values.name
        await genericModuleRepository.update(genericModule)

        navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath))
      } else {
        navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (!genericModule) return <GenericModuleNotFound />

  return (
    <GenericModuleForm
      title={t('genericModule.edit.title')}
      genericModule={genericModule}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
