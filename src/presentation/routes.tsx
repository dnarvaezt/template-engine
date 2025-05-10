import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GenericModuleModule, GenericModuleRouteMap } from './modules'

export enum AppRouteMap {
  BasePath = '/',
}

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={GenericModuleRouteMap.BasePath} replace />}
      />
      <Route
        path={`${GenericModuleRouteMap.BasePath}/*`}
        element={<GenericModuleModule />}
      />
    </Routes>
  )
}

export const getAppRouteUrl = (
  route: AppRouteMap,
  args?: Record<string, string | number | boolean>
): string => {
  const location: string = window.location.origin
  if (route === AppRouteMap.BasePath) return location

  let url = `${location}${route}`

  if (args)
    Object.entries(args).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })

  return url
}
