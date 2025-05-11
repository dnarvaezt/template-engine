import { EditOutlined } from '@ant-design/icons'
import { GenericModule } from '@app/presentation/modules/generic-module/application'
import { Button, Space, Table, Tooltip } from 'antd'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useI18nGenericModule } from '../../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../../generic-module.routes'
import { GenericModuleHomeContext } from '../generic-module.home.context'

export const GenericModuleTable = () => {
  const { items } = useContext(GenericModuleHomeContext)
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
      width: 200,
      render: (_: any, record: GenericModule) => renderActions(record),
    },
  ]

  const renderActions = (genericModule: GenericModule) => {
    return (
      <Space size="middle">
        <Tooltip title={t('genericModule.actions.edit')}>
          <Link
            to={getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
              id: genericModule.id,
            })}
          >
            <Button type="text" icon={<EditOutlined />} />
          </Link>
        </Tooltip>
      </Space>
    )
  }

  return (
    <Table
      dataSource={items}
      columns={columns}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showTotal: (total) => t('genericModule.table.total', { total }),
      }}
      loading={!items}
    />
  )
}
