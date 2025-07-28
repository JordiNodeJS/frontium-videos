---
description: "Reglas de codificación para Next.js 15 con App Router, Server Components y TypeScript"
mode: agent
---

# Reglas de Codificación para Next.js 15 - Frontium Videos

## 🎯 Configuración del Proyecto

### Context7 - Consulta Obligatoria de Documentación
**REGLA CRÍTICA:** Antes de instalar cualquier paquete o dependencia, SIEMPRE usar Context7 para obtener información actualizada.

#### Proceso Obligatorio:
1. **Consultar Context7 PRIMERO:**
   ```
   use context7
   
   Quiero instalar [nombre_del_paquete] para [propósito]. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
   ```

2. **Verificar información actualizada:**
   - Versión más reciente disponible
   - Compatibilidad con Next.js 15
   - Mejores prácticas de instalación
   - Configuración recomendada
   - Breaking changes recientes
   - Alternativas si es necesario

3. **Solo después proceder con la instalación:**
   ```bash
   pnpm add [paquete]@[version-verificada]
   ```

#### Ejemplos de Uso:
- ✅ `use context7` → "Instalar @clerk/nextjs para autenticación"
- ✅ `use context7` → "Instalar tailwindcss para estilos"
- ✅ `use context7` → "Instalar @heroicons/react para iconos"

**Esta regla es OBLIGATORIA y debe aplicarse en el 100% de las instalaciones.**

### Package Manager
- **SIEMPRE** usar `pnpm` como package manager
- Comandos: `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm start`
- Para paquetes ejecutables: `pnpm dlx <package>`
- **NUNCA instalar sin consultar Context7 primero**

### Estructura de Directorios
```
frontium-videos/
├── .github/
│   └── prompts/           # Reglas de Cursor
├── src/
│   └── app/              # App Router (Next.js 15)
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

## 🏗️ Arquitectura Next.js 15

### App Router (OBLIGATORIO)
- **USAR SOLO** App Router, nunca Pages Router
- Estructura basada en sistema de archivos en `src/app/`
- Convenciones de archivos:
  - `layout.tsx` - Layout compartido
  - `page.tsx` - Página de ruta
  - `loading.tsx` - UI de carga
  - `error.tsx` - UI de error
  - `not-found.tsx` - Página 404
  - `route.ts` - API endpoints

### Server Components vs Client Components

#### Server Components (Por Defecto)
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

#### Client Components (Cuando sea necesario)
```tsx
'use client' // ✅ Al inicio del archivo

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState('');
  
  // ✅ Hooks permitidos aquí
  useEffect(() => {
    // lógica cliente
  }, []);
  
  return <div>{/* UI interactiva */}</div>;
}
```

### Importaciones React

- **SIEMPRE** usar importación explícita de tipos, hooks y elementos de React
- **NUNCA** usar el namespace `React.` para acceder a elementos

#### ✅ CORRECTO:
```tsx
import { useState, FormEvent, ChangeEvent } from 'react';

export function Component() {
  const handleSubmit = (e: FormEvent) => {
    // código...
  };
}
```

#### ❌ INCORRECTO:
```tsx
import React from 'react';

export function Component() {
  const handleSubmit = (e: React.FormEvent) => {
    // código...
  };
}
```

### Composición de Componentes

#### ✅ CORRECTO: Estrategia de límites optimizada
```tsx
// app/dashboard/page.tsx - Server Component
import { ClientWrapper } from './client-wrapper';

export default async function Dashboard() {
  const data = await fetchServerData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Solo el componente que NECESITA interactividad */}
      <ClientWrapper data={data} />
    </div>
  );
}

// app/dashboard/client-wrapper.tsx
'use client'

