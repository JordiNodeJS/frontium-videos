'use client'

import { UserButton as ClerkUserButton, useAuth } from '@clerk/nextjs'
import Link from 'next/link'

/**
 * Componente que muestra el botón de usuario o el enlace de login
 * Se adapta automáticamente según el estado de autenticación
 */
export function UserButton() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return (
      <ClerkUserButton 
        appearance={{
          elements: {
            avatarBox: 'w-8 h-8',
            userButtonPopoverCard: 'shadow-lg border border-gray-200',
            userButtonPopoverActionButton: 'hover:bg-gray-50',
          }
        }}
        afterSignOutUrl="/"
      />
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link 
        href="/sign-in"
        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        Iniciar sesión
      </Link>
      <Link 
        href="/sign-up"
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors"
      >
        Registrarse
      </Link>
    </div>
  )
}
