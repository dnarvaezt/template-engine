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
    return (
      <Typography.Text>{t('genericModule.detail.loading')}</Typography.Text>
    )
  }

  if (!genericModule) return <GenericModuleNotFound />

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
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
      <Divider />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Typography.Text strong>
          {t('genericModule.detail.name')}:
        </Typography.Text>
        <Typography.Text>{genericModule.name}</Typography.Text>
      </Space>
    </Space>
  )
}
