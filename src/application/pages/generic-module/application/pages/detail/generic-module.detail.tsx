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
    return <div>Cargando...</div>
  }

  if (!genericModule) {
    return <div>No se encontró la categoría</div>
  }

  return (
    <div>
      <h1>Detalles de la Categoría {id}</h1>
      <div style={{ marginBottom: 16 }}>
        <p>
          <strong>Nombre:</strong> {genericModule.name}
        </p>
      </div>
      <Space>
        <Button type="primary" onClick={handleEdit} disabled={loading}>
          Editar
        </Button>
        <DeleteGenericModuleButton
          genericModule={genericModule}
          onSuccess={handleDeleteSuccess}
        />
        <Button
          onClick={() => navigate(GenericModuleRouteMap.BasePath)}
          disabled={loading}
        >
          Volver
        </Button>
      </Space>
    </div>
  )
}
