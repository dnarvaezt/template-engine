import { Input } from 'antd'
import { ChangeEvent } from 'react'

interface GenericModuleFilterProps {
  onSearch: (search: any) => Promise<void>
}

export const GenericModuleFilter = ({ onSearch }: GenericModuleFilterProps) => {
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    await onSearch({ name: e.target.value })
  }

  return (
    <div>
      <Input.Search
        placeholder="Search by name"
        onChange={handleSearch}
        style={{ marginBottom: 16 }}
      />
    </div>
  )
}
