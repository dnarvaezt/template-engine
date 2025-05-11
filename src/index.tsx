import 'antd/dist/reset.css' // Import Ant Design styles
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { App } from './presentation/app'
import './presentation/i18n' // Import i18n configuration

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
