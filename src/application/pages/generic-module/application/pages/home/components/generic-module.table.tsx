import { Button, Space, Table } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GenericModuleModel } from 'src/application/pages/generic-module/infrastructure'
import { DeleteGenericModuleButton } from '../../../components'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../../generic-module.routes'
import { GenericModuleHomeContext } from '../generic-module.home.context'

export const GenericModuleTable = () => {
  const navigate = useNavigate()
  const { categories, loadCategories } = useContext(GenericModuleHomeContext)

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: GenericModuleModel) => renderActions(record),
    },
  ]

  const renderActions = (genericModule: GenericModuleModel) => {
    return (
      <Space>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getGenericModuleRouteUrl(GenericModuleRouteMap.Detail, {
                id: genericModule.id,
              })
            )
          }
        >
          Ver
        </Button>
        <Button
          type="link"
          onClick={() =>
            navigate(
              getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
                id: genericModule.id,
              })
            )
          }
        >
          Editar
        </Button>
        <DeleteGenericModuleButton
          genericModule={genericModule}
          onSuccess={loadCategories}
        />
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
