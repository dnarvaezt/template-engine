import { EditOutlined, EyeOutlined } from '@ant-design/icons'
import { GenericModule } from '@app/presentation/modules/generic-module/application'
import { Button, Space, Table } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DeleteGenericModuleButton } from '../../../components'
import { useI18nGenericModule } from '../../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../../generic-module.routes'
import { GenericModuleHomeContext } from '../generic-module.home.context'

export const GenericModuleTable = () => {
  const { items, loadItems } = useContext(GenericModuleHomeContext)
  const { t } = useI18nGenericModule()

  const columns = [
    {
      title: t('genericModule.table.name'),
      dataIndex: 'name',
      key: 'name',
      width: '100%',
      render: (text: string, record: GenericModule) => (
        <Link
          to={getGenericModuleRouteUrl(GenericModuleRouteMap.Detail, {
            id: record.id,
          })}
        >
          {text}
        </Link>
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
        <Link
          to={getGenericModuleRouteUrl(GenericModuleRouteMap.Detail, {
            id: genericModule.id,
          })}
        >
          <Button type="link">
            <EyeOutlined /> {t('genericModule.actions.view')}
          </Button>
        </Link>
        <Link
          to={getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
            id: genericModule.id,
          })}
        >
          <Button type="link">
            <EditOutlined /> {t('genericModule.actions.edit')}
          </Button>
        </Link>
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
