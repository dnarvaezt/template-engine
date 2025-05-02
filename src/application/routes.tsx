import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { GenericModuleModule, GenericModuleRouteMap } from './pages'
import { CategoryModule, CategoryRouteMap } from './pages/category'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={CategoryRouteMap.BasePath} replace />}
      />
      <Route
        path={`${CategoryRouteMap.BasePath}/*`}
        element={<CategoryModule />}
      />
      <Route
        path={`${GenericModuleRouteMap.BasePath}/*`}
        element={<GenericModuleModule />}
      />
    </Routes>
  )
}
