import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Capacitor } from '@capacitor/core'

// Inicializar Capacitor para APIs nativas
if (Capacitor.isNativePlatform()) {
  console.log('Executando em plataforma nativa:', Capacitor.getPlatform())
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
