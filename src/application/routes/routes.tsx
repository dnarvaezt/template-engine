import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CategoryModule,
  CategoryRouteMap,
} from '../pages/category/application/pages'

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
    </Routes>
  )
}
