import { Table } from 'antd'
import { ReactNode } from 'react'
import { CategoryModel } from '../../../infrastructure'

interface CategoryTableProps {
  categories: CategoryModel[]
  renderActions: (category: CategoryModel) => ReactNode
}

export const CategoryTable = ({
  categories,
  renderActions,
}: CategoryTableProps) => {
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

  return (
    <Table
      dataSource={categories}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  )
}
