import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CategoryBasePath,
  CategoryRoutes,
} from '../pages/category/application/pages/CategoryRouter'

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={CategoryBasePath} replace />} />
      <Route path={`${CategoryBasePath}/*`} element={<CategoryRoutes />} />
    </Routes>
  );
};
