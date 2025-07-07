"use client";

import Link from "next/link";
import { useCourse } from "../context/CourseContext";

/**
 * 🎓 COMPONENTE CON CONTEXT
 *
 * Este componente ha sido refactorizado para usar Context en lugar de props.
 *
 * ANTES (con props):
 * - Recibía course como prop
 * - Dependía de que el padre le pasara los datos
 *
 * DESPUÉS (con Context):
 * - Obtiene course directamente del contexto
 * - Independiente de las props del padre
 * - Más limpio para casos complejos con muchos niveles
 *
 * @returns Componente React con la información general del curso
 */
export default function CourseInfo() {
  // 🎯 Hook personalizado: acceso directo y seguro al contexto
  const { course } = useCourse();

  // 📝 VENTAJAS del patrón Context aquí:
  // 1. ✅ No necesitamos props - datos vienen del contexto
  // 2. ✅ Componente más independiente
  // 3. ✅ Si agregamos más datos al contexto, este componente
  //       puede acceder a ellos sin cambios en el padre
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {course.level}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              {course.duration}
            </span>
            <span className="flex items-center text-sm text-gray-600">
              <svg
                className="w-4 h-4 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {course.rating}/5 ({course.students} estudiantes)
            </span>
          </div>
          <p className="text-gray-700">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>
          <p className="text-gray-700">
            Última actualización:{" "}
            <span className="font-medium">{course.updatedAt}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600 mb-2">
            ${course.price}
          </p>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors font-medium">
              Inscribirse
            </button>
            <Link
              href={`/courses/${course.id}/preview`}
              className="w-full block text-center text-blue-600 border border-blue-600 py-2 px-6 rounded-md hover:bg-blue-50 transition-colors font-medium"
            >
              Ver curso de prueba
            </Link>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Descripción</h2>
        <p className="text-gray-700">{course.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Lo que aprenderás</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {course.topics.map((topic) => (
            <li key={topic.id} className="flex items-start">
              <svg
                className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
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
        </ul>
      </div>
    </div>
  );
}
