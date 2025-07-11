---
description: "Guía completa para implementar Redux con FavoriteButton manteniendo Server Components"
mode: agent
---

# 🔄 Redux + Server Components - Frontium Videos

## 📋 Cuándo Usar Redux vs Context vs Props

### ✅ USA REDUX cuando:

- **Estado global real**: Datos necesarios en múltiples rutas/páginas
- **Interacciones complejas**: Toggle de favoritos, carrito, notificaciones
- **Sincronización entre pantallas**: Estado debe persistir al navegar
- **Operaciones optimistas**: UX instantáneo con API calls en background
- **Cache de datos del usuario**: Evitar refetch constante

### ✅ USA CONTEXT cuando:

- **Estado semi-global**: Datos compartidos en una ruta específica (curso, perfil)
- **Configuración de tema**: UI state que afecta múltiples componentes
- **Provider scope limitado**: Estado que solo necesita un árbol específico

### ✅ USA PROPS cuando:

- **Datos locales**: Solo 1-2 componentes necesitan los datos
- **Server Components**: Data fetching y renderizado principal
- **Componentes puros**: Reutilizables e independientes

## 🏗️ Patrón Obligatorio: Redux + Server Components

### 1. **Estructura de Store (Redux Toolkit)**

```typescript
// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import favoritesSlice from './slices/favoritesSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    favorites: favoritesSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### 2. **Slice Pattern (Async Thunks)**

```typescript
// src/store/slices/favoritesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// ✅ CORRECTO - Thunk para operaciones async
export const toggleCourseFavorite = createAsyncThunk(
  'favorites/toggleCourse',
  async (courseId: string, { getState }) => {
    const state = getState() as RootState;
    const userId = state.auth.user?.id;
    
    const response = await fetch(`/api/users/${userId}/favorites`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId }),
    });
    
    if (!response.ok) throw new Error('Failed to toggle favorite');
    return response.json();
  }
);

interface FavoritesState {
  favoriteIds: string[];
  isLoading: boolean;
  loadingCourseId: string | null;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  isLoading: false,
  loadingCourseId: null,
  error: null,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // ✅ CORRECTO - Acción optimista para UX instantáneo
    toggleFavoriteOptimistic: (state, action: PayloadAction<string>) => {
      const courseId = action.payload;
      const isFavorite = state.favoriteIds.includes(courseId);
      
      if (isFavorite) {
        state.favoriteIds = state.favoriteIds.filter(id => id !== courseId);
      } else {
        state.favoriteIds.push(courseId);
      }
    },
    setInitialFavorites: (state, action: PayloadAction<string[]>) => {
      state.favoriteIds = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleCourseFavorite.pending, (state, action) => {
        state.isLoading = true;
        state.loadingCourseId = action.meta.arg;
        state.error = null;
      })
      .addCase(toggleCourseFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loadingCourseId = null;
        // El estado optimista ya se aplicó, aquí podríamos sincronizar con servidor
        state.favoriteIds = action.payload.favoriteIds;
      })
      .addCase(toggleCourseFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.loadingCourseId = null;
        state.error = action.error.message || 'Error updating favorites';
        
        // ✅ REVERTIR cambio optimista en caso de error
        const courseId = action.meta.arg;
        const isFavorite = state.favoriteIds.includes(courseId);
        if (isFavorite) {
          state.favoriteIds = state.favoriteIds.filter(id => id !== courseId);
        } else {
          state.favoriteIds.push(courseId);
        }
      });
  },
});

