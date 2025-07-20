'use client'
import { ReactNode } from 'react'
import GlobalReduxProvider from './GlobalReduxProvider'

interface ReduxIslandProps {
  children: ReactNode
  className?: string
  initialState?: any // Estado inicial desde SSR
}

export default function ReduxIsland({ 
  children, 
  className = '',
  initialState 
}: ReduxIslandProps) {
  return (
    <div className={className}>
      <GlobalReduxProvider initialState={initialState}>
        {children}
      </GlobalReduxProvider>
    </div>
  )
} 