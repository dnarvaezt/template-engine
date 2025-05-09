import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DeleteGenericModuleButton } from '../../components/generic-module.delete-alert'
import { useGenericModuleDetail } from '../../hooks'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'

export const GenericModuleDetail = () => {
  const navigate = useNavigate()
  const { id, genericModule, loading } = useGenericModuleDetail()

  const handleEdit = () => {
    if (genericModule)
      navigate(
        getGenericModuleRouteUrl(GenericModuleRouteMap.Edit, {
          id: genericModule.id,
        })
      )
  }

  const handleDeleteSuccess = () => {
    navigate(GenericModuleRouteMap.BasePath)
  }

  if (loading && !genericModule) {
    return <div>Loading...</div>
  }

  if (!genericModule) {
    return <div>Item not found</div>
  }

  return (
    <div>
      <h1>Item Details {id}</h1>
      <div style={{ marginBottom: 16 }}>
        <p>
          <strong>Name:</strong> {genericModule.name}
        </p>
      </div>
      <Space>
        <Button type="primary" onClick={handleEdit} disabled={loading}>
          Edit
        </Button>
        <DeleteGenericModuleButton
          genericModule={genericModule}
          onSuccess={handleDeleteSuccess}
        />
        <Button
          onClick={() => navigate(GenericModuleRouteMap.BasePath)}
          disabled={loading}
        >
          Back
        </Button>
      </Space>
    </div>
  )
}
