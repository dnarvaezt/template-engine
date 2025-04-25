import { Button, Card, Form, Input, Space, Typography } from 'antd'
import React, { useEffect } from 'react'

interface CategoryFormValues {
  name: string
}

interface CategoryFormProps {
  onCancel: () => void
  onFinish: (values: CategoryFormValues) => void
  initialValues?: CategoryFormValues
  title: string
  loading?: boolean
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onCancel,
  onFinish,
  initialValues,
  title,
  loading = false,
}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues, form])

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
              Cancelar
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              Guardar
            </Button>
          </Space>
        </Space>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          disabled={loading}
        >
          <Form.Item
            name="name"
            label="Nombre"
            rules={[
              { required: true, message: 'Por favor ingrese el nombre' },
              { min: 3, message: 'El nombre debe tener al menos 3 caracteres' },
              {
                max: 50,
                message: 'El nombre no puede exceder los 50 caracteres',
              },
              {
                pattern: /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]+$/,
                message:
                  'El nombre solo puede contener letras, números y espacios',
              },
            ]}
          >
            <Input
              placeholder="Ingrese el nombre de la categoría"
              maxLength={50}
              showCount
            />
          </Form.Item>
        </Form>
      </Space>
    </Card>
  )
}
