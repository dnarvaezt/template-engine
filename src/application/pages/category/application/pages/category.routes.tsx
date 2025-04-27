import { Route, Routes } from 'react-router-dom'
import { CategoryDetail } from './detail/category.detail'
import { CategoryCreate } from './form/category.create'
import { CategoryEdit } from './form/category.edit'
import { CategoryHome } from './home/category.home'

export const CategoryRouteMap = {
  BasePath: '/categories',
  Home: '/',
  New: '/new',
  Detail: '/:id',
  Edit: '/:id/edit',
} as const

export const CategoryRoutes = () => {
  return (
    <Routes>
      <Route path={CategoryRouteMap.Home} element={<CategoryHome />} />
      <Route path={CategoryRouteMap.New} element={<CategoryCreate />} />
      <Route path={CategoryRouteMap.Detail} element={<CategoryDetail />} />
      <Route path={CategoryRouteMap.Edit} element={<CategoryEdit />} />
    </Routes>
  )
}
