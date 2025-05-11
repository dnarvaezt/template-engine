import { getAppRouteUrl } from '@app/presentation/app.routes'
import { Route, Routes } from 'react-router-dom'
import { GenericModuleDetail } from './detail/generic-module.detail'
import { GenericModuleCreate } from './form/generic-module.create'
import { GenericModuleEdit } from './form/generic-module.edit'
import { GenericModuleHome } from './home/generic-module.home'

export enum GenericModuleRouteMap {
  BasePath = '/generic-module',
  Home = '/',
  New = '/new',
  Detail = '/:id',
  Edit = '/:id/edit',
}

export const GenericModuleRoutes = () => {
  return (
    <Routes>
      <Route
        path={GenericModuleRouteMap.Home}
        element={<GenericModuleHome />}
      />
      <Route
        path={GenericModuleRouteMap.New}
        element={<GenericModuleCreate />}
      />
      <Route
        path={GenericModuleRouteMap.Detail}
        element={<GenericModuleDetail />}
      />
      <Route
        path={GenericModuleRouteMap.Edit}
        element={<GenericModuleEdit />}
      />
    </Routes>
  )
}

export const getGenericModuleRouteUrl = (
  route: GenericModuleRouteMap,
  args?: Record<string, string | number | boolean>
): string => {
  const origin: string = GenericModuleRouteMap.BasePath
  const pathname: string = route === GenericModuleRouteMap.BasePath ? '' : route
  return getAppRouteUrl(`${origin}${pathname}`, args)
}
