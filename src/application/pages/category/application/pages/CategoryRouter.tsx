import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CategoryCreate } from './CategoryCreate'
import { CategoryDetail } from './CategoryDetail'
import { CategoryEdit } from './CategoryEdit'
import { CategoryList } from './CategoryList'

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
