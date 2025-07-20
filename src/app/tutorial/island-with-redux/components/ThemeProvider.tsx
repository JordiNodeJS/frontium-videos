'use client'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@/store/store'

interface ThemeProviderProps {
  children: React.ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSelector((state: RootState) => state.theme)

  useEffect(() => {
    // Aplicar o remover la clase 'dark' del elemento html
    const htmlElement = document.documentElement
    
    if (theme.mode === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }

    // Cleanup function para cuando el componente se desmonte
    return () => {
      htmlElement.classList.remove('dark')
    }
  }, [theme.mode])

  return <>{children}</>
} 