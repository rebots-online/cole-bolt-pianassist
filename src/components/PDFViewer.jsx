import React, { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { useGesture } from 'react-use-gesture'
import { useStore } from '../store'
import AnnotationLayer from './AnnotationLayer'

function PDFViewer() {
  const [numPages, setNumPages] = useState(null)
  const { 
    pdfFile, 
    currentPage, 
    viewMode, 
    scale,
    setCurrentPage
  } = useStore()

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setCurrentPage(1)
  }

  const bind = useGesture({
    onDrag: ({ direction: [dx] }) => {
      if (dx > 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1)
      } else if (dx < 0 && currentPage < numPages) {
        setCurrentPage(currentPage + 1)
      }
    }
  })

  const renderPages = () => {
    if (viewMode === 'single') {
      return (
        <div className="relative">
          <Page 
            pageNumber={currentPage} 
            scale={scale || 1}
            renderTextLayer={false}
          />
          <AnnotationLayer pageNumber={currentPage} />
        </div>
      )
    }

    return (
      <div className="flex gap-4">
        <div className="relative">
          <Page 
            pageNumber={currentPage} 
            scale={scale || 1}
            renderTextLayer={false}
          />
          <AnnotationLayer pageNumber={currentPage} />
        </div>
        {currentPage < numPages && (
          <div className="relative">
            <Page 
              pageNumber={currentPage + 1} 
              scale={scale || 1}
              renderTextLayer={false}
            />
            <AnnotationLayer pageNumber={currentPage + 1} />
          </div>
        )}
      </div>
    )
  }

  if (!pdfFile) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Upload a PDF to get started
      </div>
    )
  }

  return (
    <div 
      className="h-full overflow-auto flex items-center justify-center bg-gray-100 p-4"
      {...bind()}
    >
      <Document
        file={pdfFile}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div>Loading PDF...</div>}
        error={<div>Error loading PDF! Make sure you selected a valid PDF file.</div>}
      >
        {renderPages()}
      </Document>
    </div>
  )
}

export default PDFViewer
