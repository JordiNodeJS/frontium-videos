import Link from 'next/link';

export default function AuthDocumentationPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Documentación de Autenticación con Clerk
        </h1>
        <p className="text-xl text-gray-600">
          Guía completa para implementar autenticación en Frontium Videos
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2>📋 Tabla de Contenidos</h2>
        <ul>
          <li><a href="#setup">Configuración Inicial</a></li>
          <li><a href="#components">Componentes de Autenticación</a></li>
          <li><a href="#logout">Implementación de Logout</a></li>
          <li><a href="#middleware">Middleware de Protección</a></li>
          <li><a href="#hooks">Hooks Disponibles</a></li>
          <li><a href="#examples">Ejemplos de Uso</a></li>
          <li><a href="#troubleshooting">Solución de Problemas</a></li>
        </ul>

        <h2 id="setup">⚙️ Configuración Inicial</h2>
        <p>
          Clerk está configurado en este proyecto para proporcionar autenticación completa 
          con Next.js 15 y App Router.
        </p>

        <h3>Variables de Entorno</h3>
        <p>Configura las siguientes variables en tu archivo <code>.env.local</code>:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`}
          </pre>
        </div>

        <h3>Configuración del ClerkProvider</h3>
        <p>El ClerkProvider está configurado en <code>src/app/layout.tsx</code>:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}`}
          </pre>
        </div>

        <h2 id="components">🧩 Componentes de Autenticación</h2>
        
        <h3>AuthGuard</h3>
        <p>Componente para proteger rutas que requieren autenticación:</p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">Uso:</h4>
          <pre className="text-sm text-blue-800">
{`import { AuthGuard } from '@/components/auth';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <h1>Contenido protegido</h1>
      <p>Solo usuarios autenticados pueden ver esto</p>
    </AuthGuard>
  );
}`}
          </pre>
        </div>

        <h3>UserButton</h3>
        <p>Botón de usuario que se adapta al estado de autenticación:</p>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Uso:</h4>
          <pre className="text-sm text-green-800">
{`import { UserButton } from '@/components/auth';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Frontium Videos</h1>
      <UserButton />
    </header>
  );
}`}
          </pre>
        </div>

        <div className="bg-green-100 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-green-900 mb-2">Características del UserButton:</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• <strong>Logout automático:</strong> Incluye opción de cerrar sesión en el menú desplegable</li>
            <li>• <strong>Perfil de usuario:</strong> Acceso directo a la configuración del perfil</li>
            <li>• <strong>Adaptativo:</strong> Muestra botones de login/registro cuando no hay sesión activa</li>
            <li>• <strong>Personalizable:</strong> Estilos adaptados al diseño de Frontium Videos</li>
          </ul>
        </div>

        <h2 id="logout">🚪 Implementación de Logout</h2>
        
        <h3>Botón de Logout Personalizado</h3>
        <p>Si necesitas un botón de logout personalizado, puedes usar el hook <code>useClerk()</code>:</p>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Implementación:</h4>
          <pre className="text-sm text-purple-800">
{`import { useClerk } from '@clerk/nextjs';

export function CustomLogoutButton() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({
      redirectUrl: '/sign-in' // Redirige a la página de inicio de sesión
    });
  };

  return (
    <button 
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
    >
      Cerrar Sesión
    </button>
  );
}`}
          </pre>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-purple-900 mb-2">Opciones de signOut:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• <code>redirectUrl</code>: URL de redirección después del logout</li>
            <li>• <code>sessionId</code>: ID de sesión específica a cerrar (para multi-sesión)</li>
            <li>• Sin parámetros: Cierra sesión y permanece en la página actual</li>
          </ul>
        </div>

        <h2 id="middleware">🛡️ Middleware de Protección</h2>
        <p>El middleware está configurado en <code>src/middleware.ts</code> para proteger rutas automáticamente:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/profile(.*)',
  '/admin(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};`}
          </pre>
        </div>

        <h2 id="hooks">🪝 Hooks Disponibles</h2>
        
        <h3>useUser</h3>
        <p>Hook para acceder a la información del usuario:</p>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <pre className="text-sm text-purple-800">
{`import { useUser } from '@clerk/nextjs';

function UserProfile() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) return <div>Cargando...</div>;
  if (!isSignedIn) return <div>No autenticado</div>;

  return <div>Hola {user.firstName}!</div>;
}`}
          </pre>
        </div>

        <h3>useAuth</h3>
        <p>Hook para acceder al estado de autenticación:</p>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <pre className="text-sm text-orange-800">
{`import { useAuth } from '@clerk/nextjs';

function AuthStatus() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  if (!isLoaded) return <div>Cargando...</div>;
  
  return (
    <div>
      <p>Usuario ID: {userId}</p>
      <p>Sesión ID: {sessionId}</p>
    </div>
  );
}`}
          </pre>
        </div>

        <h2 id="examples">💡 Ejemplos de Uso</h2>
        
        <h3>Página Protegida Simple</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// src/app/dashboard/page.tsx
import { AuthGuard } from '@/components/auth';

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p>Bienvenido a tu dashboard personal.</p>
      </div>
    </AuthGuard>
  );
}`}
          </pre>
        </div>

        <h3>Componente con Información del Usuario</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`import { useUser } from '@clerk/nextjs';

export default function WelcomeMessage() {
  const { user } = useUser();

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h2>¡Hola {user?.firstName}!</h2>
      <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
    </div>
  );
}`}
          </pre>
        </div>

        <h2 id="troubleshooting">🔧 Solución de Problemas</h2>
        
        <h3>Error: "ClerkProvider not found"</h3>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-800 mb-2"><strong>Problema:</strong> El componente no puede acceder al contexto de Clerk.</p>
          <p className="text-red-800"><strong>Solución:</strong> Asegúrate de que ClerkProvider esté configurado en el layout raíz.</p>
        </div>

        <h3>Error: "Invalid publishable key"</h3>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-800 mb-2"><strong>Problema:</strong> La clave pública de Clerk no es válida.</p>
          <p className="text-red-800"><strong>Solución:</strong> Verifica que NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY esté correctamente configurada.</p>
        </div>

        <h3>Redirecciones Incorrectas</h3>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-800 mb-2"><strong>Problema:</strong> Los usuarios no son redirigidos correctamente después del login.</p>
          <p className="text-yellow-800"><strong>Solución:</strong> Configura las URLs de redirección en las variables de entorno.</p>
        </div>

        <h2>🔗 Enlaces Útiles</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-blue-600">
            <li>
              <a href="https://clerk.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                Documentación oficial de Clerk ↗
              </a>
            </li>
            <li>
              <a href="https://github.com/clerkinc/clerk-nextjs-examples" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                Ejemplos de Next.js con Clerk ↗
              </a>
            </li>
            <li>
              <Link href="/demo/auth" className="hover:text-blue-700">
                Demo Interactivo de Autenticación
              </Link>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>💡 Tip:</strong> Visita el <Link href="/demo/auth" className="text-green-600 hover:text-green-700 font-medium">demo interactivo</Link> para 
                explorar todas las funcionalidades de autenticación implementadas en este proyecto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
