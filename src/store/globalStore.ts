import { makeStore, AppStore, RootState } from './store'

// Map para almacenar stores por sesión
const storeMap = new Map<string, AppStore>()

// Tipo para estado inicial parcial
type InitialState = Partial<RootState>

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
function getInitialState(): InitialState | undefined {
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
function createFakeSession(): InitialState {
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
    
    // El makeStore espera 'any' por limitaciones de Redux Toolkit
    // pero nuestro InitialState es tipado correctamente
    storeMap.set(sessionId, makeStore(initialState))
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
    const serializableState: InitialState = {
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cleanupOldStores(_maxAge = 30 * 60 * 1000) { // 30 minutos
  // TODO: implementar lógica de limpieza basada en tiempo de inactividad
  // Por ahora, no limpiamos automáticamente los stores
  // En el futuro, se podría agregar un timestamp de última actividad al estado
  
  // Ejemplo de implementación futura:
  // const now = Date.now()
  // for (const [sessionId, store] of storeMap.entries()) {
  //   const state = store.getState()
  //   const lastActivity = state.app?.lastActivity || 0
  //   if (now - lastActivity > _maxAge) {
  //     storeMap.delete(sessionId)
  //   }
  // }
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
    __REDUX_INITIAL_STATE__?: InitialState
  }
} 