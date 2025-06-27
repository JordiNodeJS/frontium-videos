import { Suspense } from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Cursos | Frontium Videos',
  description: 'Explora nuestra colección de cursos de desarrollo web y programación'
};

async function getCoursesCategories() {
  // Simulando una llamada a la API para obtener categorías de cursos
  // En un caso real, esto vendría de una base de datos o API
  return [
    { id: 'web', name: 'Desarrollo Web', count: 14 },
    { id: 'javascript', name: 'JavaScript Avanzado', count: 8 },
    { id: 'react', name: 'React & Next.js', count: 12 },
    { id: 'backend', name: 'Backend', count: 9 },
    { id: 'devops', name: 'DevOps', count: 6 }
  ];
}

async function getFeaturedCourses() {
  // Simulando una llamada a la API para obtener cursos destacados
  return [
    {
      id: 1,
      title: 'Next.js 15: De cero a experto',
      level: 'Intermedio',
      duration: '12 horas',
      instructor: 'María González'
    },
    {
      id: 2,
      title: 'React Server Components',
      level: 'Avanzado',
      duration: '8 horas',
      instructor: 'Carlos Jiménez'
    },
    {
      id: 3,
      title: 'TypeScript Profesional',
      level: 'Intermedio',
      duration: '10 horas',
      instructor: 'Laura Martínez'
    }
  ];
}

async function CourseCategories() {
  const categories = await getCoursesCategories();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {categories.map((category) => (
        <div key={category.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.count} cursos disponibles</p>
          <Link 
            href={`/courses/${category.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
          >
            Explorar →
          </Link>
        </div>
      ))}
    </div>
  );
}

async function FeaturedCourses() {
  const courses = await getFeaturedCourses();
  
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{course.level}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{course.duration}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
          <Link 
            href={`/courses/${course.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ver curso
          </Link>
        </div>
      ))}
    </div>
  );
}

export default async function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Cursos de Programación</h1>
        <p className="text-lg text-gray-700 mb-6">
          Domina las últimas tecnologías con nuestros cursos profesionales y prácticos. 
          Aprende a tu ritmo con contenido actualizado regularmente.
        </p>
        <div className="h-1 w-20 bg-blue-600"></div>
      </header>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categorías</h2>
          <Link 
            href="/courses/all"
            className="text-blue-600 hover:text-blue-800"
          >
            Ver todas
          </Link>
        </div>
        <Suspense fallback={<div className="text-center">Cargando categorías...</div>}>
          <CourseCategories />
        </Suspense>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cursos Destacados</h2>
          <Link 
            href="/courses/featured"
            className="text-blue-600 hover:text-blue-800"
          >
            Ver más
          </Link>
        </div>
        <Suspense fallback={<div className="text-center">Cargando cursos destacados...</div>}>
          <FeaturedCourses />
        </Suspense>
      </section>
    </div>
  );
}
