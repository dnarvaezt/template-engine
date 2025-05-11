import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useI18nGenericModule } from '../i18n'
import { GenericModuleRouteMap, getGenericModuleRouteUrl } from '../pages'

export const GenericModuleNotFound = () => {
  const { t } = useI18nGenericModule()

  return (
    <Space direction="vertical" align="center" size="middle">
      <Typography.Text>{t('genericModule.detail.notFound')}</Typography.Text>
      <Link to={getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath)}>
        <Button icon={<ArrowLeftOutlined />}>
          {t('genericModule.detail.backToHome')}
        </Button>
      </Link>
    </Space>
  )
}
