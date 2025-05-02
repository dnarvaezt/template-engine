import { Button, Modal } from 'antd'
import { useState } from 'react'
import { MessageHandlerService } from 'src/infrastructure'
import { GenericModuleModel, genericModuleService } from '../../infrastructure'

interface DeleteGenericModuleButtonProps {
  genericModule: GenericModuleModel
  onSuccess?: () => void
}

export const DeleteGenericModuleButton = ({
  genericModule,
  onSuccess,
}: DeleteGenericModuleButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await genericModuleService.delete(genericModule.id)
      MessageHandlerService.success('Categoría eliminada exitosamente')
      setIsModalVisible(false)
      onSuccess?.()
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error al eliminar la categoría',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <Button type="link" danger onClick={showModal}>
        Eliminar
      </Button>
      <Modal
        title="Confirmar eliminación"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Eliminar"
        cancelText="Cancelar"
        confirmLoading={isLoading}
      >
        <p>
          ¿Estás seguro de que deseas eliminar la categoría "
          {genericModule.name}"?
        </p>
      </Modal>
    </>
  )
}
