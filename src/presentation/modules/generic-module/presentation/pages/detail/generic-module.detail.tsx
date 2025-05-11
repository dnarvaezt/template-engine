import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Divider, Space, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteGenericModuleButton } from '../../components/generic-module.delete-alert'
import { GenericModuleNotFound } from '../../components/generic-module.not-found'
import { useGenericModuleDetail } from '../../hooks'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'

export const GenericModuleDetail = () => {
  const navigate = useNavigate()
  const { genericModule, loading } = useGenericModuleDetail()
  const { t } = useI18nGenericModule()

  const handleDeleteSuccess = () => {
    navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath))
  }

  if (loading && !genericModule) {
    return <div>{t('genericModule.detail.loading')}</div>
  }

  if (!genericModule) return <GenericModuleNotFound />

  return (
    <div>
      <div>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Title level={2}>
            {t('genericModule.detail.title')}
          </Typography.Title>
          <Space>
            <Link
              to={getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
                id: genericModule.id,
              })}
            >
              <Button type="primary" disabled={loading} icon={<EditOutlined />}>
                {t('genericModule.detail.edit')}
              </Button>
            </Link>
            <DeleteGenericModuleButton
              genericModule={genericModule}
              onSuccess={handleDeleteSuccess}
            />
            <Link to={GenericModuleRouteMap.BasePath}>
              <Button disabled={loading} icon={<ArrowLeftOutlined />}>
                {t('genericModule.detail.back')}
              </Button>
            </Link>
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
