import { Input } from 'antd'
import { ChangeEvent } from 'react'
import { useI18nGenericModule } from '../../../i18n'

interface GenericModuleFilterProps {
  onSearch: (search: any) => Promise<void>
}

export const GenericModuleFilter = ({ onSearch }: GenericModuleFilterProps) => {
  const { t } = useI18nGenericModule()

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    await onSearch({ name: e.target.value })
  }

  return (
    <div>
      <Input.Search
        placeholder={t('genericModule.table.name')}
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
    </div>
  )
}
