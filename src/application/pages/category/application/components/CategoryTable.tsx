import { Button, Space, Table } from 'antd'
import React from 'react'
import { Category } from '../../infrastructure'
import { DeleteCategoryButton } from './DeleteCategoryButton'

interface CategoryTableProps {
  categories: Category[];
  onView: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onSuccess?: () => void;
}

export const CategoryTable: React.FC<CategoryTableProps> = ({ categories, onView, onEdit, onDelete, onSuccess }) => {
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Category) => (
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
  ];

  return (
    <Table
      dataSource={categories}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  );
};
