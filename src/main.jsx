import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { pdfjs } from 'react-pdf'

// Using a specific version of the worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
