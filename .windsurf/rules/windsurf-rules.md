# Reglas de IA y Codificación para Windsurf y Frontium Videos

## 1. Reglas Generales de Windsurf

### Acceso a Rutas en Windows
- **Usa siempre la ruta exactamente como está autorizada**, respetando mayúsculas/minúsculas en la letra de la unidad y el resto del path.
- **Siempre utiliza la letra de la unidad en mayúsculas** al especificar rutas de archivos o carpetas en Windows.
  - **Ejemplo correcto:** `G:\DEV\academia\frontium-videos`
  - **Ejemplo incorrecto:** `g:\DEV\academia\frontium-videos`

### Interacción y Comunicación
- **Respuestas del asistente:** SIEMPRE en español (excepto commits y código).
- **Comandos Git:** SIEMPRE en inglés y siguiendo el formato Conventional Commits.

### Análisis de Configuración del Proyecto
- **SIEMPRE** revisar la carpeta `.github/prompts/` antes de hacer cambios
- Extraer y aplicar las reglas de codificación específicas del proyecto
- Generar reglas compatibles entre las especificaciones del proyecto y Windsurf
- Mantener consistencia con las convenciones establecidas

---

## 2. Reglas Específicas del Proyecto (Frontium Videos)

Estas reglas se extraen de `.github/prompts/` y son de obligado cumplimiento.

### 2.1. Configuración del Proyecto y Tecnologías

#### Package Manager (OBLIGATORIO)
- **SIEMPRE** usar `pnpm` como package manager exclusivo
- Comandos permitidos: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm start`
- Para paquetes ejecutables: `pnpm dlx <package>`

- **❌ PROHIBIDO:** `npm`, `yarn`, `bun`

#### Stack Tecnológico
- **Next.js 15** - Solo App Router, nunca Pages Router
- **React 18** - Server Components por defecto
- **TypeScript** - Configuración estricta obligatoria
- **ESLint** - Flat config (`eslint.config.mjs`)
- **Prettier** - Formateo automático
- **Tailwind CSS** - Para estilos (opcional)
- **pnpm** - Package manager exclusivo

### 2.2. Estructura de Directorios
```
frontium-videos/
├── .github/
│   └── prompts/           # Reglas de codificación
├── src/
│   └── app/              # App Router (OBLIGATORIO)
│       ├── layout.tsx    # Root layout (REQUERIDO)
│       ├── page.tsx      # Página principal
│       ├── globals.css   # Estilos globales
│       └── components/   # Componentes reutilizables
├── public/               # Assets estáticos
├── package.json
├── next.config.ts        # Configuración TypeScript
├── tsconfig.json
├── eslint.config.mjs     # ESLint flat config
└── postcss.config.mjs
```

### 2.3. Arquitectura Next.js 15

#### App Router (OBLIGATORIO)
- **USAR SOLO** App Router, nunca Pages Router
- Estructura basada en sistema de archivos en `src/app/`
- Convenciones de archivos:
  - `layout.tsx` - Layout compartido
  - `page.tsx` - Página de ruta
  - `loading.tsx` - UI de carga
  - `error.tsx` - UI de error
  - `not-found.tsx` - Página 404
  - `route.ts` - API endpoints

#### Server Components vs Client Components

**Server Components (Por Defecto)**
```tsx
// Server Component - NO usar 'use client'
export default async function ServerPage() {
  // ✅ Fetch de datos directo
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // o 'no-store' para datos dinámicos
  });
  
  return <div>{/* UI */}</div>;
}
```

**Client Components (Solo cuando sea necesario)**
```tsx
'use client' // ✅ Al inicio del archivo

import { useState } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState('');
  return <div>{/* Interactive UI */}</div>;
}
```

### 2.4. Reglas de Importación React (OBLIGATORIO)

#### ✅ CORRECTO - Importación explícita
```tsx
import { useState, useEffect, FormEvent, ChangeEvent, FC, ReactNode } from 'react';

