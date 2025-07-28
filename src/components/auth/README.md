# Componentes de Autenticación - Frontium Videos

## 📋 Componentes Disponibles

### AuthGuard
Componente para proteger rutas y mostrar contenido solo a usuarios autenticados.

```tsx
import { AuthGuard } from '@/components/auth';

export default function ProtectedPage() {
  return (
    <AuthGuard fallback={<div>Debes iniciar sesión</div>}>
      <div>Contenido protegido</div>
    </AuthGuard>
  );
}
```

**Props:**
- `children`: Contenido a mostrar si el usuario está autenticado
- `fallback?`: Componente a mostrar si no está autenticado (opcional)
- `redirectTo?`: URL de redirección (por defecto: `/sign-in`)

### UserButton
Botón de usuario que muestra avatar y menú desplegable con opciones de perfil.

```tsx
import { UserButton } from '@/components/auth';

export function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1>Mi App</h1>
      <UserButton />
    </header>
  );
}
```

## 🔧 Hooks de Clerk

### useAuth()
Hook principal para obtener el estado de autenticación.

```tsx
import { useAuth } from '@clerk/nextjs';

const { 
  isSignedIn,     // boolean - Si el usuario está autenticado
  isLoaded,       // boolean - Si los datos se han cargado
  userId,         // string | null - ID del usuario
  sessionId,      // string | null - ID de la sesión
  signOut         // function - Función para cerrar sesión
} = useAuth();
```

### useUser()
Hook para obtener información detallada del usuario.

```tsx
import { useUser } from '@clerk/nextjs';

const { 
  user,           // User object - Objeto completo del usuario
  isLoaded,       // boolean - Si los datos se han cargado
  isSignedIn      // boolean - Si el usuario está autenticado
} = useUser();

// Propiedades del usuario:
// user.firstName, user.lastName, user.emailAddresses, etc.
```

## 🛡️ Server Components

Para Server Components, usa las funciones de servidor de Clerk:

```tsx
import { auth, currentUser } from '@clerk/nextjs/server';

// Obtener solo el ID del usuario
export default async function Page() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <div>Usuario: {userId}</div>;
}

// Obtener información completa del usuario
export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }
  
  return (
    <div>
      <h1>Hola, {user.firstName}!</h1>
      <p>{user.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}
```

## 🎨 Personalización

### Tema Personalizado
Los componentes de Clerk se pueden personalizar usando el prop `appearance`:

```tsx
import { SignIn } from '@clerk/nextjs';

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

export default function SignInPage() {
  return <SignIn appearance={clerkAppearance} />;
}
```

## 🚀 Ejemplos de Uso

### Página Protegida Completa
```tsx
'use client';

import { AuthGuard } from '@/components/auth';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}

function DashboardContent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Dashboard de {user?.firstName}</h1>
      <p>Bienvenido a tu panel de control</p>
    </div>
  );
}
```

### Navegación Condicional
```tsx
'use client';

import { useAuth } from '@clerk/nextjs';
import { UserButton } from '@/components/auth';
import Link from 'next/link';

export function Navigation() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/" className="text-xl font-bold">
        Frontium Videos
      </Link>
      
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/courses">Cursos</Link>
            <UserButton />
          </>
        ) : (
          <>
            <Link href="/sign-in">Iniciar Sesión</Link>
            <Link href="/sign-up">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}
```

## 📚 Recursos Adicionales

- **Demo Interactivo:** [http://localhost:3000/demo/auth](http://localhost:3000/demo/auth)
- **Guía Completa:** `docs/guides/clerk-authentication-guide.md`
- **Documentación de Clerk:** [https://clerk.com/docs](https://clerk.com/docs)
- **Reglas del Proyecto:** `.github/prompts/nextjs15-coding.prompt.md`

## 🔧 Variables de Entorno

Asegúrate de configurar estas variables en tu archivo `.env.local`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard
```
