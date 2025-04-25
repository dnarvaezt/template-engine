import { Button, message, Modal } from 'antd'
import React, { useState } from 'react'
import {
  Category,
  CategoryRepositoryImpl,
  CategoryServiceImpl,
} from '../../infrastructure'

const repository = new CategoryRepositoryImpl()
const categoryService = new CategoryServiceImpl(repository)

interface DeleteCategoryButtonProps {
  category: Category
  onSuccess?: () => void
}

export const DeleteCategoryButton: React.FC<DeleteCategoryButtonProps> = ({
  category,
  onSuccess,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await categoryService.deleteCategory(category.id)
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
