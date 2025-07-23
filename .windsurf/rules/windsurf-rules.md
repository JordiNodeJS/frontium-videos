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
- **Clerk** - Sistema de autenticación
- **pnpm** - Package manager exclusivo

### 2.2. Estructura de Directorios
```
frontium-videos/
├── .github/
│   └── prompts/           # Reglas de codificación
├── .windsurf/
│   └── rules/            # Reglas específicas de Windsurf
├── docs/
│   └── guides/           # Documentación y guías
├── src/
│   └── app/              # App Router (Next.js 15)
│       ├── (auth)/       # Grupo de rutas de autenticación
│       ├── demo/         # Páginas de demostración
│       ├── layout.tsx    # Root layout (REQUERIDO)
│       ├── page.tsx      # Página principal
│       └── globals.css   # Estilos globales
│   ├── components/       # Componentes reutilizables
│   │   └── auth/        # Componentes de autenticación
│   ├── lib/             # Utilidades y configuraciones
│   └── types/           # Definiciones de tipos TypeScript
├── public/              # Assets estáticos
├── middleware.ts        # Middleware de Next.js (Clerk)
├── package.json
├── next.config.ts       # Configuración TypeScript
├── tsconfig.json
├── eslint.config.mjs    # ESLint flat config
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

**Server Components (Por Defecto):**
```tsx
// ✅ CORRECTO - Server Component por defecto
export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
}
```

**Client Components (Solo cuando sea necesario):**
```tsx
// ✅ CORRECTO - Client Component cuando se necesita interactividad
'use client';

import { useState } from 'react';

export default function InteractiveComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicks: {count}
    </button>
  );
}
```

### 2.4. Autenticación con Clerk

#### Estado Actual de la Implementación

**✅ IMPLEMENTADO COMPLETAMENTE:**
- ClerkProvider configurado en `src/app/layout.tsx`
- Middleware de protección en `src/middleware.ts`
- Rutas de autenticación: `/sign-in` y `/sign-up`
- Componentes: `AuthGuard`, `UserButton`
- Página de ejemplo protegida: `/dashboard`
- Demo interactivo: `/demo/auth`
- Documentación completa: `docs/guides/clerk-authentication-guide.md`

#### Configuración Básica

1. **ClerkProvider en el layout principal:**
```tsx
// app/layout.tsx
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

2. **Middleware de protección:**
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/courses/create(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});
```

3. **Rutas de autenticación:**
```tsx
// app/(auth)/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn appearance={{ /* personalización */ }} />
    </div>
  );
}
```

#### Componentes de Autenticación

1. **AuthGuard para proteger rutas:**
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
  
  if (!isLoaded) return <div>Cargando...</div>;
  if (!isSignedIn) {
    if (fallback) return <>{fallback}</>;
    redirect('/sign-in');
  }
  
  return <>{children}</>;
}
```

2. **UserButton personalizado:**
```tsx
// components/auth/user-button.tsx
import { UserButton as ClerkUserButton } from '@clerk/nextjs';

export function UserButton() {
  return (
    <ClerkUserButton 
      appearance={{
        elements: {
          avatarBox: 'h-8 w-8'
        }
      }}
      afterSignOutUrl="/"
    />
  );
}
```

#### Hooks de Autenticación

```tsx
// Hooks disponibles
import { useAuth, useUser } from '@clerk/nextjs';

// useAuth() - Estado de autenticación
const { isSignedIn, isLoaded, userId, signOut } = useAuth();

// useUser() - Información del usuario
const { user, isLoaded } = useUser();
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

#### Variables de Entorno Requeridas

```bash
# .env.local (OBLIGATORIO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```

#### Rutas Disponibles

- `/sign-in` - Página de inicio de sesión
- `/sign-up` - Página de registro
- `/dashboard` - Ejemplo de página protegida
- `/demo/auth` - Demo interactivo de autenticación

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

#### Documentación y Recursos

- **Guía completa:** `docs/guides/clerk-authentication-guide.md`
- **Demo interactivo:** `http://localhost:3000/demo/auth`
- **Reglas de codificación:** `.github/prompts/nextjs15-coding.prompt.md`

### 2.5. React Context (Implementaciones Actuales)

#### CourseContext
- **Ubicación:** `src/app/courses/[courseSlug]/context/`
- **Hook:** `useCourse()`
- **Propósito:** Compartir datos del curso entre componentes

#### ProfileContext
- **Ubicación:** `src/app/profile/[userId]/context/`
- **Hook:** `useProfile()`
- **Funcionalidades:** `toggleFavoriteCourse()`, `updateProfile()`

### 2.6. Testing Patterns

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