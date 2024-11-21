import React from 'react'
import PDFViewer from './components/PDFViewer'
import Toolbar from './components/Toolbar'
import { useStore } from './store'

function App() {
  const { currentTool } = useStore()

  return (
    <div className="h-screen flex flex-col">
      <Toolbar />
      <main className="flex-1 relative">
        <PDFViewer />
      </main>
    </div>
  )
}

export default App
