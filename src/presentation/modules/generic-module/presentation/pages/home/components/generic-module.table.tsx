import { Button, Space, Table } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GenericModule } from 'src/presentation/modules/generic-module/application'
import { DeleteGenericModuleButton } from '../../../components'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../../generic-module.routes'
import { GenericModuleHomeContext } from '../generic-module.home.context'

export const GenericModuleTable = () => {
  const navigate = useNavigate()
  const { items, loadItems } = useContext(GenericModuleHomeContext)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: GenericModule) => renderActions(record),
    },
  ]

  const renderActions = (genericModule: GenericModule) => {
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
          View
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
          Edit
        </Button>
        <DeleteGenericModuleButton
          genericModule={genericModule}
          onSuccess={loadItems}
        />
      </Space>
    )
  }

  return (
    <Table
      dataSource={items}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 10 }}
    />
  )
}
