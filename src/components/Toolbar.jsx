import React from 'react'
import { useStore } from '../store'

function Toolbar() {
  const { 
    currentTool, 
    setCurrentTool, 
    viewMode, 
    setViewMode,
    setPdfFile 
  } = useStore()

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPdfFile(file)
    }
  }

  return (
    <div className="bg-white border-b p-4 flex items-center space-x-4">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="pdf-upload"
      />
      <label 
        htmlFor="pdf-upload"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
      >
        Upload PDF
      </label>

      <select 
        value={viewMode}
        onChange={(e) => setViewMode(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="single">Single Page</option>
        <option value="double">Two Pages</option>
      </select>

      <div className="border-l pl-4 flex items-center space-x-2">
        <button
          onClick={() => setCurrentTool('pan')}
          className={`p-2 rounded ${currentTool === 'pan' ? 'bg-gray-200' : ''}`}
        >
          Pan
        </button>
        <button
          onClick={() => setCurrentTool('annotate')}
          className={`p-2 rounded ${currentTool === 'annotate' ? 'bg-gray-200' : ''}`}
        >
          Annotate
        </button>
        <button
          onClick={() => setCurrentTool('highlight')}
          className={`p-2 rounded ${currentTool === 'highlight' ? 'bg-gray-200' : ''}`}
        >
          Highlight
        </button>
      </div>
    </div>
  )
}

export default Toolbar
