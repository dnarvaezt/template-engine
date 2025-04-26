import { Route, Routes } from 'react-router-dom'
import { CategoryDetail } from './detail/category.detail'
import { CategoryCreate } from './form/category.create'
import { CategoryEdit } from './form/category.edit'
import { CategoryList } from './home/category.list'

export const CategoryBasePath = '/categories'

export const CategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/new" element={<CategoryCreate />} />
      <Route path="/:id" element={<CategoryDetail />} />
      <Route path="/:id/edit" element={<CategoryEdit />} />
    </Routes>
  )
}