export function ClientWrapper({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Cerrar' : 'Abrir'}
    </button>
  );
}
```

#### ❌ INCORRECTO: Límite demasiado amplio
```tsx
'use client' // ❌ Componente entero se ejecuta en cliente

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  
  // ❌ Este fetch debería ser server-side
  useEffect(() => {
    fetch('/api/data').then(/* ... */);
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

## 📡 Data Fetching

### Server-Side Fetching
```tsx
// ✅ En Server Components
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // Estrategias de cache:
    cache: 'force-cache',     // SSG equivalente
    // cache: 'no-store',     // SSR equivalente
    // next: { revalidate: 60 } // ISR equivalente
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
```

### Client-Side Fetching
```tsx
'use client'

import { useEffect, useState } from 'react';

export default function ClientData() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // ✅ Para datos que cambian frecuentemente
    fetch('/api/dynamic-data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data ? JSON.stringify(data) : 'Cargando...'}</div>;
}
```

### Parallel Data Fetching
```tsx
// ✅ Fetch paralelo para reducir waterfalls
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  const [user, posts] = await Promise.all([
    userData.json(),
    postsData.json()
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

## 🎨 TypeScript & Styling

### TypeScript Configuración
```typescript
// tsconfig.json debe incluir:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Tipos de Componentes
```tsx
// ✅ Props interface siempre
interface ComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default function Component({ title, items, onSelect }: ComponentProps) {
  // implementación
}
```

### Styling con Tailwind
```tsx
// ✅ Clases utilitarias
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
</div>

// ✅ Componentes condicionales
<button 
  className={`
    px-4 py-2 rounded transition-colors
    ${variant === 'primary' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    }
  `}
>
  {children}
</button>
```

## 🚀 Performance & SEO

### Metadata API
```tsx
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontium Videos',
  description: 'Plataforma de cursos en video',
};

// Para rutas dinámicas
export async function generateMetadata({ params }): Promise<Metadata> {
  const course = await getCourse(params.slug);
  
  return {
    title: course.title,
    description: course.description,
  };
}
```

### Loading States
```tsx
// app/courses/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
```

### Error Boundaries
```tsx
// app/courses/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Algo salió mal
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
```

## 🔧 Patrones Comunes

### Server Actions
```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  
  // Validación
  if (!title || title.length < 3) {
    return { error: 'El título debe tener al menos 3 caracteres' };
  }
  
  // Lógica del servidor
  const post = await db.post.create({
    data: { title }
  });
  
  return { success: true, post };
}
```

### Forms con Server Actions
```tsx
// app/create-post/page.tsx
import { createPost } from '../actions';

export default function CreatePost() {
  return (
    <form action={createPost} className="space-y-4">
      <input
        name="title"
        placeholder="Título del post"
        required
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Crear Post
      </button>
    </form>
  );
}
```

## 📱 Responsive Design

### Breakpoints Tailwind
```tsx
// Mobile-first approach
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-4
">
  {items.map(item => (
    <div key={item.id} className="p-4 bg-white rounded-lg">
      {item.title}
    </div>
  ))}
</div>
```

## 🔒 Autenticación con Clerk

### Configuración Obligatoria

#### Variables de Entorno (REQUERIDAS)
```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

#### Layout Principal con ClerkProvider
```tsx
// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

#### Middleware de Autenticación (OBLIGATORIO)
```typescript
// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Estructura de Rutas de Autenticación

#### Páginas de Autenticación (OBLIGATORIO)
```
src/app/(auth)/
├── layout.tsx                    # Layout específico para auth
├── sign-in/
│   └── [[...sign-in]]/
│       └── page.tsx             # Página de inicio de sesión
└── sign-up/
    └── [[...sign-up]]/
        └── page.tsx             # Página de registro
```

#### Implementación de Páginas de Auth
```tsx
// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="w-full max-w-md">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
            card: 'shadow-lg border border-gray-200',
            headerTitle: 'text-2xl font-bold text-gray-900',
          }
        }}
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
```

### Componentes de Autenticación

#### AuthGuard - Protección de Rutas (OBLIGATORIO)
```tsx
// src/components/auth/auth-guard.tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  fallback = <div>Cargando...</div>,
  redirectTo = '/sign-in'
}: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  if (!isLoaded || !isSignedIn) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

