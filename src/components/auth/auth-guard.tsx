'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  redirectTo?: string
}

/**
 * Componente que protege rutas requiriendo autenticación
 * Redirige automáticamente a la página de login si el usuario no está autenticado
 */
export function AuthGuard({ 
  children, 
  fallback = <div>Cargando...</div>,
  redirectTo = '/sign-in'
}: AuthGuardProps) {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(redirectTo)
    }
  }, [isLoaded, isSignedIn, router, redirectTo])

  // Mostrar loading mientras se carga la información de autenticación
  if (!isLoaded) {
    return <>{fallback}</>
  }

  // Si no está autenticado, mostrar fallback mientras redirige
  if (!isSignedIn) {
    return <>{fallback}</>
  }

  // Usuario autenticado, mostrar contenido protegido
  return <>{children}</>
}
