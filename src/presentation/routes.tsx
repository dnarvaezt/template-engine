import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GenericModuleModule, GenericModuleRouteMap } from './modules'

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
