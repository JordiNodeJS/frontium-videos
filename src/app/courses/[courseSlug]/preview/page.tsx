import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseDetails } from "../lib/getCourseDetails";

export const metadata = {
  title: "Vista Previa del Curso | Frontium Videos",
  description: "Obtén una vista previa gratuita del curso antes de inscribirte.",
};

export default async function CoursePreviewPage({
  params,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await params;
  const course = await getCourseDetails(courseSlug);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
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

      {/* Course Info */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-lg text-gray-600">Vista Previa Gratuita</p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              {course.duration}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
              ⭐ {course.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-700 text-center mb-6">{course.description}</p>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>
        </div>
      </div>

      {/* Preview Content */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Contenido de Vista Previa</h2>
        
        {/* Video Preview Placeholder */}
        <div className="bg-gray-100 rounded-lg mb-6 relative" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-600 font-medium">Video de Vista Previa</p>
              <p className="text-sm text-gray-500">Introducción al curso (5 min)</p>
            </div>
          </div>
        </div>

        {/* Free Topics */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Lo que incluye esta vista previa:</h3>
          <ul className="space-y-2">
            {course.topics.slice(0, 2).map((topic) => (
              <li key={topic.id} className="flex items-start">
                <svg
                  className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{topic.name}</span>
              </li>
            ))}
            <li className="flex items-start text-gray-500">
              <svg
                className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0 mt-0.5"
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
              <span>{course.topics.length - 2} temas adicionales (requiere suscripción)</span>
            </li>
          </ul>
        </div>

        {/* First Module Preview */}
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h3 className="text-lg font-semibold mb-2">Primer Módulo Gratuito:</h3>
          <h4 className="font-medium text-gray-900">{course.modules[0].title}</h4>
          <p className="text-sm text-gray-600">
            {course.modules[0].lessons} lecciones • {course.modules[0].duration}
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¿Te gustó la vista previa?
        </h3>
        <p className="text-gray-600 mb-4">
          Accede al curso completo con {course.modules.length} módulos y más de {course.modules.reduce((total, module) => total + module.lessons, 0)} lecciones
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/courses/${courseSlug}/enroll`}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Inscribirse por ${course.price}
          </Link>
          <Link
            href={`/courses/${courseSlug}`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Ver detalles completos
          </Link>
        </div>
      </div>
    </div>
  );
} 