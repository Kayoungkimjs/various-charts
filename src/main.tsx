import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './globalStyle.ts'
import { App } from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/various-charts/">
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
