---
description: "Reglas para usar React Context vs Props en componentes de Next.js 15"
mode: agent
---

# 🎯 Reglas de React Context para AI

## 📋 Cuándo Usar Context vs Props

### ✅ USA CONTEXT cuando:

- 5+ componentes necesitan los mismos datos
- Prop drilling de 3+ niveles de profundidad
- Los datos cambian frecuentemente y necesitan estar sincronizados
- Estado global o semi-global necesario
- Múltiples componentes hermanos necesitan los mismos datos

### ❌ USA PROPS cuando:

- 2-3 componentes máximo necesitan los datos
- 1-2 niveles de profundidad
- Datos estáticos o que cambian poco
- Componentes reutilizables que deben ser independientes
- Relación directa padre-hijo

## 🏗️ Patrón Obligatorio: Context + Custom Hook

### Estructura Requerida:

```typescript
// context/SomeContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";

// 1. Definir el tipo del Context
interface SomeContextType {
  data: SomeData;
  // Agregar funciones de estado si es necesario
  // updateData?: (data: SomeData) => void;
}

// 2. Crear el Context con undefined para detectar uso fuera del Provider
const SomeContext = createContext<SomeContextType | undefined>(undefined);

// 3. Props del Provider
interface SomeProviderProps {
  data: SomeData;
  children: ReactNode;
}

// 4. Provider Component
export function SomeProvider({ data, children }: SomeProviderProps) {
  const value = { data };

  return <SomeContext.Provider value={value}>{children}</SomeContext.Provider>;
}

// 5. Custom Hook (OBLIGATORIO)
export function useSome(): SomeContextType {
  const context = useContext(SomeContext);

  if (context === undefined) {
    throw new Error("useSome must be used within SomeProvider");
  }

  return context;
}
```

## 🎯 Reglas de Implementación

### 1. **SIEMPRE usar Custom Hook**

```typescript
// ✅ CORRECTO
export function useSome(): SomeContextType {
  const context = useContext(SomeContext);

  if (context === undefined) {
    throw new Error("useSome must be used within SomeProvider");
  }

  return context;
}

// ❌ NUNCA usar useContext directamente en componentes
const context = useContext(SomeContext); // NO HACER ESTO
```

### 2. **Scope Limitado del Provider**

```typescript
// ✅ CORRECTO - Envolver solo los componentes que necesitan los datos
<SomeProvider data={data}>
  <ComponentThatNeedsData />
  <AnotherComponentThatNeedsData />
</SomeProvider>
<ComponentThatDoesntNeedData />

// ❌ INCORRECTO - Scope muy amplio
<SomeProvider data={data}>
  <div className="entire-page">
    <Header />
    <Navigation />
    <ComponentThatNeedsData />
    <Footer />
  </div>
</SomeProvider>
```

### 3. **TypeScript Safety Obligatorio**

```typescript
// ✅ CORRECTO - Context tipado
interface SomeContextType {
  data: SomeData;
}

const SomeContext = createContext<SomeContextType | undefined>(undefined);

// ❌ INCORRECTO - Sin tipos
const SomeContext = createContext(null);
```

### 4. **Separación de Archivos**

```
context/
├── SomeContext.tsx          # Context + Provider + Hook
components/
├── ComponentConsumer.tsx    # Usa el hook
page.tsx                     # Envuelve con Provider
```

## 🚨 Errores Comunes a Evitar

### 1. **Context Hell**

```typescript
// ❌ EVITAR - Demasiados Providers anidados
<UserProvider>
  <ThemeProvider>
    <CourseProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </CourseProvider>
  </ThemeProvider>
</UserProvider>

// ✅ MEJOR - Combinar contexts relacionados o usar composición
<AppProvider>
  <App />
</AppProvider>
```

### 2. **Re-renders Innecesarios**

```typescript
// ❌ EVITAR - Context que cambia frecuentemente
const [data, setData] = useState(initialData);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Cada cambio re-renderiza TODOS los consumidores

// ✅ MEJOR - Separar por frecuencia de cambio
<DataProvider>
  {" "}
  {/* Datos estáticos */}
  <StatusProvider>
    {" "}
    {/* Estados que cambian */}
    <Components />
  </StatusProvider>
</DataProvider>;
```

### 3. **Usar Context para Todo**

```typescript
// ❌ EVITAR - Context para datos que solo usa 1 componente
<SingleComponentDataProvider>
  <ComponentThatUsesData />
</SingleComponentDataProvider>

// ✅ MEJOR - Props directas
<ComponentThatUsesData data={data} />
```

## 📝 Convenciones de Naming

- **Context**: `SomeContext` (PascalCase)
- **Provider**: `SomeProvider` (PascalCase)
- **Custom Hook**: `useSome` (camelCase con prefijo `use`)
- **Context Type**: `SomeContextType` (PascalCase + sufijo `Type`)

## 🎓 Casos de Uso Válidos en Frontium Videos

### ✅ Casos Apropiados para Context:

- **Datos del curso** (CourseContext) - Múltiples componentes necesitan info del curso
- **Estado de autenticación** (AuthContext) - Usado en header, páginas protegidas, etc.
- **Configuración de tema** (ThemeContext) - UI components necesitan tema

### ❌ Casos donde NO usar Context:

- **Props simples** - Solo 1-2 componentes necesitan los datos
- **Datos de formulario** - Usar react-hook-form o state local
- **UI state local** - Modal open/close, accordion state, etc.

## 🛠️ Ejemplos Prácticos

### Context para Datos de Curso

```typescript
// context/CourseContext.tsx
'use client'

import { createContext, useContext, ReactNode } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

interface CourseContextType {
  course: Course;
  currentModule?: Module;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

interface CourseProviderProps {
  course: Course;
  children: ReactNode;
}

export function CourseProvider({ course, children }: CourseProviderProps) {
  const value = { course };
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

export function useCourse(): CourseContextType {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
}
```

### Uso en Página de Curso

```typescript
// app/courses/[slug]/page.tsx
import { CourseProvider } from './context/CourseContext';
import { CourseContent } from './components/CourseContent';
import { CourseSidebar } from './components/CourseSidebar';

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  
  return (
    <CourseProvider course={course}>
      <div className="flex">
        <CourseSidebar />
        <CourseContent />
      </div>
    </CourseProvider>
  );
}
```

### Componentes que Consumen el Context

```typescript
// components/CourseContent.tsx
'use client'

import { useCourse } from '../context/CourseContext';

export function CourseContent() {
  const { course } = useCourse();
  
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
}

// components/CourseSidebar.tsx
'use client'

import { useCourse } from '../context/CourseContext';

export function CourseSidebar() {
  const { course } = useCourse();
  
  return (
    <aside>
      <h2>Módulos del Curso</h2>
      <ul>
        {course.modules.map(module => (
          <li key={module.id}>{module.title}</li>
        ))}
      </ul>
    </aside>
  );
}
```

---

**Importante**: Estas reglas aseguran un uso eficiente y mantenible de React Context en Frontium Videos, evitando problemas de rendimiento y complejidad innecesaria. 