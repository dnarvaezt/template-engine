import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Space, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'
import { GenericModuleTable } from './components'
import { GenericModuleHomeContext } from './generic-module.home.context'
import { useGenericModuleHome } from './generic-module.home.hook'

export const GenericModuleHome = () => {
  const contextValue = useGenericModuleHome()
  const { t } = useI18nGenericModule()

  return (
    <GenericModuleHomeContext.Provider value={contextValue}>
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {t('genericModule.title')}
            </Typography.Title>
            <Link to={getGenericModuleRouteUrl(GenericModuleRouteMap.New)}>
              <Button type="primary" icon={<PlusOutlined />}>
                {t('genericModule.newItem')}
              </Button>
            </Link>
          </Space>

          <GenericModuleTable />
        </Space>
      </Card>
    </GenericModuleHomeContext.Provider>
  )
}
