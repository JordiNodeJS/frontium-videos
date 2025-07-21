---
title: Redux Islands - Store Global con Preservación de SSR
author: Frontium Videos Team
category: coding
language: es
---

# REGLA: Redux Islands - Store Global con Preservación de SSR

## Contexto
Esta regla define la implementación de "Redux Islands" (Islas de Redux) para Next.js 15, una estrategia avanzada que permite compartir estado global entre componentes separados mientras preserva Server-Side Rendering (SSR) y optimiza la hidratación.

## Concepto Clave: "Islas de Interactividad"
En lugar de convertir toda la aplicación en Client Components, creamos "islas" de interactividad donde solo los componentes que necesitan Redux son Client Components, manteniendo el resto como Server Components.

## Arquitectura

### 1. Store Global con Aislamiento por Sesión
```tsx
// src/store/globalStore.ts
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
    if (!window.__REDUX_STORE_SESSION_ID__) {
      window.__REDUX_STORE_SESSION_ID__ = `session_${Date.now()}_${Math.random()}`
    }
    return window.__REDUX_STORE_SESSION_ID__
  }
  return `server_${Date.now()}_${Math.random()}`
}

export function getGlobalStore(): AppStore {
  const sessionId = getSessionId()
  const now = Date.now()
  
  // 🧹 CRÍTICO: Limpiar stores inactivos para evitar memory leaks
  cleanupOldStores()
  
  if (!storeMap.has(sessionId)) {
    storeMap.set(sessionId, {
      store: makeStore(getInitialState()),
      lastActivity: now
    })
  } else {
    // Actualizar timestamp de última actividad
    const entry = storeMap.get(sessionId)!
    entry.lastActivity = now
  }
  
  return storeMap.get(sessionId)!.store
}

// 🧹 LIMPIEZA AUTOMÁTICA DE STORES INACTIVOS
export function cleanupOldStores(maxAge = 30 * 60 * 1000) { // 30 minutos
  const now = Date.now()
  let cleanedCount = 0
  
  for (const [sessionId, entry] of storeMap.entries()) {
    if (now - entry.lastActivity > maxAge) {
      storeMap.delete(sessionId)
      cleanedCount++
    }
  }
  
  if (process.env.NODE_ENV === 'development' && cleanedCount > 0) {
    console.log(`🧹 Redux Store Cleanup: Removed ${cleanedCount} inactive stores`)
  }
  
  return cleanedCount
}

// 📊 Función para monitoreo de stores
export function getStoreStats() {
  const now = Date.now()
  const stats = {
    totalStores: storeMap.size,
    activeStores: 0,
    inactiveStores: 0
  }
  
  for (const [, entry] of storeMap.entries()) {
    const age = now - entry.lastActivity
    if (age < 5 * 60 * 1000) { // Activo si se usó en los últimos 5 minutos
      stats.activeStores++
    } else {
      stats.inactiveStores++
    }
  }
  
  return stats
}

// Función para resetear el store de la sesión actual
export function resetGlobalStore() {
  const sessionId = getSessionId()
  storeMap.delete(sessionId)
}
```

### 2. Provider Global
```tsx
// src/components/GlobalReduxProvider.tsx
'use client'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { getGlobalStore } from '@/store/globalStore'

interface GlobalReduxProviderProps {
  children: ReactNode
}

export default function GlobalReduxProvider({ children }: GlobalReduxProviderProps) {
  const store = getGlobalStore()
  return <Provider store={store}>{children}</Provider>
}
```

### 3. Componente Isla
```tsx
// src/components/ReduxIsland.tsx
'use client'
import { ReactNode } from 'react'
import GlobalReduxProvider from './GlobalReduxProvider'

interface ReduxIslandProps {
  children: ReactNode
  className?: string
}

export default function ReduxIsland({ children, className = '' }: ReduxIslandProps) {
  return (
    <div className={className}>
      <GlobalReduxProvider>
        {children}
      </GlobalReduxProvider>
    </div>
  )
}
```

## Uso Correcto

### Estructura de Página
```tsx
// src/app/(root)/page.tsx - Server Component
import ReduxIsland from '@/components/ReduxIsland'
import ComponenteConRedux1 from './ComponenteConRedux1'
import ComponenteConRedux2 from './ComponenteConRedux2'
import ServerComponent from './ServerComponent'

export default function HomePage() {
  return (
    <div>
      {/* Isla 1 de Redux */}
      <ReduxIsland>
        <ComponenteConRedux1 />
      </ReduxIsland>
      
      {/* Server Component - sin Redux */}
      <ServerComponent />
      
      {/* Isla 2 de Redux - COMPARTE EL MISMO STORE */}
      <ReduxIsland>
        <ComponenteConRedux2 />
      </ReduxIsland>
    </div>
  )
}
```

### Componentes que Comparten Estado
```tsx
// ComponenteConRedux1.tsx
'use client'
import { useSelector, useDispatch } from 'react-redux'

export default function ComponenteConRedux1() {
  const favorites = useSelector(state => state.favorites)
  const dispatch = useDispatch()
  
  return (
    <div>
      <h3>Favoritos: {favorites.length}</h3>
      <button onClick={() => dispatch(addToFavorites({ id: 1 }))}>
        Agregar
      </button>
    </div>
  )
}

// ComponenteConRedux2.tsx (en otra isla)
'use client'
import { useSelector } from 'react-redux'

export default function ComponenteConRedux2() {
  const favorites = useSelector(state => state.favorites) // ← Mismo estado!
  return <div>Total: {favorites.length}</div>
}
```

