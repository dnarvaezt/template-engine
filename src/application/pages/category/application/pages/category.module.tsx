import { CategoryContext } from './category.context'
import { useCategoryContext } from './category.hook'
import { CategoryRoutes } from './category.routes'

export const CategoryModule = () => {
  const contextValue = useCategoryContext()

  return (
    <CategoryContext.Provider value={contextValue}>
      <CategoryRoutes />
    </CategoryContext.Provider>
  )
}
