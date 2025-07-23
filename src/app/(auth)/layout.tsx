import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Autenticación - Frontium Videos',
  description: 'Inicia sesión o regístrate en Frontium Videos',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Frontium Videos</h1>
          <p className="mt-2 text-lg text-gray-600">
            Tu plataforma de aprendizaje en línea
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
