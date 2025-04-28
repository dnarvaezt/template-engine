import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { CategoryRouteMap, getCategoryRouteUrl } from '../category.routes'
import { CategoryHomeContext } from './category.home.context'
import { useCategoryHome } from './category.home.hook'
import { CategoryTable } from './components'

export const CategoryHome = () => {
  const navigate = useNavigate()
  const contextValue = useCategoryHome()

  return (
    <CategoryHomeContext.Provider value={contextValue}>
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => navigate(getCategoryRouteUrl(CategoryRouteMap.New))}
          >
            Nueva Categoría
          </Button>
        </div>

        <CategoryTable />
      </div>
    </CategoryHomeContext.Provider>
  )
}
