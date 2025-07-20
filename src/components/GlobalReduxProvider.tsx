'use client'
import { ReactNode, useEffect } from 'react'
import { Provider } from 'react-redux'
import { getGlobalStore } from '@/store/globalStore'

interface GlobalReduxProviderProps {
  children: ReactNode
  initialState?: any // Estado inicial desde SSR
}

export default function GlobalReduxProvider({ 
  children, 
  initialState 
}: GlobalReduxProviderProps) {
  const store = getGlobalStore()
  
  // Hidratación: sincronizar estado del servidor con el cliente
  useEffect(() => {
    if (initialState && typeof window !== 'undefined') {
      // Inyectar estado inicial en window para que getGlobalStore lo use
      window.__REDUX_INITIAL_STATE__ = initialState
    }
  }, [initialState])
  
  return <Provider store={store}>{children}</Provider>
} 