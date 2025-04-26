import { useMemo } from 'react'
import { CategoryContext, CategoryContextType } from './category.context'
import { CategoryRoutes } from './category.routes'

export const CategoryModule = () => {
  const value = useMemo((): CategoryContextType => ({}), [])

  return (
    <CategoryContext.Provider value={value}>
      <CategoryRoutes />
    </CategoryContext.Provider>
  )
}
