import { Button, message, Modal } from 'antd'
import { useState } from 'react'
import { CategoryModel, categoryService } from '../../infrastructure'

interface DeleteCategoryButtonProps {
  category: CategoryModel
  onSuccess?: () => void
}

export const DeleteCategoryButton = ({
  category,
  onSuccess,
}: DeleteCategoryButtonProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await categoryService.delete(category.id)
      message.success('Categoría eliminada exitosamente')
      setIsModalVisible(false)
      onSuccess?.()
    } catch (error) {
      message.error('Error al eliminar la categoría')
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
          ¿Estás seguro de que deseas eliminar la categoría "{category.name}"?
        </p>
      </Modal>
    </>
  )
}
