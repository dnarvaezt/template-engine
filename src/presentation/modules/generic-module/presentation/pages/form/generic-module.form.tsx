import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GenericModule } from '../../../core'
import { useI18nGenericModule } from '../../i18n'
import {
  GenericModuleRouteMap,
  getGenericModuleRouteUrl,
} from '../generic-module.routes'

interface GenericModuleFormProps {
  onFinish: (values: GenericModule) => void
  genericModule?: GenericModule
  title: string
  loading?: boolean
}

export const GenericModuleForm = ({
  onFinish,
  genericModule,
  title,
  loading = false,
}: GenericModuleFormProps) => {
  const [form] = Form.useForm()
  const { t } = useI18nGenericModule()

  useEffect(() => {
    if (genericModule) {
      form.setFieldsValue(genericModule)
    }
  }, [genericModule, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      onFinish(values)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
        <Typography.Title level={2}>{title}</Typography.Title>
      </Space>
      <Form
        form={form}
        layout="vertical"
        initialValues={genericModule}
        disabled={loading}
      >
        <Form.Item
          name="name"
          label={t('genericModule.form.name.label')}
          rules={[
            {
              required: true,
              message: t('genericModule.form.name.required'),
            },
            { min: 3, message: t('genericModule.form.name.min') },
            { max: 50, message: t('genericModule.form.name.max') },
            {
              pattern: /^[a-zA-Z0-9\s]+$/,
              message: t('genericModule.form.name.pattern'),
            },
          ]}
        >
          <Input
            placeholder={t('genericModule.form.name.placeholder')}
            maxLength={50}
            showCount
          />
        </Form.Item>
      </Form>
      <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
        <Link to={getGenericModuleRouteUrl(GenericModuleRouteMap.BasePath)}>
          <Button disabled={loading} icon={<CloseOutlined />}>
            {t('genericModule.form.cancel')}
          </Button>
        </Link>
        <Button
          type="primary"
          onClick={handleSubmit}
          loading={loading}
          icon={<SaveOutlined />}
        >
          {t('genericModule.form.save')}
        </Button>
      </Space>
    </Space>
  )
}
