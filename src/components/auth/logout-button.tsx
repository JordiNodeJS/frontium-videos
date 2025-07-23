'use client'

import { useClerk, useAuth } from '@clerk/nextjs'

interface LogoutButtonProps {
  variant?: 'default' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  redirectUrl?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Botón de logout personalizado con diferentes variantes de estilo
 * Utiliza el hook useClerk() para manejar el cierre de sesión
 */
export function LogoutButton({ 
  variant = 'default',
  size = 'md',
  redirectUrl = '/sign-in',
  className = '',
  children = 'Cerrar Sesión'
}: LogoutButtonProps) {
  const { signOut } = useClerk()
  const { isSignedIn } = useAuth()

  // No mostrar el botón si el usuario no está autenticado
  if (!isSignedIn) {
    return null
  }

  const handleLogout = async () => {
    try {
      await signOut({ redirectUrl })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // Estilos base según la variante
  const baseStyles = 'font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantStyles = {
    default: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-blue-500'
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <button 
      onClick={handleLogout}
      className={buttonClasses}
      type="button"
    >
      {children}
    </button>
  )
}
