import { Button, Typography } from 'antd'
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
          <Link to={getGenericModuleRouteUrl(GenericModuleRouteMap.New)}>
            <Button type="link">{t('genericModule.newItem')}</Button>
          </Link>
        </div>

        <GenericModuleTable />
      </div>
    </GenericModuleHomeContext.Provider>
  )
}
