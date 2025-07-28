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
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Frontium Videos
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Tu plataforma de aprendizaje en línea
          </p>
        </div>

        {children}
      </div>
    </main>
  )
}
