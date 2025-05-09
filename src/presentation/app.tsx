import { ConfigProvider, Select } from 'antd'
import 'antd/dist/reset.css'
import enUS from 'antd/locale/en_US'
import esES from 'antd/locale/es_ES'
import { useTranslation } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import './app.scss'
import { AppRoutes } from './routes'

export const App = () => {
  const { t, i18n } = useTranslation()

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <ConfigProvider locale={i18n.language === 'es' ? esES : enUS}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <h1>{t('itemManager.title')}</h1>
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
          </header>
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  )
}
