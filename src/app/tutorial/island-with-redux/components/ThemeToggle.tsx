'use client'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { RootState } from '@/store/store'
import { toggleTheme, setSystemPreference, initializeTheme } from '@/store/slices/themeSlice'

interface ThemeToggleProps {
  variant?: 'button' | 'switch' | 'compact'
  showLabel?: boolean
  className?: string
}

export default function ThemeToggle({ 
  variant = 'button', 
  showLabel = true,
  className = '' 
}: ThemeToggleProps) {
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  // Inicializar tema al montar el componente
  useEffect(() => {
    dispatch(initializeTheme())
  }, [dispatch])

  // Sincronizar con localStorage cuando cambie el tema
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme-mode', theme.mode)
      localStorage.setItem('theme-system-preference', theme.isSystemPreference.toString())
    }
  }, [theme.mode, theme.isSystemPreference])

  const handleToggle = () => {
    dispatch(toggleTheme())
  }

  const handleSystemToggle = () => {
    dispatch(setSystemPreference(!theme.isSystemPreference))
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={handleToggle}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          title={`Cambiar a modo ${theme.mode === 'light' ? 'oscuro' : 'claro'}`}
        >
          {theme.mode === 'light' ? '🌙' : '☀️'}
        </button>
        {showLabel && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {theme.mode === 'light' ? 'Claro' : 'Oscuro'}
          </span>
        )}
      </div>
    )
  }

  if (variant === 'switch') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showLabel && (
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Tema
          </span>
        )}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">☀️</span>
          <button
            onClick={handleToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              theme.mode === 'dark' 
                ? 'bg-blue-600' 
                : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                theme.mode === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-500">🌙</span>
        </div>
        <div className="text-xs text-gray-400">
          {theme.isSystemPreference ? '(Sistema)' : '(Manual)'}
        </div>
      </div>
    )
  }

  // Variant 'button' por defecto
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            theme.mode === 'light'
              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-300'
              : 'bg-blue-900 text-blue-100 hover:bg-blue-800 border border-blue-700'
          }`}
        >
          {theme.mode === 'light' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
        </button>
        
        {showLabel && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Actual: <span className="font-medium">{theme.mode === 'light' ? 'Claro' : 'Oscuro'}</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="system-preference"
          checked={theme.isSystemPreference}
          onChange={handleSystemToggle}
          className="rounded text-blue-600"
        />
        <label htmlFor="system-preference" className="text-sm text-gray-600 dark:text-gray-400">
          Usar preferencia del sistema
        </label>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400">
        🏝️ Este es un <strong>Client Component</strong> - Isla Redux de Tema
      </p>
    </div>
  )
} 