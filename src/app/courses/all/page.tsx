import Link from 'next/link';
import { courses } from '@/mocks/data/courses';

export const metadata = {
  title: 'Todos los Cursos | Frontium Videos',
  description: 'Explora toda nuestra colección de cursos de desarrollo web y programación'
};

export default function AllCoursesPage() {
  // Convertir el objeto de cursos a array para poder mapear
  const allCourses = Object.values(courses);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <Link
            href="/courses"
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
            Volver a cursos
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Todos los Cursos</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora nuestra colección completa de {allCourses.length} cursos de desarrollo web y programación. 
            Desde fundamentos hasta técnicas avanzadas, encuentra el curso perfecto para tu nivel.
          </p>
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {course.level}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {course.duration}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {course.rating}
                </span>
                <span className="mx-2">•</span>
                <span>{course.students} estudiantes</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {course.description}
            </p>

            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                ${course.price}
              </span>
              <Link
                href={`/courses/${course.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Ver curso
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Stats al final */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Total de {allCourses.length} cursos disponibles • 
            Más de {allCourses.reduce((total, course) => total + course.students, 0).toLocaleString()} estudiantes
          </p>
        </div>
      </div>
    </div>
  );
} 