export default function Component() {
  const [state, setState] = useState(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
}
```

#### ❌ INCORRECTO - Namespace React
```tsx
import React from 'react';

export default function Component() {
  const [state, setState] = React.useState(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
}
```

### 2.5. Naming Conventions

- **Componentes:** `PascalCase` (ej. `UserProfile.tsx`)
- **Páginas (directorio):** `kebab-case` (ej. `user-profile/page.tsx`)
- **Hooks:** `camelCase` con prefijo `use` (ej. `useAuthState`)
- **Server Actions:** `camelCase` (ej. `createPost`)
- **Tipos e Interfaces:** `PascalCase` (ej. `UserProfile`)

### 2.6. Orden de Importaciones

1. Imports de React (`import { useState } from 'react';`)
2. Imports de Next.js (`import Link from 'next/link';`)
3. Imports de librerías externas (`import { clsx } from 'clsx';`)
4. Imports internos con alias (`import { Button } from '@/components/ui/button';`)
5. Imports relativos (`import './styles.css';`)

### 2.7. TypeScript (Configuración Estricta)

- **Tipado estricto:** SIEMPRE tipar props y variables. NUNCA usar `any`
- **Interfaces para objetos complejos:** Usar `interface` para definir la forma de los objetos
- **Props explícitas:**

```tsx
interface ComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default function Component({ title, items, onSelect }: ComponentProps) {
  // implementation
}
```

### 2.8. ShadCN/UI con pnpm (OBLIGATORIO)

#### ✅ CORRECTO
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
```

#### ❌ INCORRECTO
```bash
npx shadcn@latest add button
bunx --bun shadcn@latest add button
yarn dlx shadcn@latest add button
```

### 2.9. Data Fetching

#### Server-Side (Recomendado)
```tsx
export default async function Page() {
  const data = await fetch('api/data', { cache: 'force-cache' });
  return <div>{/* UI */}</div>;
}
```

#### Parallel Fetching
```tsx
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  return <div>{/* UI with both data */}</div>;
}
```

### 2.10. Server Actions

```tsx
'use server'

import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function createPost(formData: FormData) {
  const result = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Crear post...
}
```

### 2.11. Git y Commits (Inglés)

**Formato Obligatorio (Conventional Commits):**
```bash
feat: add user authentication
fix: resolve hydration issue
docs: update setup guide
style: format with prettier
refactor: extract auth logic
test: add user tests
chore: update dependencies
```

### 2.12. Seguridad y Performance

#### Optimizaciones Obligatorias
- Usar componente `<Image>` de Next.js para imágenes
- Implementar loading states con `loading.tsx`
- Usar Error boundaries con `error.tsx`
- Implementar Suspense para streaming

#### Seguridad
- **Server Actions:** Validar entradas con Zod y verificar autorización
- **Variables de Entorno:** Usar variables de entorno para claves secretas. NUNCA exponerlas en el cliente
- **Validación:** Siempre validar datos del lado del servidor
- **Package Manager:** Usar exclusivamente pnpm para evitar vulnerabilidades

### 2.13. React Context (Patrón Obligatorio)

#### Cuándo Usar Context vs Props

**✅ USA CONTEXT cuando:**
- 5+ componentes necesitan los mismos datos
- Prop drilling de 3+ niveles de profundidad
- Los datos cambian frecuentemente y necesitan estar sincronizados
- Estado global o semi-global necesario
- Múltiples componentes hermanos necesitan los mismos datos

**❌ USA PROPS cuando:**
- 2-3 componentes máximo necesitan los datos
- 1-2 niveles de profundidad
- Datos estáticos o que cambian poco
- Componentes reutilizables que deben ser independientes
- Relación directa padre-hijo

#### Patrón Obligatorio: Context + Custom Hook

```typescript
// context/SomeContext.tsx
"use client";

import { createContext, useContext, ReactNode } from "react";

// 1. Definir el tipo del Context
interface SomeContextType {
  data: SomeData;
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

#### Implementaciones Actuales en el Proyecto

**CourseContext** (`/courses/[courseSlug]`):
- Comparte datos del curso entre múltiples componentes
- Usado en: `CourseInfo.tsx`, `CourseContent.tsx`
- Hook: `useCourse()`

**ProfileContext** (`/profile/[userId]`):
- Gestiona estado del perfil de usuario
- Funciones: `toggleFavoriteCourse()`, `updateProfile()`
- Hook: `useProfile()`

**TutorialContext** (`/tutorial/context`):
- Ejemplo educativo completo con navegación
- Demuestra estado derivado y funciones de control
- Hook: `useTutorial()`

#### Mejores Prácticas Context

1. **Siempre usar Custom Hook:**
```typescript
// ✅ CORRECTO
const { course } = useCourse();

// ❌ INCORRECTO
const context = useContext(CourseContext);
```

2. **Validar uso dentro del Provider:**
```typescript
export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider');
  }
  return context;
}
```

3. **Colocar Provider lo más cerca posible:**
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

### 2.14. Autenticación con Clerk

#### Configuración Obligatoria

**Variables de Entorno:**
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_public_key
CLERK_SECRET_KEY=tu_secret_key
```

