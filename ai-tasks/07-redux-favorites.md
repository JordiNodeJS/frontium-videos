# 07 - Implementación Redux + FavoriteButton

## 📊 Resumen
- **Estado General**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Completadas**: 0/8
- **En progreso**: 0/8
- **Pendientes**: 8/8
- **Estimación Total**: 24 horas
- **Última actualización**: $(date)

## 🎯 Objetivo Principal
Implementar Redux para estado global de favoritos manteniendo Server Components donde sea posible, siguiendo el patrón híbrido Server + Client específico para Frontium Videos.

## 📋 Tareas Pendientes

### 1. 🏗️ Configuración Inicial de Redux
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 3 horas
- **Descripción**: Configurar Redux Toolkit y estructura base del store
- **Archivos a crear**: `src/store/store.ts`, configuración de slices

#### Subtareas:
- [ ] Instalar dependencias Redux (`bun add @reduxjs/toolkit react-redux`)
- [ ] Crear configuración del store principal (`src/store/store.ts`)
- [ ] Configurar tipos TypeScript (RootState, AppDispatch)
- [ ] Configurar middleware para desarrollo
- [ ] Crear estructura de carpetas `/store/slices/`
- [ ] Configurar Redux DevTools para desarrollo
- [ ] Validar funcionamiento del store básico

### 2. 🔧 Implementación de Hooks Tipados
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 1 hora
- **Descripción**: Crear hooks tipados para Redux siguiendo TypeScript best practices
- **Archivos a crear**: `src/hooks/useAppSelector.ts`, `src/hooks/useAppDispatch.ts`

#### Subtareas:
- [ ] Crear hook `useAppSelector` tipado con RootState
- [ ] Crear hook `useAppDispatch` tipado con AppDispatch
- [ ] Configurar exports desde `/hooks/index.ts`
- [ ] Añadir documentación JSDoc a los hooks
- [ ] Validar funcionamiento de tipos en development

### 3. 💝 Slice de Favoritos (favoritesSlice)
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 4 horas
- **Descripción**: Implementar slice completo para manejo de favoritos con operaciones optimistas
- **Archivos a crear**: `src/store/slices/favoritesSlice.ts`

#### Subtareas:
- [ ] Crear interface `FavoritesState` con tipos correctos
- [ ] Implementar estado inicial del slice
- [ ] Crear acción `toggleFavoriteOptimistic` para UX instantáneo
- [ ] Implementar `setInitialFavorites` para hidratación inicial
- [ ] Crear async thunk `toggleCourseFavorite` para API calls
- [ ] Configurar extraReducers para manejo de estados async (pending/fulfilled/rejected)
- [ ] Implementar reversión automática en caso de error de API
- [ ] Añadir acción `clearError` para limpieza de errores

### 4. 🔐 Slice de Autenticación (authSlice)
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 3 horas
- **Descripción**: Crear slice de autenticación para gestionar usuario y permisos
- **Archivos a crear**: `src/store/slices/authSlice.ts`

#### Subtareas:
- [ ] Crear interface `AuthState` con User type
- [ ] Implementar estado inicial de autenticación
- [ ] Crear acciones `login`, `logout`, `updateUserData`
- [ ] Implementar async thunk `loginUser` para autenticación
- [ ] Crear async thunk `updateUserProfile` para actualización de perfil
- [ ] Configurar persistencia de autenticación (localStorage)
- [ ] Integrar con el User type existente de `/mocks/data/users.ts`

### 5. 🎨 Slice de UI Global (uiSlice)
- **Estado**: 📋 Pendiente
- **Prioridad**: 🟡 Media
- **Estimación**: 2 horas
- **Descripción**: Implementar slice para estado global de UI (tema, notificaciones)
- **Archivos a crear**: `src/store/slices/uiSlice.ts`

#### Subtareas:
- [ ] Crear interface `UIState` para configuraciones globales
- [ ] Implementar manejo de tema (light/dark/system)
- [ ] Crear sistema de notificaciones/toast globales
- [ ] Añadir configuraciones de idioma (es/en)
- [ ] Implementar estado de loading global
- [ ] Crear acciones para mostrar/ocultar modales globales

### 6. 🎯 Componente ClientProviders
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 1 hora
- **Descripción**: Crear Provider reutilizable para envolver componentes que necesiten Redux
- **Archivos a crear**: `src/components/ClientProviders.tsx`

#### Subtareas:
- [ ] Crear componente `ClientProviders` con 'use client' directive
- [ ] Envolver Redux Provider con configuración del store
- [ ] Añadir props opcionales para configuración adicional
- [ ] Configurar Provider para persistencia de Redux (si se usa)
- [ ] Añadir documentación JSDoc explicando cuándo usar
- [ ] Crear ejemplos de uso en comentarios

### 7. ❤️ Componente FavoriteButton
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 4 horas
- **Descripción**: Implementar botón de favoritos reutilizable con Redux
- **Archivos a crear**: `src/components/shared/FavoriteButton.tsx`

#### Subtareas:
- [ ] Crear interface `FavoriteButtonProps` con props opcionales
- [ ] Implementar lógica de conexión con Redux (useAppSelector/useAppDispatch)
- [ ] Crear función `handleToggleFavorite` con actualización optimista
- [ ] Implementar diferentes tamaños (sm/md/lg) con Tailwind
- [ ] Añadir estados de loading específicos por curso
- [ ] Configurar manejo de errores con UX feedback
- [ ] Implementar animaciones de hover y click
- [ ] Añadir prop `className` para customización
- [ ] Validar que solo aparezca para usuarios autenticados
- [ ] Crear documentación JSDoc completa

