# Guía Completa de Autenticación con Clerk

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Estructura de Archivos](#estructura-de-archivos)
4. [Implementación Paso a Paso](#implementación-paso-a-paso)
5. [Componentes de Autenticación](#componentes-de-autenticación)
6. [Rutas Protegidas](#rutas-protegidas)
7. [Personalización](#personalización)
8. [Mejores Prácticas](#mejores-prácticas)
9. [Troubleshooting](#troubleshooting)

## Introducción

Clerk es una plataforma de autenticación completa que proporciona componentes pre-construidos, hooks y APIs para manejar la autenticación de usuarios en aplicaciones web modernas. En Frontium Videos, utilizamos Clerk para gestionar el registro, inicio de sesión y protección de rutas.

### ¿Por qué Clerk?

- **Componentes UI listos**: Formularios de login/registro pre-diseñados
- **Múltiples proveedores**: Google, GitHub, Discord, etc.
- **Seguridad robusta**: Manejo automático de tokens y sesiones
- **Personalización**: Temas y estilos adaptables
- **TypeScript nativo**: Soporte completo para TypeScript

## Configuración Inicial

### 1. Instalación

```bash
pnpm add @clerk/nextjs
```

### 2. Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```

### 3. Configuración del Dashboard de Clerk

1. Ve a [clerk.com](https://clerk.com) y crea una cuenta
2. Crea una nueva aplicación
3. Configura los dominios permitidos:
   - `http://localhost:3000` (desarrollo)
   - Tu dominio de producción
4. Copia las claves API a tu archivo `.env.local`

## Estructura de Archivos

```
src/
├── app/
│   ├── (auth)/                    # Grupo de rutas de autenticación
│   │   ├── layout.tsx            # Layout específico para auth
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx      # Página de inicio de sesión
│   │   └── sign-up/
│   │       └── [[...sign-up]]/
│   │           └── page.tsx      # Página de registro
│   ├── dashboard/                # Rutas protegidas
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout con ClerkProvider
│   └── globals.css
├── components/
│   └── auth/
│       ├── auth-guard.tsx       # Componente para proteger rutas
│       ├── user-button.tsx      # Botón de usuario
│       └── index.ts            # Exportaciones
├── middleware.ts               # Middleware de protección
└── types/
    └── auth.ts                # Tipos de autenticación
```

## Implementación Paso a Paso

### Paso 1: Configurar el ClerkProvider

```tsx
// src/app/layout.tsx
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
```

### Paso 2: Configurar el Middleware

```typescript
// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define las rutas que requieren autenticación
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/courses/create(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Protege las rutas definidas
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Excluye archivos estáticos y API routes internas de Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Incluye todas las API routes
    '/(api|trpc)(.*)',
  ],
};
```

### Paso 3: Crear Layout de Autenticación

```tsx
// src/app/(auth)/layout.tsx
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header con branding */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Frontium Videos
            </h1>
            <p className="mt-2 text-gray-600">
              Tu plataforma de aprendizaje en línea
            </p>
          </div>
          
          {/* Contenido de autenticación */}
          <div className="rounded-lg bg-white p-8 shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Paso 4: Páginas de Autenticación

```tsx
// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <SignIn 
      appearance={{
        elements: {
          formButtonPrimary: 
            'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
          card: 'shadow-none border-0 p-0',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 
            'border border-gray-300 hover:bg-gray-50',
          formFieldInput: 
            'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
        },
      }}
    />
  );
}
```

```tsx
// src/app/(auth)/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <SignUp 
      appearance={{
        elements: {
          formButtonPrimary: 
            'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
          card: 'shadow-none border-0 p-0',
          headerTitle: 'text-2xl font-bold text-gray-900',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 
            'border border-gray-300 hover:bg-gray-50',
          formFieldInput: 
            'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
        layout: {
          socialButtonsPlacement: 'bottom',
        },
      }}
    />
  );
}
```

## Componentes de Autenticación

### AuthGuard Component

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
  fallback,
  redirectTo = '/sign-in' 
}: AuthGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  // Mostrar loading mientras se carga
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Si no está autenticado, mostrar fallback o redirigir
  if (!isSignedIn) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return null;
  }

  return <>{children}</>;
}
```

### UserButton Component

```tsx
// src/components/auth/user-button.tsx
'use client';

import { UserButton as ClerkUserButton, useUser } from '@clerk/nextjs';

export function UserButton() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200"></div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <ClerkUserButton 
      appearance={{
        elements: {
          avatarBox: 'h-8 w-8',
          userButtonPopoverCard: 'shadow-lg border border-gray-200',
          userButtonPopoverActionButton: 'hover:bg-gray-50',
        },
      }}
      afterSignOutUrl="/"
    />
  );
}
```

### Exportaciones Centralizadas

```tsx
// src/components/auth/index.ts
export { AuthGuard } from './auth-guard';
export { UserButton } from './user-button';
```

## Rutas Protegidas

### Server Components

```tsx
// src/app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Bienvenido, usuario: {userId}</p>
    </div>
  );
}
```

### Client Components

```tsx
// src/app/profile/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { AuthGuard } from '@/components/auth';

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}

function ProfileContent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Mi Perfil</h1>
      <div className="mt-4">
        <p><strong>Nombre:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.emailAddresses[0]?.emailAddress}</p>
        <p><strong>ID:</strong> {user?.id}</p>
      </div>
    </div>
  );
}
```

## Personalización

### Tema Personalizado

```tsx
// src/lib/clerk-theme.ts
import { Appearance } from '@clerk/types';

export const clerkAppearance: Appearance = {
  elements: {
    // Botones primarios
    formButtonPrimary: 
      'bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors',
    
    // Tarjetas
    card: 'shadow-lg border border-gray-200 rounded-lg',
    
    // Headers
    headerTitle: 'text-2xl font-bold text-gray-900',
    headerSubtitle: 'text-gray-600 mt-1',
    
    // Botones sociales
    socialButtonsBlockButton: 
      'border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors',
    
    // Inputs
    formFieldInput: 
      'border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
    
    // Links
    footerActionLink: 'text-blue-600 hover:text-blue-700 font-medium',
  },
  layout: {
    socialButtonsPlacement: 'bottom',
  },
  variables: {
    colorPrimary: '#2563eb',
    colorText: '#1f2937',
    colorTextSecondary: '#6b7280',
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    colorInputText: '#1f2937',
    borderRadius: '0.5rem',
  },
};
```

### Uso del Tema

```tsx
// src/app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerk-theme';

export default function SignInPage() {
  return <SignIn appearance={clerkAppearance} />;
}
```

## Mejores Prácticas

### 1. Manejo de Estados de Carga

```tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function UserProfile() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  // Esperar a que ambos estados se carguen
  if (!authLoaded || !userLoaded) {
    return <LoadingSpinner />;
  }

  if (!isSignedIn || !user) {
    return <NotAuthenticated />;
  }

  return <UserProfileContent user={user} />;
}
```

### 2. Tipos TypeScript

```typescript
// src/types/auth.ts
import { User } from '@clerk/nextjs/server';

export interface AuthenticatedUser extends User {
  // Extensiones personalizadas si es necesario
}

export interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export interface ProtectedPageProps {
  userId: string;
}
```

### 3. Hooks Personalizados

```tsx
// src/hooks/use-auth-redirect.ts
'use client';

import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuthRedirect(redirectTo: string = '/sign-in') {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo);
    }
  }, [isLoaded, isSignedIn, router, redirectTo]);

  return { isSignedIn, isLoaded };
}
```

### 4. Error Boundaries

```tsx
// src/components/auth/auth-error-boundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Error de Autenticación
            </h2>
            <p className="text-gray-600 mb-4">
              Ha ocurrido un error con el sistema de autenticación.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Troubleshooting

### Problemas Comunes

#### 1. Error: "Clerk: Missing publishable key"

**Solución:**
- Verifica que `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` esté en `.env.local`
- Reinicia el servidor de desarrollo después de agregar variables de entorno

#### 2. Redirección infinita en rutas protegidas

**Solución:**
```typescript
// Asegúrate de que las rutas de auth no estén en isProtectedRoute
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // NO incluir '/sign-in' o '/sign-up'
]);
```

#### 3. Estilos no aplicándose correctamente

**Solución:**
```tsx
// Asegúrate de que Tailwind procese las clases de Clerk
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@clerk/nextjs/**/*.js', // Agregar esta línea
  ],
  // ...
};
```

#### 4. Hydration errors

**Solución:**
```tsx
// Usa useEffect para operaciones que dependen del cliente
'use client';

import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <div>{isSignedIn ? 'Autenticado' : 'No autenticado'}</div>;
}
```

### Debugging

#### Habilitar logs de desarrollo

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CLERK_LOGGING: 'true', // Solo en desarrollo
  },
};

module.exports = nextConfig;
```

#### Verificar estado de autenticación

```tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function DebugAuth() {
  const auth = useAuth();
  const user = useUser();

  if (process.env.NODE_ENV === 'development') {
    console.log('Auth state:', auth);
    console.log('User state:', user);
  }

  return null;
}
```

## Recursos Adicionales

- [Documentación oficial de Clerk](https://clerk.com/docs)
- [Ejemplos de Next.js con Clerk](https://github.com/clerkinc/clerk-nextjs-examples)
- [Guía de migración](https://clerk.com/docs/upgrade-guides)
- [API Reference](https://clerk.com/docs/reference)

---

**Nota**: Esta guía está actualizada para Clerk v6 y Next.js 15. Para versiones anteriores, consulta la documentación oficial de migración.
