import { Button, Space, Table } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CategoryModel } from 'src/application/pages/category/infrastructure'
import { DeleteCategoryButton } from '../../../components'
import { CategoryRouteMap, getCategoryRouteUrl } from '../../category.routes'
import { CategoryHomeContext } from '../category.home.context'

export const CategoryTable = () => {
  const navigate = useNavigate()
  const { categories, loadCategories } = useContext(CategoryHomeContext)

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: CategoryModel) => renderActions(record),
    },
  ]

  const renderActions = (category: CategoryModel) => {
    return (
      <Space>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getCategoryRouteUrl(CategoryRouteMap.Detail, { id: category.id })
            )
          }
        >
          Ver
        </Button>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getCategoryRouteUrl(CategoryRouteMap.Edit, { id: category.id })
            )
          }
        >
          Editar
        </Button>
        <DeleteCategoryButton category={category} onSuccess={loadCategories} />
      </Space>
    )
  }

  return (
    <Table
      dataSource={categories}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  )
}
