import 'antd/dist/reset.css'
import './App.css'
import { ConfigProvider } from 'antd'
import esES from 'antd/locale/es_ES'
import { BrowserRouter } from 'react-router-dom'
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
  );
}
