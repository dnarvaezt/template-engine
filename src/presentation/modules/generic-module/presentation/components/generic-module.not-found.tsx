import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useI18nGenericModule } from '../i18n'
import { GenericModuleRouteMap } from '../pages'

export const GenericModuleNotFound = () => {
  const { t } = useI18nGenericModule()
  const navigate = useNavigate()

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div>{t('genericModule.detail.notFound')}</div>
      <Button
        onClick={() => navigate(GenericModuleRouteMap.BasePath)}
        icon={<ArrowLeftOutlined />}
      >
        {t('genericModule.detail.backToHome')}
      </Button>
    </div>
  )
}
