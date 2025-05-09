import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Divider, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteGenericModuleButton } from '../../components/generic-module.delete-alert'
import { useGenericModuleDetail } from '../../hooks'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'

export const GenericModuleDetail = () => {
  const navigate = useNavigate()
  const { id, genericModule, loading } = useGenericModuleDetail()
  const { t } = useI18nGenericModule()

  const handleEdit = () => {
    if (genericModule)
      navigate(
        getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
          id: genericModule.id,
        })
      )
  }

  const handleDeleteSuccess = () => {
    navigate(GenericModuleRouteMap.BasePath)
  }

  if (loading && !genericModule) {
    return <div>{t('genericModule.detail.loading')}</div>
  }

  if (!genericModule) {
    return <div>{t('genericModule.detail.notFound')}</div>
  }

  return (
    <div>
      <div>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Title level={2}>
            {t('genericModule.detail.title')}
          </Typography.Title>
          <Space>
            <Button
              type="primary"
              onClick={handleEdit}
              disabled={loading}
              icon={<EditOutlined />}
            >
              {t('genericModule.detail.edit')}
            </Button>
            <DeleteGenericModuleButton
              genericModule={genericModule}
              onSuccess={handleDeleteSuccess}
            />
            <Button
              onClick={() => navigate(GenericModuleRouteMap.BasePath)}
              disabled={loading}
              icon={<ArrowLeftOutlined />}
            >
              {t('genericModule.detail.back')}
            </Button>
          </Space>
        </Space>
      </div>
      <Divider />
      <div style={{ width: '100%' }}>
        <p>
          <strong>{t('genericModule.detail.name')}:</strong>{' '}
          {genericModule.name}
        </p>
      </div>
    </div>
  )
}
