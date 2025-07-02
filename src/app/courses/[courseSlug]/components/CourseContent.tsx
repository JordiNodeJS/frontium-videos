import Link from "next/link";
import { Course } from "@/mocks/data/courses";

/**
 * Componente Server Component que muestra el contenido y estructura del curso.
 *
 * @param course - Objeto con los datos completos del curso
 * @returns Componente React con los módulos y lecciones del curso
 */
export default function CourseContent({ course }: { course: Course }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Contenido del curso</h2>
        <Link
          href={`/courses/${course.id}/curriculum`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          Ver programa completo
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7m0 0l-7-7 7-7"
            />
          </svg>
        </Link>
      </div>
      <p className="text-gray-700 mb-6">
        {course.modules.length} módulos •{" "}
        {course.modules.reduce((total, module) => total + module.lessons, 0)}{" "}
        lecciones • {course.duration}
      </p>

      <div className="space-y-4">
        {course.modules.map((module) => (
          <div
            key={module.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <details className="group">
              <summary className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-medium">
                  Módulo {module.id}: {module.title}
                </h3>
                <div className="flex items-center">
                  <div className="text-sm text-gray-600 mr-2">
                    {module.lessons} lecciones • {module.duration}
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </summary>
              <div className="p-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {[...Array(module.lessons)].map((_, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        Lección {index + 1}:{" "}
                        {index === 0
                          ? "Introducción a " + module.title
                          : "Tema " + (index + 1) + " de " + module.title}
                      </span>
                      {index === 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                          Gratis
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href={`/courses/${course.id}/enroll`}
          className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Inscribirse al curso
        </Link>
      </div>
    </div>
  );
}
