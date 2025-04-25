import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import esES from 'antd/locale/es_ES'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes/routes'

export const App = () => {
  return (
    <ConfigProvider locale={esES}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1>Gestor de Items</h1>
          </header>
          <main>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  )
}
