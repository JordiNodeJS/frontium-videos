import { makeStore, AppStore, RootState } from './store'

// Tipo para entrada del store con timestamp de actividad
type StoreEntry = {
  store: AppStore
  lastActivity: number
}

// Map para almacenar stores por sesión con timestamps
const storeMap = new Map<string, StoreEntry>()

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
    },
    theme: {
      mode: 'light',
      isSystemPreference: true,
    }
  }
}

export function getGlobalStore(): AppStore {
  const sessionId = getSessionId()
  const now = Date.now()
  
  // Limpiar stores inactivos cada vez que se accede (optimización de memoria)
  cleanupOldStores()
  
  if (!storeMap.has(sessionId)) {
    let initialState = getInitialState()
    
    // Si no hay estado inicial, usar sesión fake por defecto
    if (!initialState) {
      initialState = createFakeSession()
    }
    
    // El makeStore espera 'any' por limitaciones de Redux Toolkit
    // pero nuestro InitialState es tipado correctamente
    storeMap.set(sessionId, {
      store: makeStore(initialState),
      lastActivity: now
    })
  } else {
    // Actualizar timestamp de última actividad
    const entry = storeMap.get(sessionId)!
    entry.lastActivity = now
  }
  
  return storeMap.get(sessionId)!.store
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
      theme: state.theme,
      // Agregar otros slices que necesiten persistir
    }
    
    return JSON.stringify(serializableState)
  } catch (error) {
    console.warn('Error serializing state:', error)
    return null
  }
}

// 🧹 LIMPIEZA AUTOMÁTICA DE STORES INACTIVOS
// Función para limpiar stores antiguos (prevenir memory leaks)
export function cleanupOldStores(maxAge = 30 * 60 * 1000) { // 30 minutos por defecto
  const now = Date.now()
  let cleanedCount = 0
  
  for (const [sessionId, entry] of storeMap.entries()) {
    if (now - entry.lastActivity > maxAge) {
      storeMap.delete(sessionId)
      cleanedCount++
    }
  }
  
  // Log en desarrollo para monitorear la limpieza
  if (process.env.NODE_ENV === 'development' && cleanedCount > 0) {
    console.log(`🧹 Redux Store Cleanup: Removed ${cleanedCount} inactive stores. Active stores: ${storeMap.size}`)
  }
  
  return cleanedCount
}

// 📊 Función para obtener estadísticas de stores (útil para monitoreo)
export function getStoreStats() {
  const now = Date.now()
  const stats = {
    totalStores: storeMap.size,
    activeStores: 0,
    inactiveStores: 0,
    oldestStore: now,
    newestStore: 0
  }
  
  for (const [, entry] of storeMap.entries()) {
    const age = now - entry.lastActivity
    
    if (age < 5 * 60 * 1000) { // Activo si se usó en los últimos 5 minutos
      stats.activeStores++
    } else {
      stats.inactiveStores++
    }
    
    if (entry.lastActivity < stats.oldestStore) {
      stats.oldestStore = entry.lastActivity
    }
    
    if (entry.lastActivity > stats.newestStore) {
      stats.newestStore = entry.lastActivity
    }
  }
  
  return stats
}

// 🔧 Función para forzar limpieza completa (útil para testing)
export function forceCleanupAllStores() {
  const count = storeMap.size
  storeMap.clear()
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🧹 Force cleanup: Removed all ${count} stores`)
  }
  
  return count
}

// En desarrollo, resetear el store en cada recarga y mostrar estadísticas
if (process.env.NODE_ENV === 'development') {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      const stats = getStoreStats()
      console.log('🔍 Redux Store Stats before unload:', stats)
      resetGlobalStore()
    })
    
    // Mostrar estadísticas cada 2 minutos en desarrollo
    setInterval(() => {
      if (storeMap.size > 0) {
        const stats = getStoreStats()
        console.log('🔍 Redux Store Stats:', stats)
      }
    }, 2 * 60 * 1000)
  }
}

// Declaración de tipos para TypeScript
declare global {
  interface Window {
    __REDUX_STORE_SESSION_ID__?: string
    __REDUX_INITIAL_STATE__?: InitialState
  }
} 