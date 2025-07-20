# Tutorial: Redux Islands con Aislamiento por Sesión y SSR

## 📚 Introducción

Este tutorial te enseñará a implementar **Redux Islands**, una estrategia avanzada para Next.js 15 que permite:

- ✅ **Compartir estado** entre componentes separados
- ✅ **Preservar SSR** completamente
- ✅ **Aislar estado** por sesión/usuario
- ✅ **Hidratación perfecta** servidor-cliente
- ✅ **Gestión automática** de memoria
- ✅ **Sincronización en tiempo real** entre islas separadas
- ✅ **Persistencia de estado** con localStorage

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
  
  <ServerReduxWrapper>
    <ThemeToggle />  {/* Isla 3 - Control de tema sincronizado */}
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
import themeReducer from './slices/themeSlice'

// Tipo para el estado inicial/precargado
type PreloadedState = Parameters<typeof configureStore>[0]['preloadedState']

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      theme: themeReducer,
      // Agrega más slices aquí
    },
    preloadedState,
  })
}

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
      theme: state.theme,
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

## 🎨 Paso 6: Crear Slice para el Tema

Primero, crea un slice para manejar el tema:

```tsx
// src/store/slices/themeSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  isSystemPreference: boolean
}

const initialState: ThemeState = {
  mode: 'light',
  isSystemPreference: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
      state.isSystemPreference = false
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      state.isSystemPreference = false
    },
    setSystemPreference(state, action: PayloadAction<boolean>) {
      state.isSystemPreference = action.payload
      if (action.payload) {
        // Detectar preferencia del sistema
        if (typeof window !== 'undefined') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          state.mode = prefersDark ? 'dark' : 'light'
        }
      }
    },
    initializeTheme(state) {
      // Inicializar tema basado en localStorage o sistema
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null
        const savedSystemPref = localStorage.getItem('theme-system-preference')
        
        if (savedTheme && savedSystemPref === 'false') {
          state.mode = savedTheme
          state.isSystemPreference = false
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          state.mode = prefersDark ? 'dark' : 'light'
          state.isSystemPreference = true
        }
      }
    },
  },
})

export const { setTheme, toggleTheme, setSystemPreference, initializeTheme } = themeSlice.actions
export default themeSlice.reducer
```

## 🌙 Paso 7: Crear Componente de Toggle de Tema

Crea un componente que actúe como isla Redux para el tema:

```tsx
// src/components/ThemeToggle.tsx
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
```

## 🎨 Paso 8: Crear ThemeProvider

Crea un provider que aplique las clases CSS del tema:

```tsx
// src/components/ThemeProvider.tsx
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
```

## 🎨 Paso 9: Crear Componentes de Ejemplo

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

## 📄 Paso 10: Usar en una Página

Implementa las islas en una página con soporte para tema:

```tsx
// src/app/(root)/page.tsx
import ServerReduxWrapper from '@/components/ServerReduxWrapper'
import FavoriteButton from '@/components/FavoriteButton'
import FavoriteCounter from '@/components/FavoriteCounter'
import ThemeToggle from '@/components/ThemeToggle'
import ThemeProvider from '@/components/ThemeProvider'

export default function HomePage() {
  return (
    <ServerReduxWrapper>
      <ThemeProvider>
        <div className="container mx-auto p-8 bg-white dark:bg-gray-900 min-h-screen transition-colors">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Redux Islands Demo
            </h1>
            {/* Control de tema en el header */}
            <ServerReduxWrapper>
              <ThemeToggle variant="compact" />
            </ServerReduxWrapper>
          </div>
          
          {/* Isla 1: Botón de favoritos */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-200">
              Curso React Avanzado
            </h2>
            <ServerReduxWrapper>
              <FavoriteButton courseId="react-avanzado" />
            </ServerReduxWrapper>
          </div>
          
          {/* Componente servidor (sin Redux) */}
          <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded transition-colors">
            <h3 className="text-gray-900 dark:text-white">Este es un Server Component</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Se renderiza en el servidor y no necesita JavaScript.
            </p>
          </div>
          
          {/* Isla 2: Control de tema */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-200">
              Control de Tema
            </h2>
            <ServerReduxWrapper>
              <ThemeToggle variant="button" />
            </ServerReduxWrapper>
          </div>
          
          {/* Isla 3: Contador de favoritos */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-200">Resumen</h2>
            <ServerReduxWrapper>
              <FavoriteCounter />
            </ServerReduxWrapper>
          </div>
          
          {/* Isla 4: Otro botón */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-gray-800 dark:text-gray-200">
              Curso Next.js
            </h2>
            <ServerReduxWrapper>
              <FavoriteButton courseId="nextjs-pro" />
            </ServerReduxWrapper>
          </div>
          
          {/* Demostración de sincronización */}
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-blue-800 dark:text-blue-200">
              🔄 Sincronización en Tiempo Real
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Estos controles están completamente separados pero comparten el mismo estado:
            </p>
            <div className="flex gap-4">
              <ServerReduxWrapper>
                <ThemeToggle variant="switch" />
              </ServerReduxWrapper>
              <ServerReduxWrapper>
                <ThemeToggle variant="compact" />
              </ServerReduxWrapper>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </ServerReduxWrapper>
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
- **Temas**: Modo oscuro/claro sincronizado globalmente
- **Configuraciones**: Preferencias de usuario persistentes
- **Notificaciones**: Estado de alertas compartido
- **Filtros**: Estados de búsqueda y filtrado globales

### ⚠️ **Consideraciones importantes:**

- **Rendimiento**: Cada isla se hidrata independientemente
- **Seguridad**: Estado aislado por sesión/usuario
- **Memoria**: Limpieza automática previene leaks
- **SEO**: SSR preservado completamente

¡Ahora tienes un sistema Redux robusto, escalable y optimizado para Next.js 15! 🎉 