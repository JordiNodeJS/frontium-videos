import { makeStore, AppStore, RootState } from './store'

// Map para almacenar stores por sesión
const storeMap = new Map<string, AppStore>()

// Generar ID único por sesión
function getSessionId(): string {
  if (typeof window !== 'undefined') {
    // En el cliente, usar sessionStorage o generar ID único
    if (!window.__REDUX_STORE_SESSION_ID__) {
      window.__REDUX_STORE_SESSION_ID__ = `session_${Date.now()}_${Math.random()}`
    }
    return window.__REDUX_STORE_SESSION_ID__
  }
  // En el servidor, usar un ID temporal por request
  return `server_${Date.now()}_${Math.random()}`
}

// Función para obtener estado inicial desde el servidor
function getInitialState(): Partial<RootState> | undefined {
  if (typeof window !== 'undefined') {
    // En el cliente, intentar obtener estado desde window
    const initialState = window.__REDUX_INITIAL_STATE__
    if (initialState) {
      // Limpiar después de usar
      delete window.__REDUX_INITIAL_STATE__
      return initialState
    }
  }
  return undefined
}

// Crear sesión fake por defecto para demo
function createFakeSession(): Partial<RootState> {
  return {
    favorites: {
      favoriteIds: ['nextjs-course', 'react-fundamentals'], // Cursos favoritos por defecto
      isLoading: false,
      loadingCourseId: null,
      error: null,
    }
  }
}

export function getGlobalStore(): AppStore {
  const sessionId = getSessionId()
  
  if (!storeMap.has(sessionId)) {
    let initialState = getInitialState()
    
    // Si no hay estado inicial, usar sesión fake por defecto
    if (!initialState) {
      initialState = createFakeSession()
    }
    
    storeMap.set(sessionId, makeStore(initialState as any))
  }
  
  return storeMap.get(sessionId)!
}

// Función para resetear el store de la sesión actual
export function resetGlobalStore() {
  const sessionId = getSessionId()
  storeMap.delete(sessionId)
}

// Función para obtener estado serializable (para SSR)
export function getSerializedState(): string | null {
  try {
    const store = getGlobalStore()
    const state = store.getState()
    
    // Filtrar estado que debe serializarse
    const serializableState = {
      favorites: state.favorites,
      // Agregar otros slices que necesiten persistir
    }
    
    return JSON.stringify(serializableState)
  } catch (error) {
    console.warn('Error serializing state:', error)
    return null
  }
}

// Función para limpiar stores antiguos (prevenir memory leaks)
export function cleanupOldStores(maxAge = 30 * 60 * 1000) { // 30 minutos
  const now = Date.now()
  for (const [sessionId, store] of storeMap.entries()) {
    // Implementar lógica de limpieza basada en tiempo de inactividad
    const state = store.getState()
    const lastActivity = (state as any).lastActivity || 0
    if (now - lastActivity > maxAge) {
      storeMap.delete(sessionId)
    }
  }
}

// En desarrollo, resetear el store en cada recarga
if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      resetGlobalStore()
    })
  }
}

// Declaración de tipos para TypeScript
declare global {
  interface Window {
    __REDUX_STORE_SESSION_ID__?: string
    __REDUX_INITIAL_STATE__?: Partial<RootState>
  }
} 