import { Button, Card, Form, Input, Space, Typography } from 'antd'
import { useEffect } from 'react'
import { CategoryModel } from '../../../infrastructure'

interface CategoryFormProps {
  onCancel: () => void
  onFinish: (values: CategoryModel) => void
  category?: CategoryModel
  title: string
  loading?: boolean
}

export const CategoryForm = ({
  onCancel,
  onFinish,
  category,
  title,
  loading = false,
}: CategoryFormProps) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category)
    }
  }, [category, form])

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
          initialValues={category}
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
