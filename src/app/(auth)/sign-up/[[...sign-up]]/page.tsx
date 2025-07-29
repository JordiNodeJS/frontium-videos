import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className="w-full">
      <SignUp 
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
            formFieldSuccessText: '!text-green-300',
            formFieldErrorText: '!text-red-300',
            formFieldWarningText: '!text-yellow-300',
            formFieldHintText: '!text-gray-400',
            formResendCodeLink: '!text-purple-300 hover:!text-purple-200',
            otpCodeFieldInput: '!bg-white/10 !border !border-white/20 focus:!border-purple-400 !text-white text-center',
            formFieldRadioInput: '!text-purple-400',
            formFieldCheckboxInput: '!text-purple-400',
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
        path="/sign-up"
        signInUrl="/sign-in"
      />
    </div>
  )
}
