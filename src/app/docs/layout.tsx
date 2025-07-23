import Link from 'next/link';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-2xl font-bold text-gray-900 hover:text-gray-700"
              >
                Frontium Videos
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600 font-medium">Documentación</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/demo/auth"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Demo Interactivo
              </Link>
              <Link
                href="/dashboard"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Documentación
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/docs/auth"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🔐 Autenticación con Clerk
                  </Link>
                  <Link
                    href="/docs/context7"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🤖 Context7 Usage
                  </Link>
                  <Link
                    href="/docs/components"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🧩 Componentes
                  </Link>
                  <Link
                    href="/docs/deployment"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🚀 Deployment
                  </Link>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Demos
                </h3>
                <div className="space-y-2">
                  <Link
                    href="/demo/auth"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🔐 Demo de Autenticación
                  </Link>
                  <Link
                    href="/tutorial/context"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    📚 Tutorial de Context
                  </Link>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Enlaces Útiles
                </h3>
                <div className="space-y-2">
                  <a
                    href="https://clerk.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    📖 Docs de Clerk ↗
                  </a>
                  <a
                    href="https://nextjs.org/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    ⚡ Docs de Next.js ↗
                  </a>
                  <a
                    href="https://tailwindcss.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    🎨 Docs de Tailwind ↗
                  </a>
                </div>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
