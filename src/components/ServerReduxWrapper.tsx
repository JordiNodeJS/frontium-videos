import { ReactNode } from 'react'
import { getSerializedState } from '@/store/globalStore'
import ReduxIsland from './ReduxIsland'

interface ServerReduxWrapperProps {
  children: ReactNode
  className?: string
}

export default function ServerReduxWrapper({ 
  children, 
  className 
}: ServerReduxWrapperProps) {
  // Obtener estado serializable del servidor
  const serializedState = getSerializedState()
  const initialState = serializedState ? JSON.parse(serializedState) : undefined
  
  return (
    <ReduxIsland initialState={initialState} className={className}>
      {children}
    </ReduxIsland>
  )
} 