import { Button, Space, Table } from 'antd'
import { CategoryModel } from '../../../infrastructure'
import { DeleteCategoryButton } from '../../components'

interface CategoryTableProps {
  categories: CategoryModel[]
  onView: (category: CategoryModel) => void
  onEdit: (category: CategoryModel) => void
  onDelete: (category: CategoryModel) => void
  onSuccess?: () => void
}

export const CategoryTable = ({
  categories,
  onView,
  onEdit,
  onDelete,
  onSuccess,
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
      render: (_: any, record: CategoryModel) => (
        <Space>
          <Button type="link" onClick={() => onView(record)}>
            Ver
          </Button>
          <Button type="link" onClick={() => onEdit(record)}>
            Editar
          </Button>
          <DeleteCategoryButton category={record} onSuccess={onSuccess} />
        </Space>
      ),
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
