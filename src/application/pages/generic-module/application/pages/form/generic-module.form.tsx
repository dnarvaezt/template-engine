import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { GenericModuleModel } from '../../../infrastructure'

interface GenericModuleFormProps {
  onCancel: () => void
  onFinish: (values: GenericModuleModel) => void
  genericModule?: GenericModuleModel
  title: string
  loading?: boolean
}

export const GenericModuleForm = ({
  onCancel,
  onFinish,
  genericModule,
  title,
  loading = false,
}: GenericModuleFormProps) => {
  const [form] = Form.useForm()

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
    <Card>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Title level={2}>{title}</Typography.Title>
          <Space>
            <Button onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Save
            </Button>
          </Space>
        </Space>
        <Form
          form={form}
          layout="vertical"
          initialValues={genericModule}
          disabled={loading}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please enter the name' },
              { min: 3, message: 'Name must be at least 3 characters' },
              {
                max: 50,
                message: 'Name cannot exceed 50 characters',
              },
              {
                pattern: /^[a-zA-Z0-9\s]+$/,
                message: 'Name can only contain letters, numbers and spaces',
              },
            ]}
          >
            <Input placeholder="Enter item name" maxLength={50} showCount />
          </Form.Item>
        </Form>
      </Space>
    </Card>
  )
}
