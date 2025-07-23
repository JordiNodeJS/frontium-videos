import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <SignUp 
      appearance={{
        elements: {
          rootBox: 'w-full mx-auto flex flex-col items-center',
          card: 'shadow-lg border border-gray-200 w-full mx-auto max-w-400',
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-sm normal-case w-full mx-auto',
          headerTitle: 'text-2xl font-bold text-gray-900 text-center w-full mx-auto',
          headerSubtitle: 'text-gray-600 text-center w-full mx-auto',
          socialButtonsBlockButton: 'border border-gray-300 hover:bg-gray-50 mx-auto flex justify-center',
          formFieldInput: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full',
          footerActionLink: 'text-blue-600 hover:text-blue-700 text-center'
        }
      }}
      routing="path"
      path="/sign-up"
      signInUrl="/sign-in"
    />
  )
}
