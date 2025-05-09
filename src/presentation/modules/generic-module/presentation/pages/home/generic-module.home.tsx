import { Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'
import { GenericModuleTable } from './components'
import { GenericModuleHomeContext } from './generic-module.home.context'
import { useGenericModuleHome } from './generic-module.home.hook'

export const GenericModuleHome = () => {
  const navigate = useNavigate()
  const contextValue = useGenericModuleHome()
  const { t } = useI18nGenericModule()

  return (
    <GenericModuleHomeContext.Provider value={contextValue}>
      <div>
        <div
          style={{
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography.Title level={2}>
            {t('genericModule.title')}
          </Typography.Title>
          <Button
            type="primary"
            onClick={() =>
              navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.New))
            }
          >
            New Item
          </Button>
        </div>

        <GenericModuleTable />
      </div>
    </GenericModuleHomeContext.Provider>
  )
}
