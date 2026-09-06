import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// One-time cleanup: older Mermaid renders (before it was scoped to a
// detached container) could append error/diagram nodes directly onto
// document.body, outside React's root, where they'd persist across route
// changes indefinitely. Sweep any stray body-level SVG/DIV siblings of the
// root that don't belong to this app shell.
const rootEl = document.getElementById('root')
Array.from(document.body.children).forEach((node) => {
  if (node !== rootEl && (node.tagName === 'SVG' || node.tagName === 'DIV')) {
    node.remove()
  }
})

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
