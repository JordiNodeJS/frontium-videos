import LoginForm from "@/components/auth/login-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Iniciar sesión</h1>
          <p className="mt-2 text-sm text-gray-500">
            Introduce tus credenciales para acceder a tu cuenta
          </p>
        </div>

        <div className="mt-8 bg-white p-6 shadow-md rounded-lg border border-gray-200">
          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <p>
              ¿No tienes cuenta?{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
