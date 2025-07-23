import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp 
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
      path="/sign-up"
      signInUrl="/sign-in"
    />
  )
}
