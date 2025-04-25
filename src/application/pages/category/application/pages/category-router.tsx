import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoryCreate } from './category-create'
import { CategoryDetail } from './category-detail'
import { CategoryEdit } from './category-edit'
import { CategoryList } from './category-list'

export const CategoryBasePath = '/categories'

export const CategoryRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/new" element={<CategoryCreate />} />
      <Route path="/:id" element={<CategoryDetail />} />
      <Route path="/:id/edit" element={<CategoryEdit />} />
    </Routes>
  )
}
