import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseDetails } from "../lib/getCourseDetails";

export const metadata = {
  title: "Inscripción al Curso | Frontium Videos",
  description: "Completa tu inscripción y comienza a aprender hoy mismo.",
};

export default async function CourseEnrollPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = await getCourseDetails(courseSlug);

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons, 0);
  const discountPrice = course.price * 0.8; // 20% discount

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/courses/${courseSlug}`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Volver al curso
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Inscríbete a {course.title}
            </h1>

            {/* Special Offer */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-semibold text-green-800">Oferta por Tiempo Limitado</span>
              </div>
              <p className="text-green-700 text-sm">
                Obtén un 20% de descuento en tu inscripción. Esta oferta expira en 48 horas.
              </p>
            </div>

            {/* Enrollment Form */}
            <form className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Información Personal</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Información de Pago</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Vencimiento
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        placeholder="MM/AA"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  Acepto los{" "}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                    términos y condiciones
                  </Link>{" "}
                  y la{" "}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                    política de privacidad
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Inscribirse por ${discountPrice.toFixed(2)}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Resumen del Curso</h3>
            
            <div className="space-y-3 mb-6">
              <h4 className="font-medium text-gray-900">{course.title}</h4>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 text-yellow-400 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{course.rating} • {course.students} estudiantes</span>
              </div>
              <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm">
                <span>Módulos:</span>
                <span>{course.modules.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Lecciones:</span>
                <span>{totalLessons}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duración:</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Nivel:</span>
                <span>{course.level}</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Precio original:</span>
                <span className="line-through text-gray-500">${course.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Descuento (20%):</span>
                <span className="text-green-600">-${(course.price - discountPrice).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">${discountPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Lo que incluye:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Acceso de por vida</li>
                <li>✓ Certificado de finalización</li>
                <li>✓ Soporte del instructor</li>
                <li>✓ Actualizaciones gratuitas</li>
                <li>✓ Acceso móvil</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <Link
                href={`/courses/${courseSlug}/preview`}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver vista previa del curso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-8 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 text-green-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <span>
            Pago seguro protegido con cifrado SSL. Garantía de devolución de 30 días.
          </span>
        </div>
      </div>
    </div>
  );
} 