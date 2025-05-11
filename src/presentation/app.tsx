import { ConfigProvider, Layout, Select, Space, Typography } from 'antd'
import enUS from 'antd/locale/en_US'
import esES from 'antd/locale/es_ES'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './app.routes'
import './app.scss'
import { antdTheme } from './theme/antd.config'

const { Header, Content } = Layout

export const App = () => {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <ConfigProvider
      locale={i18n.language === 'es' ? esES : enUS}
      theme={antdTheme}
    >
      <BrowserRouter>
        <Layout className="app">
          <Header className="app__header">
            <div className="app__header-content">
              <Space align="center">
                <Typography.Title
                  level={3}
                  style={{ margin: 0, color: 'white' }}
                >
                  {t('itemManager.title')}
                </Typography.Title>
              </Space>
              <Select
                defaultValue={i18n.language}
                style={{ width: 120 }}
                onChange={handleLanguageChange}
                options={[
                  { value: 'en', label: t('english') },
                  { value: 'es', label: t('spanish') },
                ]}
              />
            </div>
          </Header>
          <Content className="app__content">
            <AppRoutes />
          </Content>
        </Layout>
      </BrowserRouter>
    </ConfigProvider>
  )
}
