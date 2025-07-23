import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { LogoutButton } from '@/components/auth/logout-button'

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <SignIn 
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'shadow-lg border border-gray-200 w-full',
              formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case',
              headerTitle: 'text-2xl font-bold text-gray-900',
              headerSubtitle: 'text-gray-600',
              socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50',
              formFieldInput: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
              footerActionLink: 'text-blue-600 hover:text-blue-700'
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
        />
      </SignedOut>
      <SignedIn>
        <div className="w-full rounded-lg border border-gray-200 bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900">Ya has iniciado sesión</h1>
          <p className="mt-4 text-gray-600">
            Parece que ya tienes una sesión activa. Puedes continuar a tu panel de control o cerrar la sesión actual.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4">
            <Link 
              href="/dashboard"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Ir al Dashboard
            </Link>
            <LogoutButton variant="outline" className="w-full">
              Cerrar Sesión
            </LogoutButton>
          </div>
        </div>
      </SignedIn>
    </>
  )
}
