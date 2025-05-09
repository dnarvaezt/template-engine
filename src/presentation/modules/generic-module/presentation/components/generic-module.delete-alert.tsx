import { DeleteOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import { useState } from 'react'
import { MessageHandlerService } from 'src/application'
import { GenericModule, genericModuleRepository } from '../../application'
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
      MessageHandlerService.success(t('genericModule.delete.success'))
      setIsModalVisible(false)
      onSuccess?.()
    } catch (error) {
      MessageHandlerService.error({
        error,
        defaultMessage: t('genericModule.delete.error'),
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
        <p>
          {t('genericModule.delete.confirmMessage', {
            name: genericModule.name,
          })}
        </p>
      </Modal>
    </>
  )
}
