import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useState } from 'react'

import { MessageHandlerService } from 'src/application'
import { GenericModule, genericModuleRepository } from '../../application'

interface DeleteGenericModuleButtonProps {
  genericModule: GenericModule
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
      await genericModuleRepository.delete(genericModule.id)
      MessageHandlerService.success('Item deleted successfully')
      setIsModalVisible(false)
      onSuccess?.()
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: 'Error deleting item',
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
      <Button type="link" danger onClick={showModal} icon={<DeleteOutlined />}>
        Delete
      </Button>
      <Modal
        title="Confirm deletion"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
        confirmLoading={isLoading}
      >
        <p>Are you sure you want to delete the item "{genericModule.name}"?</p>
      </Modal>
    </>
  )
}
