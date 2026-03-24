import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

try {
  console.log("Rendering MiBazar...")
  const root = document.getElementById('root')
  if (!root) throw new Error("Root element not found")
  
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error("CRITICAL ERROR:", error)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
      <h1>Error al cargar la tienda</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>`
  }
}
