import Link from 'next/link';
import { courses, type Course } from '@/mocks/data/courses';

/**
 * Función que simula la obtención de cursos destacados.
 * En un caso real, esto vendría de una API o base de datos.
 */
async function getFeaturedCourses(): Promise<Course[]> {
  // Simulando latencia de red
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Devolvemos los cursos destacados usando sus slugs reales
  const featuredSlugs = ['nextjs', 'server-components', 'typescript-pro'];
  
  return featuredSlugs
    .map(slug => courses[slug])
    .filter(course => course !== undefined);
}

export default async function FeaturedCourses() {
  const coursesData = await getFeaturedCourses();
  
  return (
    <div className="space-y-4">
      {coursesData.map((course) => (
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