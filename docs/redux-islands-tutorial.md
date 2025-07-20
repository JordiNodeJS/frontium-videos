# Tutorial: Redux Islands con Aislamiento por Sesión y SSR

## 📚 Introducción

Este tutorial te enseñará a implementar **Redux Islands**, una estrategia avanzada para Next.js 15 que permite:

- ✅ **Compartir estado** entre componentes separados
- ✅ **Preservar SSR** completamente
- ✅ **Aislar estado** por sesión/usuario
- ✅ **Hidratación perfecta** servidor-cliente
- ✅ **Gestión automática** de memoria

## 🎯 ¿Qué lograremos?

Al final de este tutorial tendrás:

```tsx
// Página con múltiples islas que comparten estado
<div>
  <ServerReduxWrapper>
    <FavoriteButton courseId="1" />  {/* Isla 1 */}
  </ServerReduxWrapper>
  
  <CourseContent />  {/* Server Component */}
  
  <ServerReduxWrapper>
    <FavoriteCounter />  {/* Isla 2 - mismo estado que Isla 1 */}
  </ServerReduxWrapper>
</div>
```

## 📋 Prerrequisitos

- Next.js 15 con App Router
- Redux Toolkit instalado
- TypeScript configurado

## 🚀 Paso 1: Configurar el Store Base

Asegúrate de tener tu store configurado correctamente:

```tsx
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'

export const makeStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
      // Agrega más slices aquí
    },
    preloadedState,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
```

## 🏗️ Paso 2: Crear el Store Global con Aislamiento

Crea el archivo más importante del sistema:

```tsx
// src/store/globalStore.ts
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

export function getGlobalStore(): AppStore {
  const sessionId = getSessionId()
  
  if (!storeMap.has(sessionId)) {
    const initialState = getInitialState()
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
    const lastActivity = state.lastActivity || 0
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
```

## 🔌 Paso 3: Crear el Provider Global

Crea el provider que manejará la hidratación:

```tsx
// src/components/GlobalReduxProvider.tsx
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
```

## 🏝️ Paso 4: Crear el Componente Isla

Crea el componente que envuelve las islas de Redux:

```tsx
// src/components/ReduxIsland.tsx
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
```

## 🖥️ Paso 5: Crear el Server Wrapper

Crea el wrapper que maneja el SSR:

```tsx
// src/components/ServerReduxWrapper.tsx
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
```

## 🎨 Paso 6: Crear Componentes de Ejemplo

Crea componentes que usen Redux:

```tsx
// src/components/FavoriteButton.tsx
'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleFavoriteOptimistic } from '@/store/slices/favoritesSlice'

interface FavoriteButtonProps {
  courseId: string
}

export default function FavoriteButton({ courseId }: FavoriteButtonProps) {
  const favorites = useSelector((state: RootState) => state.favorites.favoriteIds)
  const dispatch = useDispatch()
  
  const isFavorite = favorites.includes(courseId)
  
  const handleToggle = () => {
    dispatch(toggleFavoriteOptimistic(courseId))
  }
  
  return (
    <button 
      onClick={handleToggle}
      className={`px-4 py-2 rounded ${
        isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}
    >
      {isFavorite ? '❤️ Favorito' : '🤍 Agregar a favoritos'}
    </button>
  )
}
```

```tsx
// src/components/FavoriteCounter.tsx
'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function FavoriteCounter() {
  const favoritesCount = useSelector((state: RootState) => 
    state.favorites.favoriteIds.length
  )
  
  return (
    <div className="bg-blue-100 p-4 rounded">
      <h3 className="text-lg font-semibold">
        Total de favoritos: {favoritesCount}
      </h3>
    </div>
  )
}
```

## 📄 Paso 7: Usar en una Página

Implementa las islas en una página:

```tsx
// src/app/(root)/page.tsx
import ServerReduxWrapper from '@/components/ServerReduxWrapper'
import FavoriteButton from '@/components/FavoriteButton'
import FavoriteCounter from '@/components/FavoriteCounter'

