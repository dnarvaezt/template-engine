import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Divider, Space, Typography } from 'antd'
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
      <div>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Title level={2}>Item Details</Typography.Title>
          <Space>
            <Button
              type="primary"
              onClick={handleEdit}
              disabled={loading}
              icon={<EditOutlined />}
            >
              Edit
            </Button>
            <DeleteGenericModuleButton
              genericModule={genericModule}
              onSuccess={handleDeleteSuccess}
            />
            <Button
              onClick={() => navigate(GenericModuleRouteMap.BasePath)}
              disabled={loading}
              icon={<ArrowLeftOutlined />}
            >
              Back
            </Button>
          </Space>
        </Space>
      </div>
      <Divider />
      <div style={{ width: '100%' }}>
        <p>
          <strong>Name:</strong> {genericModule.name}
        </p>
      </div>
    </div>
  )
}
