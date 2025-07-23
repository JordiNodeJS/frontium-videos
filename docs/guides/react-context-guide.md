# 🎓 Guía de React Context para Principiantes - Frontium Videos

## 📋 Índice
1. [¿Qué es React Context?](#qué-es-react-context)
2. [¿Cuándo usar Context vs Props?](#cuándo-usar-context-vs-props)
3. [Patrón utilizado en Frontium Videos](#patrón-utilizado-en-frontium-videos)
4. [Implementaciones actuales](#implementaciones-actuales)
5. [Ejemplo práctico paso a paso](#ejemplo-práctico-paso-a-paso)
6. [Mejores prácticas](#mejores-prácticas)
7. [Errores comunes](#errores-comunes)

## 🤔 ¿Qué es React Context?

React Context es una herramienta que permite **compartir datos entre componentes** sin tener que pasar props manualmente a través de cada nivel del árbol de componentes. Es como un "túnel" que conecta directamente los componentes que necesitan los datos.

### El problema que resuelve: Prop Drilling

**❌ Antes (Prop Drilling):**
```
Page → CourseLayout → CourseHeader → CourseTitle
  ↓         ↓            ↓           ↓
course   course      course      course
```

**✅ Después (Context):**
```
Page (Provider) → CourseLayout → CourseHeader → CourseTitle
  ↓                                              ↑
course ----------------------------------------→ useCourse()
```

## 🎯 ¿Cuándo usar Context vs Props?

### ✅ USA CONTEXT cuando:
- **5+ componentes** necesitan los mismos datos
- **Prop drilling de 3+ niveles** de profundidad
- Los datos **cambian frecuentemente** y necesitan estar sincronizados
- **Estado global** o semi-global necesario
- **Múltiples componentes hermanos** necesitan los mismos datos

### ❌ USA PROPS cuando:
- **2-3 componentes máximo** necesitan los datos
- **1-2 niveles** de profundidad
- Datos **estáticos** o que cambian poco
- Componentes **reutilizables** que deben ser independientes
- **Relación directa padre-hijo**

## 🏗️ Patrón utilizado en Frontium Videos

Seguimos el patrón **Context + Custom Hook** que incluye:

1. **Context tipado** con TypeScript
2. **Hook personalizado** para acceso controlado
3. **Validación automática** de uso dentro del Provider
4. **Separación clara** de responsabilidades

### Estructura del patrón:

```typescript
// 1. Definir el tipo del Context
interface SomeContextType {
  data: SomeData;
}

// 2. Crear el Context con undefined para detectar uso fuera del Provider
const SomeContext = createContext<SomeContextType | undefined>(undefined);

// 3. Provider Component
export function SomeProvider({ data, children }: SomeProviderProps) {
  const value = { data };
  return <SomeContext.Provider value={value}>{children}</SomeContext.Provider>;
}

// 4. Custom Hook (OBLIGATORIO)
export function useSome(): SomeContextType {
  const context = useContext(SomeContext);
  
  if (context === undefined) {
    throw new Error("useSome must be used within SomeProvider");
  }
  
  return context;
}
```

## 📁 Implementaciones actuales

### 1. CourseContext (`/courses/[courseSlug]`)

**Ubicación:** `src/app/courses/[courseSlug]/context/CourseContext.tsx`

**Propósito:** Compartir datos del curso entre múltiples componentes de la página del curso.

**Datos que maneja:**
- Información completa del curso (título, descripción, módulos, etc.)

**Componentes que lo usan:**
- `CourseInfo.tsx` - Muestra información básica del curso
- `CourseContent.tsx` - Renderiza el contenido del curso

**Ejemplo de uso:**
```typescript
// En la página del curso
<CourseProvider course={course}>
  <CourseInfo />
  <CourseContent />
</CourseProvider>

// En cualquier componente hijo
function CourseInfo() {
  const { course } = useCourse();
  return <h1>{course.title}</h1>;
}
```

### 2. ProfileContext (`/profile/[userId]`)

**Ubicación:** `src/app/profile/[userId]/context/ProfileContext.tsx`

**Propósito:** Gestionar el estado del perfil de usuario y sus interacciones.

**Datos que maneja:**
- Información del usuario
- Estado de carga (`isLoading`)
- Errores (`error`)
- Funciones para actualizar el perfil

**Funcionalidades:**
- `toggleFavoriteCourse()` - Agregar/quitar cursos favoritos
- `updateProfile()` - Actualizar información del perfil

**Ejemplo de uso:**
```typescript
// En la página del perfil
<ProfileProvider user={user}>
  <ProfileHeader />
  <FavoriteCourses />
</ProfileProvider>

// En cualquier componente hijo
function FavoriteCourses() {
  const { user, toggleFavoriteCourse, isLoading } = useProfile();
  
  return (
    <div>
      {user.favoriteCourses.map(courseId => (
        <button 
          key={courseId}
          onClick={() => toggleFavoriteCourse(courseId)}
          disabled={isLoading}
        >
          Remove from favorites
        </button>
      ))}
    </div>
  );
}
```

## 🔧 Ejemplo práctico paso a paso

Vamos a crear un Context para gestionar el tema (dark/light) de la aplicación:

### Paso 1: Crear el archivo del Context

```typescript
// src/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// 1. Definir el tipo del Context
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// 2. Crear el Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 3. Props del Provider
interface ThemeProviderProps {
  children: ReactNode;
}

// 4. Provider Component
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Custom Hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  
  return context;
}
```

### Paso 2: Envolver la aplicación con el Provider

```typescript
// src/app/layout.tsx
import { ThemeProvider } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Paso 3: Usar el Context en componentes

```typescript
// src/components/Header.tsx
"use client";

import { useTheme } from '@/context/ThemeContext';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className={theme === 'dark' ? 'bg-gray-900' : 'bg-white'}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}
```

## ✅ Mejores prácticas

### 1. **Siempre usar Custom Hooks**
```typescript
// ✅ CORRECTO
const { course } = useCourse();

// ❌ INCORRECTO
const context = useContext(CourseContext);
```

### 2. **Validar el uso dentro del Provider**
```typescript
export function useCourse() {
  const context = useContext(CourseContext);
  
  if (context === undefined) {
    throw new Error("useCourse must be used within CourseProvider");
  }
  
  return context;
}
```

### 3. **Separar Contexts por responsabilidad**
```typescript
// ✅ CORRECTO - Contexts separados
<UserDataProvider>      {/* Datos del usuario */}
  <UserStatusProvider>  {/* Estado: loading, error */}
    <App />
  </UserStatusProvider>
</UserDataProvider>

// ❌ INCORRECTO - Todo en un Context
<MegaUserProvider>  {/* Datos + Estado + UI + Todo */}
  <App />
</MegaUserProvider>
```

### 4. **Colocar el Provider lo más cerca posible**
```typescript
// ✅ CORRECTO - Solo donde se necesita
function CoursePage() {
  return (
    <div>
      <Header />  {/* No necesita course data */}
      <CourseProvider course={course}>
        <CourseContent />  {/* Sí necesita course data */}
        <CourseSidebar />  {/* Sí necesita course data */}
      </CourseProvider>
      <Footer />  {/* No necesita course data */}
    </div>
  );
}
```

### 5. **Usar TypeScript para tipado estricto**
```typescript
interface CourseContextType {
  course: Course;  // Tipo específico, no 'any'
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);
```

## 🚨 Errores comunes

### 1. **Usar Context para todo**
```typescript
// ❌ MAL - Context innecesario
<ButtonColorProvider>
  <Button />  {/* Solo un componente lo usa */}
</ButtonColorProvider>

// ✅ BIEN - Props directas
<Button color="blue" />
```

### 2. **No validar el Provider**
```typescript
// ❌ MAL - Sin validación
export function useCourse() {
  return useContext(CourseContext);  // Puede ser undefined
}

// ✅ BIEN - Con validación
export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within CourseProvider");
  }
  return context;
}
```

### 3. **Re-renders innecesarios**
```typescript
// ❌ MAL - Nuevo objeto en cada render
export function CourseProvider({ children }) {
  const [course, setCourse] = useState(initialCourse);
  
  // ⚠️ Nuevo objeto cada vez = re-render de todos los consumidores
  const value = {
    course,
    updateCourse: (newCourse) => setCourse(newCourse),
  };
  
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}

// ✅ BIEN - Usar useMemo o useCallback
export function CourseProvider({ children }) {
  const [course, setCourse] = useState(initialCourse);
  
  const updateCourse = useCallback((newCourse) => {
    setCourse(newCourse);
  }, []);
  
  const value = useMemo(() => ({
    course,
    updateCourse,
  }), [course, updateCourse]);
  
  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
}
```

### 4. **Context demasiado amplio**
```typescript
// ❌ MAL - Context gigante
interface AppContextType {
  user: User;
  courses: Course[];
  theme: Theme;
  language: Language;
  notifications: Notification[];
  // ... 20 campos más
}

// ✅ BIEN - Contexts específicos
interface UserContextType {
  user: User;
}

interface CoursesContextType {
  courses: Course[];
}

interface ThemeContextType {
  theme: Theme;
}
```

## 🎯 Conclusión

React Context es una herramienta poderosa para compartir datos entre componentes, pero debe usarse sabiamente:

- **✅ Úsalo** para casos complejos con múltiples niveles y componentes
- **❌ Evítalo** para casos simples que props resuelven mejor
- **🎯 La clave** es elegir la herramienta correcta para cada situación

En Frontium Videos, usamos Context para:
1. **Datos del curso** - Compartidos entre múltiples componentes de la página
2. **Estado del perfil** - Gestión centralizada del usuario y sus interacciones

Esto nos permite mantener un código limpio, escalable y fácil de mantener.