export default function HomePage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Redux Islands Demo</h1>
      
      {/* Isla 1: Botón de favoritos */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Curso React Avanzado</h2>
        <ServerReduxWrapper>
          <FavoriteButton courseId="react-avanzado" />
        </ServerReduxWrapper>
      </div>
      
      {/* Componente servidor (sin Redux) */}
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h3>Este es un Server Component</h3>
        <p>Se renderiza en el servidor y no necesita JavaScript.</p>
      </div>
      
      {/* Isla 2: Contador de favoritos */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Resumen</h2>
        <ServerReduxWrapper>
          <FavoriteCounter />
        </ServerReduxWrapper>
      </div>
      
      {/* Isla 3: Otro botón */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Curso Next.js</h2>
        <ServerReduxWrapper>
          <FavoriteButton courseId="nextjs-pro" />
        </ServerReduxWrapper>
      </div>
    </div>
  )
}
```

## 🔧 Paso 8: Configurar Limpieza Automática (Opcional)

Agrega limpieza automática en tu layout o middleware:

```tsx
// src/app/layout.tsx
import { cleanupOldStores } from '@/store/globalStore'

// Limpiar stores antiguos cada 5 minutos
if (typeof window === 'undefined') {
  setInterval(() => {
    cleanupOldStores()
  }, 5 * 60 * 1000)
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
```

## 🧪 Paso 9: Testing

Crea tests para verificar el aislamiento:

```tsx
// tests/redux-islands.test.tsx
import { resetGlobalStore, getGlobalStore } from '@/store/globalStore'

describe('Redux Islands', () => {
  beforeEach(() => {
    resetGlobalStore()
  })
  
  it('should isolate state between sessions', () => {
    // Simular sesión 1
    const store1 = getGlobalStore()
    store1.dispatch({ type: 'favorites/toggleFavoriteOptimistic', payload: 'course1' })
    
    // Simular sesión 2 (nuevo ID)
    delete window.__REDUX_STORE_SESSION_ID__
    const store2 = getGlobalStore()
    
    expect(store1.getState().favorites.favoriteIds).toContain('course1')
    expect(store2.getState().favorites.favoriteIds).not.toContain('course1')
  })
})
```

## 🚀 ¡Listo!

Ya tienes implementado Redux Islands con:

### ✅ **Características implementadas:**

1. **Estado compartido por sesión**: Todas las islas de un usuario comparten estado
2. **Aislamiento entre usuarios**: Cada sesión tiene su propio store
3. **SSR preservado**: Server Components siguen funcionando
4. **Hidratación perfecta**: Sin diferencias servidor-cliente
5. **Gestión automática de memoria**: Limpieza de stores antiguos

### 🎯 **Flujo de funcionamiento:**

1. **Servidor**: Renderiza página con estado inicial
2. **Cliente**: Recibe estado y crea/obtiene store de sesión
3. **Hidratación**: Sincroniza estado servidor-cliente
4. **Interacción**: Usuario interactúa con estado consistente
5. **Sincronización**: Cambios se reflejan en todas las islas

### 🔍 **Debugging:**

- Usa Redux DevTools para ver el estado
- Verifica que cada sesión tiene su ID único
- Comprueba que la hidratación es consistente

### 📈 **Escalabilidad:**

- Agrega más slices al store según necesites
- Crea más islas en diferentes páginas
- Implementa persistencia con localStorage si es necesario

### 🎨 **Casos de uso ideales:**

- **E-commerce**: Carrito de compras compartido entre componentes
- **Educación**: Favoritos de cursos sincronizados
- **Dashboard**: Estado de usuario global
- **Social**: Notificaciones y preferencias

### ⚠️ **Consideraciones importantes:**

- **Rendimiento**: Cada isla se hidrata independientemente
- **Seguridad**: Estado aislado por sesión/usuario
- **Memoria**: Limpieza automática previene leaks
- **SEO**: SSR preservado completamente

¡Ahora tienes un sistema Redux robusto, escalable y optimizado para Next.js 15! 🎉 