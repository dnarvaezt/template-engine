import { useNavigate } from 'react-router-dom'
import { GenericModule, genericModuleRepository } from '../../../application'
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

  const handleCancel = () => {
    navigate(-1)
  }

  const handleFinish = async (values: GenericModule) => {
    if (!id) return

    try {
      setLoading(true)
      const genericModule = await genericModuleRepository.getById(id)
      if (genericModule) {
        genericModule.name = values.name
        const updatedGenericModule = genericModule
        await genericModuleRepository.update(updatedGenericModule)
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
      onCancel={handleCancel}
      onFinish={handleFinish}
      loading={loading}
    />
  )
}
