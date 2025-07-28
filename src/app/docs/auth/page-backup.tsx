import Link from 'next/link';

export default function AuthDocumentationPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Documentación de Autenticación con Clerk
        </h1>
        <p className="text-xl text-gray-600">
          Guía completa para implementar autenticación en Frontium Videos
        </p>
      </div>

      {/* Content */}
          <div className="prose prose-lg max-w-none">
            <h2>📋 Tabla de Contenidos</h2>
            <ul>
              <li><a href="#introduccion">Introducción</a></li>
              <li><a href="#configuracion">Configuración Inicial</a></li>
              <li><a href="#estructura">Estructura de Archivos</a></li>
              <li><a href="#implementacion">Implementación Paso a Paso</a></li>
              <li><a href="#componentes">Componentes de Autenticación</a></li>
              <li><a href="#rutas-protegidas">Rutas Protegidas</a></li>
              <li><a href="#personalizacion">Personalización</a></li>
              <li><a href="#mejores-practicas">Mejores Prácticas</a></li>
              <li><a href="#troubleshooting">Troubleshooting</a></li>
            </ul>

            <h2 id="introduccion">Introducción</h2>
            <p>
              Clerk es una plataforma de autenticación completa que proporciona componentes 
              pre-construidos, hooks y APIs para manejar la autenticación de usuarios en 
              aplicaciones web modernas. En Frontium Videos, utilizamos Clerk para gestionar 
              el registro, inicio de sesión y protección de rutas.
            </p>

            <h3>¿Por qué Clerk?</h3>
            <ul>
              <li><strong>Componentes UI listos:</strong> Formularios de login/registro pre-diseñados</li>
              <li><strong>Múltiples proveedores:</strong> Google, GitHub, Discord, etc.</li>
              <li><strong>Seguridad robusta:</strong> Manejo automático de tokens y sesiones</li>
              <li><strong>Personalización:</strong> Temas y estilos adaptables</li>
              <li><strong>TypeScript nativo:</strong> Soporte completo para TypeScript</li>
            </ul>

            <h2 id="configuracion">Configuración Inicial</h2>
            
            <h3>1. Instalación</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              pnpm add @clerk/nextjs
            </div>

            <h3>2. Variables de Entorno</h3>
            <p>Crea un archivo <code>.env.local</code> con las siguientes variables:</p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard`}
            </div>

            <h3>3. Configuración del Dashboard de Clerk</h3>
            <ol>
              <li>Ve a <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">clerk.com</a> y crea una cuenta</li>
              <li>Crea una nueva aplicación</li>
              <li>Configura los dominios permitidos:
                <ul>
                  <li><code>http://localhost:3000</code> (desarrollo)</li>
                  <li>Tu dominio de producción</li>
                </ul>
              </li>
              <li>Copia las claves API a tu archivo <code>.env.local</code></li>
            </ol>

            <h2 id="estructura">Estructura de Archivos</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`src/
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
    └── auth.ts                # Tipos de autenticación`}
            </div>

            <h2 id="implementacion">Implementación Paso a Paso</h2>
            
            <h3>Paso 1: Configurar el ClerkProvider</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/app/layout.tsx
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
}`}
            </div>

            <h3>Paso 2: Configurar el Middleware</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/middleware.ts
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
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};`}
            </div>

            <h2 id="componentes">Componentes de Autenticación</h2>
            
            <h3>AuthGuard Component</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/components/auth/auth-guard.tsx
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
}`}
            </div>

            <h2 id="rutas-protegidas">Rutas Protegidas</h2>
            
            <h3>Server Components</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/app/dashboard/page.tsx
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
}`}
            </div>

            <h3>Client Components</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/app/profile/page.tsx
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
}`}
            </div>

            <h2 id="mejores-practicas">Mejores Prácticas</h2>
            
            <h3>1. Manejo de Estados de Carga</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`'use client';

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
}`}
            </div>

            <h3>2. Hooks Personalizados</h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// src/hooks/use-auth-redirect.ts
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
}`}
            </div>

            <h2 id="troubleshooting">Troubleshooting</h2>
            
            <h3>Problemas Comunes</h3>
            
            <h4>1. Error: "Clerk: Missing publishable key"</h4>
            <p><strong>Solución:</strong></p>
            <ul>
              <li>Verifica que <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> esté en <code>.env.local</code></li>
              <li>Reinicia el servidor de desarrollo después de agregar variables de entorno</li>
            </ul>

            <h4>2. Redirección infinita en rutas protegidas</h4>
            <p><strong>Solución:</strong></p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// Asegúrate de que las rutas de auth no estén en isProtectedRoute
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // NO incluir '/sign-in' o '/sign-up'
]);`}
            </div>

            <h4>3. Estilos no aplicándose correctamente</h4>
            <p><strong>Solución:</strong></p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              {`// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@clerk/nextjs/**/*.js', // Agregar esta línea
  ],
  // ...
};`}
            </div>

            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                🎯 URLs Importantes
              </h3>
              <ul className="space-y-2 text-blue-800">
                <li><strong>Demo:</strong> <Link href="/demo/auth" className="text-blue-600 hover:text-blue-700">/demo/auth</Link></li>
                <li><strong>Sign In:</strong> <Link href="/sign-in" className="text-blue-600 hover:text-blue-700">/sign-in</Link></li>
                <li><strong>Sign Up:</strong> <Link href="/sign-up" className="text-blue-600 hover:text-blue-700">/sign-up</Link></li>
                <li><strong>Dashboard:</strong> <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">/dashboard</Link></li>
                <li><strong>Clerk Dashboard:</strong> <a href="https://dashboard.clerk.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">dashboard.clerk.com</a></li>
              </ul>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                📚 Recursos Adicionales
              </h3>
              <ul className="space-y-2 text-green-800">
                <li><a href="https://clerk.com/docs" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">Documentación oficial de Clerk</a></li>
                <li><a href="https://github.com/clerkinc/clerk-nextjs-examples" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">Ejemplos de Next.js con Clerk</a></li>
                <li><a href="https://clerk.com/docs/upgrade-guides" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700">Guía de migración</a></li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
}
