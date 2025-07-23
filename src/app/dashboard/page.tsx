import { AuthGuard, UserButton } from '@/components/auth'
import { currentUser } from '@clerk/nextjs/server'

export default async function DashboardPage() {
  const user = await currentUser()

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard - Frontium Videos
                </h1>
              </div>
              <UserButton />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  ¡Bienvenido, {user?.firstName || 'Usuario'}!
                </h2>
                <p className="text-gray-600 mb-6">
                  Esta es una página protegida que solo pueden ver los usuarios autenticados.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      Mis Cursos
                    </h3>
                    <p className="text-blue-700">
                      Accede a todos tus cursos matriculados
                    </p>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900 mb-2">
                      Progreso
                    </h3>
                    <p className="text-green-700">
                      Revisa tu progreso de aprendizaje
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">
                      Certificados
                    </h3>
                    <p className="text-purple-700">
                      Descarga tus certificados obtenidos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
