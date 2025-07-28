"use client";

import { useAuth, useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
// Iconos SVG simples para evitar problemas de dependencias
const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const KeyIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
  </svg>
);

const CodeBracketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

const DocumentTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CheckCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function AuthDemoPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [activeTab, setActiveTab] = useState<
    "overview" | "hooks" | "components" | "middleware" | "examples"
  >("overview");

  const handleLogout = () => {
    signOut({ redirectUrl: "/sign-in" });
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Demo de Autenticación con Clerk
              </h1>
              <p className="mt-2 text-gray-600">
                Explora cómo funciona la autenticación en Frontium Videos
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/docs/auth"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver Documentación
              </Link>
              {isSignedIn ? (
                <div className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-green-700 font-medium">
                    Autenticado
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                  <span className="text-red-700 font-medium">
                    No autenticado
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <UserIcon className="mr-3 h-5 w-5" />
                Estado Actual
              </button>
              <button
                onClick={() => setActiveTab("hooks")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "hooks"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <CodeBracketIcon className="mr-3 h-5 w-5" />
                Hooks de Clerk
              </button>
              <button
                onClick={() => setActiveTab("components")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "components"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <ShieldCheckIcon className="mr-3 h-5 w-5" />
                Componentes
              </button>
              <button
                onClick={() => setActiveTab("middleware")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "middleware"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <KeyIcon className="mr-3 h-5 w-5" />
                Middleware
              </button>
              <button
                onClick={() => setActiveTab("examples")}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "examples"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <DocumentTextIcon className="mr-3 h-5 w-5" />
                Casos de Uso
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="mt-8 p-4 bg-white rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                {!isSignedIn ? (
                  <>
                    <Link
                      href="/sign-in"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Iniciar Sesión
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <Link
                      href="/sign-up"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Registrarse
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/dashboard"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
                    >
                      Ir al Dashboard
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      Cerrar Sesión
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Estado Actual de Autenticación
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Authentication Status */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Estado de Autenticación
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Cargado:</span>
                          <span
                            className={`font-medium ${
                              isLoaded ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isLoaded ? "Sí" : "No"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Autenticado:</span>
                          <span
                            className={`font-medium ${
                              isSignedIn ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {isSignedIn ? "Sí" : "No"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* User Information */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Información del Usuario
                      </h3>
                      {isSignedIn && user ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">ID:</span>
                            <span className="font-mono text-sm text-gray-900">
                              {user.id.substring(0, 8)}...
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Nombre:</span>
                            <span className="font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium text-gray-900">
                              {user.emailAddresses[0]?.emailAddress}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          No hay información de usuario disponible
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Logout Demo */}
                  {isSignedIn && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Demostración de Logout
                      </h3>
                      <div className="border rounded-lg p-4 bg-red-50">
                        <p className="text-red-800 mb-4">
                          Haz clic en el botón para cerrar tu sesión actual. Serás redirigido a la página de inicio de sesión.
                        </p>
                        <button
                          onClick={handleLogout}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                          🚪 Cerrar Sesión Ahora
                        </button>
                        <div className="mt-4 p-3 bg-white rounded border">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Código utilizado:</strong>
                          </p>
                          <code className="text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded">
                            signOut({`{ redirectUrl: "/sign-in" }`})
                          </code>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Code Example */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Código de Ejemplo
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-green-400 text-sm">
                        {`'use client';

import { useAuth, useUser } from '@clerk/nextjs';

export function AuthStatus() {
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <p>Autenticado: {isSignedIn ? 'Sí' : 'No'}</p>
      {user && (
        <p>Usuario: {user.firstName} {user.lastName}</p>
      )}
    </div>
  );
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* Hooks Tab */}
              {activeTab === "hooks" && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Hooks de Clerk
                  </h2>

                  <div className="space-y-6">
                    {/* useAuth Hook */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        useAuth()
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Hook principal para obtener el estado de autenticación.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <pre className="text-sm text-gray-800">
                          {`const { 
  isSignedIn,     // ${isSignedIn}
  isLoaded,       // ${isLoaded}
  userId,         // ${user?.id || "null"}
  sessionId,      // string | null
  signOut         // function
} = useAuth();`}
                        </pre>
                      </div>
                    </div>

                    {/* useUser Hook */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        useUser()
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Hook para obtener información detallada del usuario.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <pre className="text-sm text-gray-800">
                          {`const { 
  user,           // User object
  isLoaded,       // ${isLoaded}
  isSignedIn      // ${isSignedIn}
} = useUser();

// user.firstName: "${user?.firstName || "N/A"}"
// user.lastName:  "${user?.lastName || "N/A"}"
// user.email:     "${user?.emailAddresses[0]?.emailAddress || "N/A"}"`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Components Tab */}
              {activeTab === "components" && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Componentes de Autenticación
                  </h2>

                  <div className="space-y-6">
                    {/* AuthGuard */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        AuthGuard - Protección en Cliente
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Componente para proteger rutas en Client Components.
                        Redirige automáticamente si no está autenticado.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`'use client';
import { AuthGuard } from '@/components/auth';

export default function ProtectedClientPage() {
  return (
    <AuthGuard 
      fallback={<div>Redirigiendo al login...</div>}
      redirectTo="/sign-in"
    >
      <div className="p-6">
        <h1>Dashboard Interactivo</h1>
        <button onClick={() => alert('Acción protegida')}>
          Acción que requiere autenticación
        </button>
      </div>
    </AuthGuard>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Server Component Protection */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Protección en Server Component
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Protección más eficiente en el servidor antes de
                        renderizar.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// Server Component (sin 'use client')
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  // Obtener datos del usuario de la BD
  const user = await getUserFromDatabase(userId);

  return (
    <div>
      <h1>Dashboard de {user.name}</h1>
      <p>Datos obtenidos de forma segura en el servidor</p>
    </div>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* UserButton */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        UserButton - Navegación Adaptativa
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Botón que se adapta automáticamente al estado de
                        autenticación.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`'use client';
import { UserButton } from '@/components/auth';

export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Frontium Videos</h1>
      {/* Se adapta automáticamente: */}
      {/* - Si está logueado: muestra avatar + menú */}
      {/* - Si no: muestra botones de login/registro */}
      <UserButton />
    </header>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Layout Protection */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Layout Protegido (Patrón Común)
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Proteger todas las páginas de una sección usando layout.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// app/dashboard/layout.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="dashboard-layout">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Middleware Tab */}
              {activeTab === "middleware" && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Middleware de Protección
                  </h2>

                  <div className="space-y-6">
                    {/* Basic Middleware */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Configuración Básica (Actual)
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Tu middleware actual protege todas las rutas por
                        defecto.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// middleware.ts (configuración actual)
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

// Esto hace que TODAS las rutas estén protegidas
// Recomendado: cambiar a protección selectiva`}
                        </pre>
                      </div>
                    </div>

                    {/* Advanced Middleware */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Configuración Recomendada (Selectiva)
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Protege solo las rutas que realmente lo necesitan.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// middleware.ts (recomendado)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define QUÉ rutas proteger (resto son públicas)
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',      // Dashboard y sub-rutas
  '/profile(.*)',        // Perfil y sub-rutas
  '/courses/create(.*)', // Crear cursos
  '/admin(.*)',          // Panel admin
  '/api/user/(.*)',      // APIs de usuario
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Solo protege las rutas específicas
  }
});

// Rutas PÚBLICAS (no necesitan login):
// /, /courses, /about, /sign-in, /sign-up, etc.`}
                        </pre>
                      </div>
                    </div>

                    {/* Role-based Protection */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Protección por Roles (Avanzado)
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Protege rutas basándose en roles específicos.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// middleware.ts (protección por roles)
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/', '/courses(.*)', '/about', '/contact'
]);

const isAdminRoute = createRouteMatcher([
  '/admin(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, has } = await auth();

  // Permitir rutas públicas
  if (isPublicRoute(req)) return;

  // Rutas admin requieren rol específico
  if (isAdminRoute(req)) {
    if (!userId || !has({ role: 'admin' })) {
      throw new Error('Acceso denegado: se requiere rol admin');
    }
    return;
  }

  // Resto de rutas requieren solo login
  await auth.protect();
});`}
                        </pre>
                      </div>
                    </div>

                    {/* Current Configuration Status */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        Estado Actual del Proyecto
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                          <div>
                            <p className="font-medium text-yellow-800">
                              Configuración Básica Activa
                            </p>
                            <p className="text-sm text-yellow-600">
                              Todas las rutas están protegidas por defecto
                            </p>
                          </div>
                          <div className="text-yellow-600">⚠️</div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">
                            Rutas que deberían ser públicas:
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              / (inicio)
                            </code>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              /courses (cursos)
                            </code>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              /about (acerca de)
                            </code>
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                              /contact (contacto)
                            </code>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-gray-900">
                            Rutas que deben estar protegidas:
                          </h4>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              <code className="text-xs bg-green-100 px-2 py-1 rounded">
                                /dashboard
                              </code>
                            </div>
                            <div className="flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              <code className="text-xs bg-green-100 px-2 py-1 rounded">
                                /profile
                              </code>
                            </div>
                            <div className="flex items-center">
                              <ShieldCheckIcon className="h-4 w-4 text-green-500 mr-2" />
                              <code className="text-xs bg-green-100 px-2 py-1 rounded">
                                /courses/create
                              </code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Examples Tab */}
              {activeTab === "examples" && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Casos de Uso Prácticos
                  </h2>

                  <div className="space-y-6">
                    {/* Dashboard Example */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        1. Dashboard de Usuario (Server Component)
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Página protegida que obtiene datos del usuario de forma
                        segura en el servidor.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// app/dashboard/page.tsx
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }

  // Obtener datos completos del usuario
  const user = await currentUser();
  
  // Obtener datos específicos de tu BD
  const userStats = await getUserStats(userId);

  return (
    <div className="p-6">
      <h1>¡Hola, {user?.firstName}!</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-blue-50 p-4 rounded">
          <h3>Cursos Completados</h3>
          <p className="text-2xl font-bold">{userStats.completed}</p>
        </div>
        <div className="bg-green-50 p-4 rounded">
          <h3>Horas de Estudio</h3>
          <p className="text-2xl font-bold">{userStats.hours}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded">
          <h3>Certificados</h3>
          <p className="text-2xl font-bold">{userStats.certificates}</p>
        </div>
      </div>
    </div>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Interactive Component */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        2. Componente Interactivo Protegido
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Client Component con interactividad que requiere
                        autenticación.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// components/CourseEnrollButton.tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { AuthGuard } from '@/components/auth';

interface CourseEnrollButtonProps {
  courseId: string;
  courseTitle: string;
}

function EnrollButton({ courseId, courseTitle }: CourseEnrollButtonProps) {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const { user } = useUser();

  const handleEnroll = async () => {
    setIsEnrolling(true);
    try {
      await fetch('/api/enroll', {
        method: 'POST',
        body: JSON.stringify({ courseId, userId: user?.id }),
      });
      alert(\`¡Te has inscrito a \${courseTitle}!\`);
    } catch (error) {
      alert('Error al inscribirse');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <button 
      onClick={handleEnroll} 
      disabled={isEnrolling}
      className="bg-blue-600 text-white px-6 py-2 rounded"
    >
      {isEnrolling ? 'Inscribiendo...' : 'Inscribirse al Curso'}
    </button>
  );
}

export function CourseEnrollButton(props: CourseEnrollButtonProps) {
  return (
    <AuthGuard fallback={
      <div className="text-center">
        <p className="mb-4">Debes iniciar sesión para inscribirte</p>
        <a href="/sign-in" className="text-blue-600">Iniciar Sesión</a>
      </div>
    }>
      <EnrollButton {...props} />
    </AuthGuard>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* API Route Protection */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        3. API Route Protegida
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Endpoint que requiere autenticación para acceder a datos
                        sensibles.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// app/api/user/profile/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'No autorizado' }, 
      { status: 401 }
    );
  }

  try {
    // Obtener datos del usuario de tu BD
    const profile = await getUserProfile(userId);
    
    return NextResponse.json({ profile });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error interno' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: 'No autorizado' }, 
      { status: 401 }
    );
  }

  const data = await request.json();
  
  // Actualizar perfil solo del usuario autenticado
  await updateUserProfile(userId, data);
  
  return NextResponse.json({ success: true });
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Conditional Navigation */}
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">
                        4. Navegación Condicional
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Menú que se adapta al estado de autenticación del
                        usuario.
                      </p>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm">
                          {`// components/Navigation.tsx
'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { UserButton } from '@/components/auth';
import Link from 'next/link';

export function Navigation() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center space-x-6">
        <Link href="/">Inicio</Link>
        <Link href="/courses">Cursos</Link>
        
        {/* Enlaces solo para usuarios autenticados */}
        {isSignedIn && (
          <>
            <Link href="/dashboard">Mi Dashboard</Link>
            <Link href="/profile">Mi Perfil</Link>
            {user?.publicMetadata?.role === 'admin' && (
              <Link href="/admin">Administración</Link>
            )}
          </>
        )}
      </div>

      {/* Botón de usuario adaptativo */}
      <UserButton />
    </nav>
  );
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Real-world Tips */}
                    <div className="border rounded-lg p-4 bg-blue-50">
                      <h3 className="text-lg font-medium text-blue-900 mb-3">
                        💡 Consejos Prácticos
                      </h3>
                      <div className="space-y-3 text-sm text-blue-800">
                        <div className="flex items-start">
                          <span className="font-medium mr-2">🔐</span>
                          <div>
                            <strong>Protección en el servidor:</strong> Usa
                            Server Components y la función <code>auth()</code>
                            siempre que sea posible. Es más seguro y eficiente.
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium mr-2">⚡</span>
                          <div>
                            <strong>Client Components:</strong> Úsalos solo
                            cuando necesites interactividad. Para datos
                            estáticos, Server Components son mejores.
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium mr-2">🛡️</span>
                          <div>
                            <strong>Middleware selectivo:</strong> No protejas
                            todas las rutas. Define específicamente qué rutas
                            necesitan autenticación.
                          </div>
                        </div>
                        <div className="flex items-start">
                          <span className="font-medium mr-2">🔄</span>
                          <div>
                            <strong>Loading states:</strong> Siempre maneja el
                            estado <code>isLoaded</code>
                            para evitar parpadeos en la UI.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