**Layout Principal:**
```tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

**Middleware (OBLIGATORIO):**
```typescript
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

#### Estructura de Rutas de Autenticación

**Páginas de Autenticación:**
- `src/app/(auth)/sign-in/[[...sign-in]]/page.tsx` - Página de inicio de sesión
- `src/app/(auth)/sign-up/[[...sign-up]]/page.tsx` - Página de registro
- `src/app/(auth)/layout.tsx` - Layout específico para autenticación

**Componentes de Autenticación:**
```tsx
// AuthGuard - Protege rutas que requieren autenticación
import { AuthGuard } from '@/components/auth';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>Contenido protegido</div>
    </AuthGuard>
  );
}

// UserButton - Botón de usuario adaptativo
import { UserButton } from '@/components/auth';

export default function Header() {
  return (
    <header>
      <UserButton /> {/* Muestra login/signup o avatar del usuario */}
    </header>
  );
}
```

#### Hooks de Autenticación

```tsx
import { useAuth, useUser } from '@clerk/nextjs';

function MyComponent() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return <div>Cargando...</div>;
  
  if (!isSignedIn) return <div>No autenticado</div>;
  
  return <div>Hola, {user?.firstName}!</div>;
}
```

#### Server Components con Autenticación

```tsx
import { currentUser } from '@clerk/nextjs/server';

export default async function ServerPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return <div>Hola, {user.firstName}!</div>;
}
```

#### Mejores Prácticas de Autenticación

1. **Usar AuthGuard para rutas protegidas:**
```tsx
// ✅ CORRECTO
<AuthGuard>
  <DashboardContent />
</AuthGuard>

// ❌ INCORRECTO - Lógica manual repetitiva
if (!isSignedIn) {
  router.push('/sign-in');
  return null;
}
```

2. **Server Components para datos sensibles:**
```tsx
// ✅ CORRECTO - Server Component
export default async function ProfilePage() {
  const user = await currentUser();
  // Datos del usuario disponibles en el servidor
}

// ✅ TAMBIÉN CORRECTO - Client Component
'use client';
export default function ProfilePage() {
  const { user } = useUser();
  // Datos del usuario disponibles en el cliente
}
```

3. **Personalización de apariencia:**
```tsx
<SignIn 
  appearance={{
    elements: {
      formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
      card: 'shadow-lg border border-gray-200'
    }
  }}
  routing="path"
  path="/sign-in"
  signUpUrl="/sign-up"
/>
```

### 2.15. Testing Patterns

```tsx
import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn React basics',
  };

  it('renders course information', () => {
    render(<CourseCard course={mockCourse} />);
    
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
  });
});
```

---

**IMPORTANTE**: Estas reglas son **obligatorias** para mantener la consistencia y calidad del código en Frontium Videos. Cualquier código que no siga estas convenciones debe ser corregido.

Para detalles ampliados, consultar los archivos de reglas en `.github/prompts/`.
