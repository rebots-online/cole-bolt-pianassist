import React, { useState } from 'react'
import { useStore } from '../store'

function AnnotationLayer({ pageNumber }) {
  const { currentTool, annotations, addAnnotation } = useStore()
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPath, setCurrentPath] = useState([])

  const handlePointerDown = (e) => {
    if (currentTool === 'highlight') {
      setIsDrawing(true)
      const point = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      }
      setCurrentPath([point])
    }
  }

  const handlePointerMove = (e) => {
    if (isDrawing && currentTool === 'highlight') {
      const point = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY
      }
      setCurrentPath([...currentPath, point])
    }
  }

  const handlePointerUp = () => {
    if (isDrawing && currentPath.length > 0) {
      addAnnotation({
        type: 'highlight',
        path: currentPath,
        pageNumber
      })
      setIsDrawing(false)
      setCurrentPath([])
    }
  }

  const handleClick = (e) => {
    if (currentTool === 'annotate') {
      const text = prompt('Enter annotation text:')
      if (text) {
        addAnnotation({
          type: 'text',
          text,
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          pageNumber
        })
      }
    }
  }

  return (
    <div
      className="absolute inset-0"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
    >
      {annotations
        .filter(a => a.pageNumber === pageNumber)
        .map((annotation, index) => {
          if (annotation.type === 'text') {
            return (
              <div
                key={index}
                className="absolute bg-yellow-100 p-1 rounded text-sm"
                style={{
                  left: annotation.x,
                  top: annotation.y
                }}
              >
                {annotation.text}
              </div>
            )
          }
          if (annotation.type === 'highlight') {
            return (
              <svg
                key={index}
                className="absolute inset-0 pointer-events-none"
              >
                <path
                  d={`M ${annotation.path.map(p => `${p.x},${p.y}`).join(' L ')}`}
                  stroke="rgba(255, 255, 0, 0.5)"
                  strokeWidth="20"
                  fill="none"
                />
              </svg>
            )
          }
        })}
      {isDrawing && (
        <svg className="absolute inset-0 pointer-events-none">
          <path
            d={`M ${currentPath.map(p => `${p.x},${p.y}`).join(' L ')}`}
            stroke="rgba(255, 255, 0, 0.5)"
            strokeWidth="20"
            fill="none"
          />
        </svg>
      )}
    </div>
  )
}

export default AnnotationLayer
