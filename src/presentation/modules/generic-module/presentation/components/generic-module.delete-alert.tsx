import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal, Typography } from 'antd'
import { useState } from 'react'
import { GenericModule, genericModuleRepository } from '../../core'
import { useI18nGenericModule } from '../i18n'

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
  const { t } = useI18nGenericModule()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      await genericModuleRepository.delete(genericModule.id)
      setIsModalVisible(false)
      onSuccess?.()
    } catch (error) {
      console.error(error)
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
        {t('genericModule.delete.button')}
      </Button>
      <Modal
        title={t('genericModule.delete.confirmTitle')}
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText={t('genericModule.delete.confirmOk')}
        cancelText={t('genericModule.delete.confirmCancel')}
        confirmLoading={isLoading}
      >
        <Typography.Paragraph>
          {t('genericModule.delete.confirmMessage', {
            name: genericModule.name,
          })}
        </Typography.Paragraph>
      </Modal>
    </>
  )
}