#### UserButton - Botón de Usuario Adaptativo
```tsx
// src/components/auth/user-button.tsx
'use client';

import { UserButton as ClerkUserButton, useAuth } from '@clerk/nextjs';
import Link from 'next/link';

export function UserButton() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <ClerkUserButton 
        appearance={{
          elements: {
            avatarBox: 'w-8 h-8',
            userButtonPopoverCard: 'shadow-lg border border-gray-200',
          }
        }}
        afterSignOutUrl="/"
      />
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link href="/sign-in" className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Iniciar sesión
      </Link>
      <Link href="/sign-up" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
        Registrarse
      </Link>
    </div>
  );
}
```

### Patrones de Uso

#### Rutas Protegidas
```tsx
// ✅ CORRECTO - Usar AuthGuard
import { AuthGuard } from '@/components/auth';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div>Contenido protegido</div>
    </AuthGuard>
  );
}

// ❌ INCORRECTO - Lógica manual repetitiva
export default function DashboardPage() {
  const { isSignedIn } = useAuth();
  
  if (!isSignedIn) {
    redirect('/sign-in');
  }
  
  return <div>Contenido protegido</div>;
}
```

#### Server Components con Autenticación
```tsx
// Server Component
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div>
      <h1>Perfil de {user.firstName}</h1>
      <p>Email: {user.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

#### Client Components con Hooks
```tsx
// Client Component
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export default function ProfilePage() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return <div>Cargando...</div>;
  if (!isSignedIn) return <div>No autenticado</div>;
  
  return (
    <div>
      <h1>Perfil de {user?.firstName}</h1>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

### Mejores Prácticas de Autenticación

1. **SIEMPRE usar AuthGuard para rutas protegidas**
2. **Server Components para datos sensibles del usuario**
3. **Client Components para interactividad con autenticación**
4. **Personalizar apariencia con appearance prop**
5. **Configurar redirects apropiados (afterSignOutUrl, etc.)**
6. **Usar middleware para protección global**
7. **Validar autenticación tanto en cliente como servidor**

## 🔒 Seguridad

### Validación Server-Side
```tsx
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

export async function createUser(formData: FormData) {
  const result = UserSchema.safeParse({
    email: formData.get('email'),
    age: Number(formData.get('age')),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Crear usuario...
}
```

## 🔐 Autenticación con Clerk

### Configuración Básica
```tsx
// app/layout.tsx - ClerkProvider en el root
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

### Middleware de Protección
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/courses/create(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

### Rutas de Autenticación
```tsx
// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
            card: 'shadow-lg border border-gray-200',
          },
        }}
      />
    </div>
  );
}
```

### Componentes de Autenticación
```tsx
// components/auth/auth-guard.tsx
import { useAuth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <div>Cargando...</div>;
  }
  
  if (!isSignedIn) {
    if (fallback) return <>{fallback}</>;
    redirect('/sign-in');
  }
  
  return <>{children}</>;
}
```

### Hooks de Usuario
```tsx
// Obtener información del usuario
import { useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { user, isLoaded } = useUser();
  
  if (!isLoaded) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;
  
  return (
    <div>
      <h1>Hola, {user.firstName}!</h1>
      <p>{user.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

### Server-Side Authentication
```tsx
// Server Components con autenticación
import { auth } from '@clerk/nextjs/server';

export default async function ProtectedPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <div>Contenido protegido para: {userId}</div>;
}
```

### Variables de Entorno
```bash
# .env.local (REQUERIDO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```

### Personalización de Apariencia
```tsx
// Tema personalizado para Clerk
const clerkAppearance = {
  elements: {
    formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    card: 'shadow-lg border border-gray-200 rounded-lg',
    headerTitle: 'text-2xl font-bold text-gray-900',
    headerSubtitle: 'text-gray-600',
    socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
    formFieldInput: 'border border-gray-300 focus:border-blue-500',
  },
  layout: {
    socialButtonsPlacement: 'bottom' as const,
  },
};
```

## 🧪 Testing Patterns

### Component Testing
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

**Importante**: Estas reglas son **obligatorias** para mantener la consistencia y calidad del código en Frontium Videos. Cualquier PR que no siga estas convenciones será rechazado. 