import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseDetails } from "../lib/getCourseDetails";

export const metadata = {
  title: "Currículum del Curso | Frontium Videos",
  description: "Explora el currículum completo y detallado del curso.",
};

export default async function CourseCurriculumPage({
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

      {/* Course Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-lg text-gray-600 mb-4">Currículum Completo</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">{course.modules.length}</div>
            <div className="text-sm text-gray-600">Módulos</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
            <div className="text-sm text-gray-600">Lecciones</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-600">{course.duration}</div>
            <div className="text-sm text-gray-600">Duración Total</div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
            {course.level}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
            Instructor: {course.instructor}
          </span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
            ⭐ {course.rating} ({course.students} estudiantes)
          </span>
        </div>
      </div>

      {/* Curriculum Content */}
      <div className="space-y-6">
        {course.modules.map((module, index) => (
          <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  Módulo {index + 1}: {module.title}
                </h2>
                <div className="text-sm text-gray-600">
                  {module.lessons} lecciones • {module.duration}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              {/* Simulated lessons */}
              <div className="space-y-3">
                {Array.from({ length: module.lessons }, (_, lessonIndex) => (
                  <div key={lessonIndex} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg
                        className="w-4 h-4 text-blue-600"
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
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        Lección {lessonIndex + 1}: {getLessonTitle(module.title, lessonIndex + 1)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Video • {Math.floor(Math.random() * 20) + 5} min
                      </p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {lessonIndex === 0 ? (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Vista previa
                        </span>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-400"
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
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 text-center mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          ¿Listo para comenzar?
        </h3>
        <p className="text-gray-600 mb-4">
          Inscríbete ahora y accede inmediatamente a todo el contenido
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/courses/${courseSlug}/enroll`}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            Inscribirse por ${course.price}
          </Link>
          <Link
            href={`/courses/${courseSlug}/preview`}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Ver vista previa
          </Link>
        </div>
      </div>
    </div>
  );
}

// Helper function to generate lesson titles
function getLessonTitle(moduleTitle: string, lessonNumber: number): string {
  const lessonTitles = {
    "Introducción": [
      "Bienvenida al curso",
      "Configuración del entorno",
      "Conceptos fundamentales",
      "Herramientas necesarias",
      "Primer proyecto"
    ],
    "Fundamentos": [
      "Conceptos básicos",
      "Sintaxis esencial",
      "Patrones comunes",
      "Mejores prácticas",
      "Ejercicios prácticos"
    ]
  };

  // Extract key words from module title for matching
  const key = Object.keys(lessonTitles).find(k => 
    moduleTitle.toLowerCase().includes(k.toLowerCase())
  );

  if (key && lessonTitles[key as keyof typeof lessonTitles][lessonNumber - 1]) {
    return lessonTitles[key as keyof typeof lessonTitles][lessonNumber - 1];
  }

  // Fallback generic titles
  const genericTitles = [
    "Introducción al tema",
    "Conceptos clave",
    "Implementación práctica",
    "Casos de uso",
    "Ejercicios y ejemplos",
    "Mejores prácticas",
    "Patrones avanzados",
    "Optimización",
    "Debugging y testing",
    "Proyecto práctico"
  ];

  return genericTitles[(lessonNumber - 1) % genericTitles.length];
} 