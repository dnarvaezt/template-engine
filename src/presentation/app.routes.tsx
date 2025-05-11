import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GenericModuleModule, GenericModuleRouteMap } from './modules'
import { getBaseRouteUrl } from './utils'

export enum AppRouteMap {
  BasePath = '/',
  GenericModule = GenericModuleRouteMap.BasePath,
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={AppRouteMap.GenericModule} replace />}
      />
      <Route
        path={`${AppRouteMap.GenericModule}/*`}
        element={<GenericModuleModule />}
      />
    </Routes>
  )
}

export const getAppRouteUrl = (
  pathname: string,
  args?: Record<string, string | number | boolean>
): string => {
  return getBaseRouteUrl(window.location.origin, pathname, args)
}
