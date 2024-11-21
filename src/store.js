import create from 'zustand'

export const useStore = create((set) => ({
  currentPage: 1,
  numPages: null,
  scale: 1,
  viewMode: 'single',
  currentTool: 'pan',
  annotations: [],
  pdfFile: null,
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setNumPages: (num) => set({ numPages: num }),
  setScale: (scale) => set({ scale: scale }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setCurrentTool: (tool) => set({ currentTool: tool }),
  addAnnotation: (annotation) => set((state) => ({
    annotations: [...state.annotations, annotation]
  })),
  setPdfFile: (file) => set({ pdfFile: file })
}))