export const { toggleFavoriteOptimistic, setInitialFavorites, clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
```

### 3. **Hooks Tipados (Obligatorio)**

```typescript
// src/hooks/useAppSelector.ts
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '@/store/store';

// ✅ CORRECTO - Hook tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// src/hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';

// ✅ CORRECTO - Dispatch tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();
```

## 🎯 Patrón: Server + Client Híbrido

### 1. **Server Component (Data Fetching)**

```tsx
// src/app/courses/[courseSlug]/page.tsx (Server Component)
import { getCourseDetails } from './lib/getCourseDetails';
import CourseInfo from './components/CourseInfo';
import CourseContent from './components/CourseContent';
import ClientProviders from '@/components/ClientProviders';
import FavoriteButton from '@/components/shared/FavoriteButton';

export default async function CoursePage({ 
  params 
}: { 
  params: Promise<{ courseSlug: string }> 
}) {
  const { courseSlug } = await params;
  const course = await getCourseDetails(courseSlug); // ✅ Server-side data fetching

  return (
    <div>
      {/* ✅ CORRECTO - 95% Server Component */}
      <CourseInfo course={course} />
      <CourseContent course={course} />
      
      {/* ✅ CORRECTO - 5% Client Component para Redux */}
      <ClientProviders>
        <FavoriteButton courseId={course.id} />
      </ClientProviders>
    </div>
  );
}
```

### 2. **Client Providers (Scope Limitado)**

```tsx
// src/components/ClientProviders.tsx
'use client'

import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface ClientProvidersProps {
  children: React.ReactNode;
}

// ✅ CORRECTO - Provider reutilizable para componentes que necesitan Redux
export default function ClientProviders({ children }: ClientProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
```

### 3. **FavoriteButton (Client Component)**

```tsx
// src/components/shared/FavoriteButton.tsx
'use client'

import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleFavoriteOptimistic, toggleCourseFavorite } from '@/store/slices/favoritesSlice';

interface FavoriteButtonProps {
  courseId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FavoriteButton({ 
  courseId, 
  size = 'md', 
  className = '' 
}: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  
  const { favoriteIds, loadingCourseId } = useAppSelector(state => state.favorites);
  const { isAuthenticated } = useAppSelector(state => state.auth);
  
  const isFavorite = favoriteIds.includes(courseId);
  const isThisLoading = loadingCourseId === courseId;

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return;
    
    // ✅ CORRECTO - Actualización optimista para UX instantáneo
    dispatch(toggleFavoriteOptimistic(courseId));
    
    // ✅ CORRECTO - API call en background
    try {
      await dispatch(toggleCourseFavorite(courseId)).unwrap();
    } catch (error) {
      // Error handling: Redux automáticamente revierte el cambio optimista
      console.error('Error toggling favorite:', error);
    }
  };

  if (!isAuthenticated) return null;

  const sizeClasses = {
    sm: 'text-sm p-1',
    md: 'text-base p-2',
    lg: 'text-lg p-3'
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isThisLoading}
      className={`
        transition-all duration-200 transform hover:scale-110 active:scale-95
        ${sizeClasses[size]}
        ${isThisLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      {isThisLoading ? '⏳' : (isFavorite ? '❤️' : '🤍')}
    </button>
  );
}
```

## 🚨 Reglas Críticas

### 1. **NUNCA envolver todo en Redux Provider**

```tsx
// ❌ INCORRECTO - Pierde todos los Server Components
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Provider store={store}>
          {children} {/* Todo se vuelve Client Component */}
        </Provider>
      </body>
    </html>
  );
}

// ✅ CORRECTO - Solo componentes específicos
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children} {/* Sigue siendo Server Component */}
      </body>
    </html>
  );
}
```

### 2. **Usar ClientProviders solo donde necesites Redux**

```tsx
// ✅ CORRECTO - Scope limitado
<div>
  <CourseInfo course={course} /> {/* Server Component */}
  <ClientProviders>
    <FavoriteButton courseId={course.id} /> {/* Solo esto es Client */}
  </ClientProviders>
</div>

// ❌ INCORRECTO - Scope muy amplio
<ClientProviders>
  <div>
    <CourseInfo course={course} /> {/* Se vuelve Client innecesariamente */}
    <FavoriteButton courseId={course.id} />
  </div>
</ClientProviders>
```

### 3. **Mantener Server Components para data fetching**

```tsx
// ✅ CORRECTO - Server Component hace data fetching
export default async function Page({ params }) {
  const course = await getCourseDetails(params.slug); // Server-side
  
  return (
    <div>
      <h1>{course.title}</h1> {/* Server-side rendering */}
      <ClientProviders>
        <FavoriteButton courseId={course.id} />
      </ClientProviders>
    </div>
  );
}

// ❌ INCORRECTO - Client Component con useEffect
'use client'
export default function Page({ params }) {
  const [course, setCourse] = useState(null);
  
  useEffect(() => {
    fetch(`/api/courses/${params.slug}`)
      .then(res => res.json())
      .then(setCourse);
  }, [params.slug]);
  
  if (!course) return <div>Loading...</div>;
  
  return <div>{course.title}</div>;
}
```

## 📁 Estructura de Archivos Obligatoria

```
src/
├── store/
│   ├── store.ts                 # Configuración principal
│   └── slices/
│       ├── authSlice.ts         # Autenticación
│       ├── favoritesSlice.ts    # Favoritos
│       └── uiSlice.ts           # UI state global
├── hooks/
│   ├── useAppSelector.ts        # Selector tipado
│   └── useAppDispatch.ts        # Dispatch tipado
├── components/
│   ├── ClientProviders.tsx      # Provider reutilizable
│   └── shared/
│       └── FavoriteButton.tsx   # Componente global
└── app/
    ├── layout.tsx               # Root layout (Server)
    └── courses/
        └── [slug]/
            └── page.tsx         # Página curso (Server + Client híbrido)
```

## 🎯 Casos de Uso Válidos para Redux

### ✅ Apropiado para Redux:
- **Favoritos de usuario**: Estado global entre rutas
- **Estado de autenticación**: User, token, permisos
- **Notificaciones globales**: Toast messages, alerts
- **Configuración del reproductor**: Velocidad, calidad, volumen
- **Cache de búsquedas**: Resultados frecuentes

### ❌ NO usar Redux para:
- **Estado de formularios**: Usar React Hook Form
- **UI state local**: Modal open/close, accordion
- **Data fetching**: Usar Server Components + fetch
- **Estado de una sola página**: Usar useState o Context local

## 🔧 Dependencias Requeridas

```bash
# Redux Toolkit (obligatorio)
bun add @reduxjs/toolkit react-redux

# Persistencia (opcional)
bun add redux-persist

# DevTools (desarrollo)
bun add --dev @redux-devtools/extension
```

## ⚡ Performance Best Practices

### 1. **Selectores optimizados**

```typescript
// ✅ CORRECTO - Selector específico
const favoriteIds = useAppSelector(state => state.favorites.favoriteIds);

// ❌ EVITAR - Selector amplio que causa re-renders
const favorites = useAppSelector(state => state.favorites);
```

### 2. **Memoización cuando sea necesario**

```typescript
// ✅ CORRECTO - Memoizar cálculos costosos
const favoriteCourses = useAppSelector(state => 
  createSelector(
    [state => state.favorites.favoriteIds, state => state.courses.data],
    (favoriteIds, courses) => favoriteIds.map(id => courses[id])
  )
);
```

### 3. **Lazy loading de slices**

```typescript
// ✅ CORRECTO - Cargar slices solo cuando se necesiten
const store = configureStore({
  reducer: {
    auth: authSlice,
    // favorites se carga dinámicamente cuando se necesite
  },
});
```

---

**IMPORTANTE**: Seguir este patrón estrictamente para mantener los beneficios de Server Components mientras se obtiene el poder de Redux para estado global específico. 