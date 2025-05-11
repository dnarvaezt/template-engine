import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Space, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useI18nGenericModule } from '../i18n'
import { GenericModuleRouteMap, getGenericModuleRouteUrl } from '../pages'

export const GenericModuleNotFound = () => {
  const { t } = useI18nGenericModule()
  const navigate = useNavigate()

  return (
    <Space direction="vertical" align="center" size="middle">
      <Typography.Text>{t('genericModule.detail.notFound')}</Typography.Text>
      <Button
        onClick={() =>
          navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath))
        }
        icon={<ArrowLeftOutlined />}
      >
        {t('genericModule.detail.backToHome')}
      </Button>
    </Space>
  )
}
