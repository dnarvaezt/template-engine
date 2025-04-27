import { Route, Routes } from 'react-router-dom'
import { CategoryDetail } from './detail/category.detail'
import { CategoryCreate } from './form/category.create'
import { CategoryEdit } from './form/category.edit'
import { CategoryHome } from './home/category.home'

export enum CategoryRouteMap {
  BasePath = '/categories',
  Home = '/',
  New = '/new',
  Detail = '/:id',
  Edit = '/:id/edit',
}

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

export const getCategoryRouteUrl = (
  route: CategoryRouteMap,
  args?: Record<string, string | number | boolean>
): string => {
  if (route === CategoryRouteMap.BasePath) return route

  let url = `${CategoryRouteMap.BasePath}${route}`

  if (args)
    Object.entries(args).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value))
    })

  return url
}