## Ventajas

### ✅ SSR Preservado
- Server Components se renderizan en el servidor
- Solo las "islas" se hidratan en el cliente
- Mejor rendimiento inicial y SEO

### ✅ Estado Compartido
- Todas las islas comparten el mismo store global
- Cambios en una isla se reflejan en todas las demás
- Estado consistente en toda la aplicación

### ✅ Hidratación Granular
- Cada isla se hidrata independientemente
- Mejor experiencia de usuario
- Menos JavaScript inicial

### ✅ Flexibilidad
- Múltiples islas por página
- Cada isla puede contener múltiples componentes
- Fácil mantenimiento y debugging

## Estructura de Hidratación
```
Página (Server Component)
├── ReduxIsland 1 (Client Component) ← Hidratación 1
│   └── ComponenteConRedux1
├── ServerComponent (Server Component) ← Sin hidratación
└── ReduxIsland 2 (Client Component) ← Hidratación 2
    └── ComponenteConRedux2
```

## Casos de Uso Ideales

### ✅ Usar Redux Islands cuando:
- Necesitas compartir estado entre componentes separados
- Quieres preservar SSR y optimizar rendimiento
- Tienes componentes interactivos específicos en páginas mayormente estáticas
- Necesitas hidratación granular

### ❌ No usar cuando:
- Solo un componente necesita estado local (usar useState)
- Todos los componentes de la página necesitan Redux (usar StoreProvider global)
- El estado no necesita ser compartido (usar múltiples StoreProviders independientes)

## Principios de Implementación

1. **Layout sin Provider**: Mantener el layout como Server Component puro
2. **Store Singleton**: Un solo store global compartido entre todas las islas
3. **Islas Específicas**: Crear islas solo donde se necesite Redux
4. **Server Components por Defecto**: Usar Server Components para todo lo que no necesite interactividad
5. **Hidratación Optimizada**: Cada isla se hidrata independientemente

## Diferencias con StoreProvider Tradicional

### StoreProvider Tradicional (useRef)
```tsx
export default function StoreProvider({ children }: StoreProviderProps) {
  const storeRef = useRef<AppStore | undefined>(undefined)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
```

### Store Singleton Global (variable global)
```tsx
let globalStore: AppStore | undefined

export function getGlobalStore(): AppStore {
  if (!globalStore) {
    globalStore = makeStore()
  }
  return globalStore
}
```

### ¿Por qué no useRef en el Singleton Global?

1. **Scope diferente**: 
   - `useRef` vive dentro del componente React
   - Variable global vive en el módulo JavaScript

2. **Persistencia**:
   - `useRef` se reinicia cuando el componente se desmonta
   - Variable global persiste durante toda la sesión

3. **Acceso**:
   - `useRef` solo accesible dentro del componente
   - Variable global accesible desde cualquier lugar

## 🚨 CRÍTICO: Gestión de Memoria en Producción

### ¿Por qué es Importante la Limpieza de Stores?

Con **1000 usuarios concurrentes**, tendrás **1000 stores en memoria**. Sin limpieza automática:
- **Memory leaks**: El servidor puede quedarse sin memoria
- **Performance degradado**: Garbage collection más frecuente
- **Crashes**: En casos extremos, el proceso puede morir

### Implementación Obligatoria

```tsx
// ✅ CORRECTO - Con limpieza automática
export function getGlobalStore(): AppStore {
  cleanupOldStores() // ← CRÍTICO: Llamar en cada acceso
  // ... resto del código
}

// ❌ PELIGROSO - Sin limpieza automática
let globalStore: AppStore | undefined
export function getGlobalStore(): AppStore {
  if (!globalStore) {
    globalStore = makeStore()
  }
  return globalStore // ← Un solo store para todos (inseguro)
}
```

### Configuración Recomendada

- **Desarrollo**: `maxAge = 5 minutos` (para testing rápido)
- **Producción**: `maxAge = 30-60 minutos` (balance memoria/UX)
- **Alta concurrencia**: `maxAge = 15 minutos` + monitoreo activo

### Monitoreo en Producción

```tsx
// Agregar logging para producción
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    const stats = getStoreStats()
    if (stats.totalStores > 500) { // Umbral de alerta
      console.warn('⚠️ High store count:', stats)
    }
  }, 10 * 60 * 1000) // Cada 10 minutos
}
```

## Checklist para la IA
- [ ] ¿El layout permanece como Server Component?
- [ ] ¿Se usa un storeMap con aislamiento por sesión?
- [ ] ¿Se implementó cleanupOldStores() correctamente?
- [ ] ¿Se llama a la limpieza en cada acceso al store?
- [ ] ¿Las islas solo envuelven componentes que necesitan Redux?
- [ ] ¿Los Server Components permanecen sin 'use client'?
- [ ] ¿El estado se comparte correctamente entre islas?
- [ ] ¿Se preserva el SSR para componentes no interactivos?
- [ ] ¿Se configuró monitoreo para detectar memory leaks?

## Referencias
- [redux-nextjs15-StoreProvider.prompt.md]
- [nextjs15-coding.prompt.md]
- [redux-favorites.prompt.md] 