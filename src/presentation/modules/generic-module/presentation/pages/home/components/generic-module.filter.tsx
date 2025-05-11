import { SearchOutlined } from '@ant-design/icons'
import { Card, Input, Space } from 'antd'
import { useI18nGenericModule } from '../../../i18n'

interface GenericModuleFilterProps {
  onSearch: (search: any) => Promise<void>
}

export const GenericModuleFilter = ({ onSearch }: GenericModuleFilterProps) => {
  const { t } = useI18nGenericModule()

  const handleSearch = async (value: string) => {
    await onSearch({ name: value })
  }

  return (
    <Card size="small" style={{ marginBottom: 16 }}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input.Search
          placeholder={t('genericModule.table.name')}
          onSearch={handleSearch}
          enterButton={<SearchOutlined />}
          allowClear
        />
      </Space>
    </Card>
  )
}
