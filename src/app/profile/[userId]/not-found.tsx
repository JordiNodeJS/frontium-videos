import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center max-w-2xl mx-auto px-4">
      <div className="text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {/* Error message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Usuario no encontrado
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          El perfil que buscas no existe o ha sido eliminado.
        </p>

        <div className="text-gray-500 mb-8">
          <p>Posibles causas:</p>
          <ul className="mt-2 text-sm space-y-1">
            <li>• El ID del usuario es incorrecto</li>
            <li>• El usuario ha desactivado su perfil</li>
            <li>• El enlace que seguiste está roto</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Ver perfiles
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir al inicio
          </Link>
        </div>

        {/* Help text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            ¿Problemas?{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-500">
              Contáctanos
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}