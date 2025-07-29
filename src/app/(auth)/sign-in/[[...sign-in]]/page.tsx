import { SignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import { LogoutButton } from '@/components/auth/logout-button'

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <div className="w-full">
          <SignIn 
            appearance={{
              elements: {
                rootBox: 'w-full mx-auto flex flex-col items-center',
                card: '!bg-transparent !shadow-none !border-none w-full mx-auto max-w-md !backdrop-blur-0',
                main: '!bg-transparent !shadow-none !border-none',
                formButtonPrimary: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm normal-case w-full mx-auto font-medium transition-all duration-200 shadow-lg hover:shadow-xl !border-none',
                headerTitle: 'text-2xl font-bold text-white text-center w-full mx-auto mb-2',
                headerSubtitle: 'text-gray-300 text-center w-full mx-auto mb-6',
                socialButtonsBlockButton: '!bg-white/10 !border !border-white/20 hover:!bg-white/20 !text-white mx-auto flex justify-center backdrop-blur-sm transition-all duration-200 hover:shadow-lg',
                socialButtonsBlockButtonText: '!text-white font-medium',
                formFieldInput: '!bg-white/10 !border !border-white/20 focus:!border-purple-400 focus:!ring-purple-400/50 w-full !text-white !placeholder-gray-300 backdrop-blur-sm transition-all duration-200',
                formFieldLabel: '!text-gray-200 font-medium',
                footerActionLink: '!text-purple-300 hover:!text-purple-200 text-center font-medium transition-colors duration-200',
                dividerLine: '!bg-white/20',
                dividerText: '!text-gray-300',
                formFieldInputShowPasswordButton: '!text-gray-300 hover:!text-white',
                formFieldAction: '!text-purple-300 hover:!text-purple-200',
                identityPreviewText: '!text-gray-300',
                identityPreviewEditButton: '!text-purple-300 hover:!text-purple-200',
                footer: '!bg-transparent',
                formContainer: '!bg-transparent !shadow-none',
                form: '!bg-transparent',
                socialButtonsContainer: '!bg-transparent',
                formFieldRow: '!bg-transparent',
                formField: '!bg-transparent'
              },
              layout: {
                socialButtonsPlacement: 'top'
              },
              variables: {
                colorBackground: 'transparent',
                colorInputBackground: 'rgba(255, 255, 255, 0.1)',
                colorInputText: '#ffffff',
                colorText: '#ffffff',
                colorTextSecondary: '#d1d5db',
                colorPrimary: '#8b5cf6',
                borderRadius: '0.75rem'
              }
            }}
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
          />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-full rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 text-center shadow-2xl">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">¡Sesión Activa!</h1>
            <p className="text-gray-300">
              Ya tienes una sesión iniciada. Puedes continuar navegando o cerrar la sesión actual.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Link 
              href="/dashboard"
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-purple-700 hover:to-blue-700 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Ir al Dashboard
            </Link>
            <LogoutButton 
              variant="outline" 
              className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </LogoutButton>
          </div>
        </div>
      </SignedIn>
    </>
  )
}
