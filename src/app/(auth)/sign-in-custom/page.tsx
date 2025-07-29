'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function CustomSignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLoaded) return

    setIsLoading(true)
    setError('')

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        // Handle other states like MFA if necessary
        console.log(result)
        setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.')
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || 'Las credenciales son incorrectas. Inténtalo de nuevo.'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1 className='text-2xl font-bold text-white text-center w-full mx-auto mb-2'>Iniciar Sesión (Custom)</h1>
        <p className='text-gray-300 text-center w-full mx-auto mb-6'>Accede a tu cuenta de Frontium Videos.</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 text-sm rounded-lg p-3 text-center">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-gray-200 font-medium mb-2 block">Email</label>
          <input
            id="email"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            className="!bg-white/10 !border !border-white/20 focus:!border-purple-400 focus:!ring-purple-400/50 w-full !text-white !placeholder-gray-400 backdrop-blur-sm transition-all duration-200 rounded-lg p-3"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="text-gray-200 font-medium mb-2 block">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="!bg-white/10 !border !border-white/20 focus:!border-purple-400 focus:!ring-purple-400/50 w-full !text-white !placeholder-gray-400 backdrop-blur-sm transition-all duration-200 rounded-lg p-3"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm normal-case w-full mx-auto font-medium transition-all duration-200 shadow-lg hover:shadow-xl !border-none rounded-lg p-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>

        <div className="text-center mt-4">
            <Link href="/sign-up" className="text-purple-300 hover:text-purple-200 text-center font-medium transition-colors duration-200">
              ¿No tienes cuenta? Regístrate
            </Link>
        </div>
      </form>
    </div>
  )
}
