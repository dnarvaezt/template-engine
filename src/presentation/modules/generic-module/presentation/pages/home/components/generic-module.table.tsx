import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Space, Table } from 'antd'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18nGenericModule } from '../../../i18n'

import { GenericModule } from '@app/presentation/modules/generic-module/application'
import { DeleteGenericModuleButton } from '../../../components'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../../generic-module.routes'
import { GenericModuleHomeContext } from '../generic-module.home.context'

export const GenericModuleTable = () => {
  const navigate = useNavigate()
  const { items, loadItems } = useContext(GenericModuleHomeContext)
  const { t } = useI18nGenericModule()

  const goToDetail = (id: string) => {
    navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.Detail, { id }))
  }

  const goToEdit = (id: string) => {
    navigate(getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, { id }))
  }

  const columns = [
    {
      title: t('genericModule.table.name'),
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      render: (text: string, record: GenericModule) => (
        <Button type="link" onClick={() => goToDetail(record.id)}>
          {text}
        </Button>
      ),
    },
    {
      title: t('genericModule.table.actions'),
      key: 'actions',
      render: (_: any, record: GenericModule) => renderActions(record),
    },
  ]

  const renderActions = (genericModule: GenericModule) => {
    return (
      <Space>
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => goToDetail(genericModule.id)}
        >
          {t('genericModule.actions.view')}
        </Button>
        <Button
          type="link"
          icon={<EditOutlined />}
          onClick={() => goToEdit(genericModule.id)}
        >
          {t('genericModule.actions.edit')}
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
