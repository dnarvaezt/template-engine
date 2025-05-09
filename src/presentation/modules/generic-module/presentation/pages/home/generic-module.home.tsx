import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
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

  return (
    <GenericModuleHomeContext.Provider value={contextValue}>
      <div>
        <div style={{ marginBottom: 16 }}>
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