### 8. 🔧 Integración y Migración
- **Estado**: 📋 Pendiente
- **Prioridad**: 🔴 Alta
- **Estimación**: 6 horas
- **Descripción**: Integrar FavoriteButton en componentes existentes y migrar desde Context
- **Archivos a modificar**: Páginas de cursos, ProfileActivity, lista de cursos

#### Subtareas:
- [ ] Integrar FavoriteButton en `CourseInfo` component (detalle de curso)
- [ ] Añadir FavoriteButton a cards de curso en listado principal
- [ ] Migrar `ProfileActivity` desde ProfileContext a Redux
- [ ] Actualizar página de cursos (`/courses`) con botones de favoritos
- [ ] Eliminar lógica de favoritos del ProfileContext existente
- [ ] Actualizar imports y dependencies en componentes afectados
- [ ] Verificar que no hay conflictos entre Context y Redux
- [ ] Añadir inicialización de favoritos en login/página inicial
- [ ] Probar flujo completo de favoritos entre diferentes páginas
- [ ] Validar que Server Components siguen funcionando correctamente

## 🛠️ Stack Técnico Usado

### Redux
- **Redux Toolkit**: @reduxjs/toolkit
- **React Redux**: react-redux
- **Redux DevTools**: @redux-devtools/extension (dev)

### Patrones Implementados
- **Async Thunks**: Para llamadas a API
- **Optimistic Updates**: Para UX instantáneo
- **Typed Hooks**: useAppSelector, useAppDispatch
- **Error Handling**: Reversión automática en fallos

### Server/Client Separation
- **Server Components**: Data fetching y renderizado principal
- **Client Components**: Solo FavoriteButton y Provider scope
- **Hybrid Pattern**: 95% Server + 5% Client específico

## 📁 Estructura de Archivos Resultante

```
src/
├── store/
│   ├── store.ts                    # ✅ Store principal
│   └── slices/
│       ├── authSlice.ts           # ✅ Autenticación
│       ├── favoritesSlice.ts      # ✅ Favoritos  
│       └── uiSlice.ts             # ✅ UI global
├── hooks/
│   ├── useAppSelector.ts          # ✅ Selector tipado
│   ├── useAppDispatch.ts          # ✅ Dispatch tipado
│   └── index.ts                   # ✅ Exports centralizados
├── components/
│   ├── ClientProviders.tsx        # ✅ Provider reutilizable
│   └── shared/
│       └── FavoriteButton.tsx     # ✅ Botón de favoritos
└── app/
    ├── courses/
    │   ├── page.tsx               # 🔄 Integrar FavoriteButton
    │   └── [courseSlug]/
    │       ├── page.tsx           # 🔄 Integrar FavoriteButton
    │       └── components/
    │           └── CourseInfo.tsx # 🔄 Integrar FavoriteButton
    └── profile/
        └── [userId]/
            └── components/
                └── ProfileActivity.tsx # 🔄 Migrar a Redux
```

## 🎯 Definición de "Completado"

### Criterios de Aceptación:
- [ ] **Redux funcionando**: Store configurado y accesible
- [ ] **Favoritos globales**: Estado sincronizado entre todas las páginas
- [ ] **UX optimista**: Cambios instantáneos en UI, API en background
- [ ] **Server Components preservados**: 95% de la app sigue siendo SSR
- [ ] **TypeScript estricto**: Sin errores de tipo en desarrollo
- [ ] **Error handling**: Reversión automática si API falla
- [ ] **Performance**: Sin re-renders innecesarios
- [ ] **Reutilizable**: FavoriteButton funciona en cualquier lugar

### Validación Final:
- [ ] Usuario puede marcar/desmarcar favoritos desde lista de cursos
- [ ] Usuario puede marcar/desmarcar favoritos desde detalle de curso
- [ ] Usuario puede ver favoritos en su perfil (migrado de Context)
- [ ] Estado de favoritos persiste al navegar entre páginas
- [ ] Funciona correctamente con autenticación (show/hide según login)
- [ ] No hay errores en TypeScript ni ESLint
- [ ] Server Components siguen funcionando para data fetching
- [ ] DevTools de Redux muestran acciones correctamente

## 🔗 Dependencias de Otras Tareas

### Requiere Completar Antes:
- ✅ **01-project-setup**: Configuración base de Next.js 15
- ✅ **02-coding-rules**: Reglas de TypeScript y estructura
- 🟡 **03-frontend-development**: Sistema de componentes base

### Habilita Después:
- **08-notifications-system**: Sistema global de notificaciones
- **09-user-preferences**: Configuraciones globales de usuario
- **10-offline-mode**: Persistencia offline de favoritos

## 📊 Métricas de Seguimiento

### Por Slice:
- **authSlice**: Estado de usuario y autenticación
- **favoritesSlice**: Manejo optimista de favoritos
- **uiSlice**: Configuraciones globales de UI

### Por Componente:
- **FavoriteButton**: Botón reutilizable con Redux
- **ClientProviders**: Provider scope limitado
- **ProfileActivity**: Migración desde Context

### Impacto en Performance:
- **Bundle Size**: +~8KB por Redux Toolkit
- **Runtime**: Optimistic updates = UX instantáneo
- **SSR**: Mantenido en 95% de la aplicación

---

**Archivo de seguimiento - Se actualiza con cada subtarea completada**
**Referencia**: `.github/prompts/redux-favorites.prompt.md` para patrones y reglas 