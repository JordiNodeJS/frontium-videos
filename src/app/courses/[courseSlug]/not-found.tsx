import Link from "next/link";

export const metadata = {
  title: "Página no encontrada | Frontium Videos",
  description: "La página que buscas no existe en nuestra sección de cursos",
};

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Curso no encontrado
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Lo sentimos, el curso o página que buscas no existe. Puede que haya
            sido movido, eliminado o que hayas escrito mal la URL.
          </p>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="space-y-4 mb-12">
          <Link
            href="/courses"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium mr-4"
          >
            Ver todos los cursos
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Ir al inicio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Categorías populares</h3>
            <div className="space-y-2">
              <Link
                href="/courses/web"
                className="block text-blue-600 hover:text-blue-800"
              >
                Desarrollo Web
              </Link>
              <Link
                href="/courses/react"
                className="block text-blue-600 hover:text-blue-800"
              >
                React & Next.js
              </Link>
              <Link
                href="/courses/javascript"
                className="block text-blue-600 hover:text-blue-800"
              >
                JavaScript Avanzado
              </Link>
            </div>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">¿Necesitas ayuda?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Si crees que esto es un error, contáctanos y te ayudaremos.
            </p>
            <Link
              href="/contact"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Contactar soporte →
            </Link>
          </div>

          <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Buscar cursos</h3>
            <p className="text-sm text-gray-600 mb-3">
              Usa nuestra búsqueda para encontrar el curso perfecto para ti.
            </p>
            <Link
              href="/courses?search=true"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Buscar cursos →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
