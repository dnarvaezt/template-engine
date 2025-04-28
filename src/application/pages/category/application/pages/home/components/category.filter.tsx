import { Input } from 'antd'
import { ChangeEvent } from 'react'

interface CategoryFilterProps {
  onSearch: (search: any) => Promise<void>
}

export const CategoryFilter = ({ onSearch }: CategoryFilterProps) => {
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
