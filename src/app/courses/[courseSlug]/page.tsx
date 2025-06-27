import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { courses, type Course } from '@/mocks/data/courses';

export const metadata = {
  title: 'Detalle del Curso | Frontium Videos',
  description: 'Información detallada sobre el curso y contenido disponible.'
};

/**
 * Función que simula la obtención de datos detallados de un curso específico.
 * 
 * @param slug - Identificador único del curso en formato URL-friendly
 * @returns El objeto curso completo o null si no existe
 * 
 * En un caso real, esto sería una llamada a una API o base de datos
 * o directamente con una base de datos a través de un ORM como Prisma.
 * 
 * La implementación actual utiliza datos estáticos y un timeout artificial para
 * simular la latencia de red y demostrar el funcionamiento de Suspense.
 */
async function getCourseDetails(slug: string): Promise<Course | null> {
  // En un caso real, esto sería una llamada a una API o base de datos
  
  // Simulando latencia de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  return courses[slug as keyof typeof courses] || null;
}

/**
 * Componente Server Component que muestra la información principal del curso.
 * 
 * @param courseSlug - Identificador único del curso en la URL
 * @returns Componente React con la información general del curso
 * 
 * Este componente es responsable de:
 * - Mostrar la cabecera del curso (título, nivel, duración, valoración)
 * - Presentar la información del instructor y fechas de actualización
 * - Mostrar el precio y botones de acción
 * - Listar la descripción y temas que se cubrirán
 * 
 * Si el curso no existe, redirige a la página 404 usando notFound()
 */
async function CourseInfo({ courseSlug }: { courseSlug: string }) {
  const course = await getCourseDetails(courseSlug);
  
  if (!course) {
    notFound();
    // El flujo de ejecución no continúa después de notFound()
    // Esta línea nunca se ejecuta, pero ayuda a TypeScript a entender
    // que course ya no puede ser null después de este punto
    return null as never;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{course.level}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">{course.duration}</span>
            <span className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {course.rating}/5 ({course.students} estudiantes)
            </span>
          </div>
          <p className="text-gray-700">
            Instructor: <span className="font-medium">{course.instructor}</span>
          </p>
          <p className="text-gray-700">
            Última actualización: <span className="font-medium">{course.updatedAt}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-blue-600 mb-2">${course.price}</p>
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
          {course.topics.map((topic, index) => (
            <li key={index} className="flex items-start">
              <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{topic}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Componente Server Component que muestra el contenido y estructura del curso.
 * 
 * @param courseSlug - Identificador único del curso en la URL
 * @returns Componente React con los módulos y lecciones del curso
 * 
 * Características principales:
 * - Muestra un resumen de la cantidad de módulos y lecciones
 * - Implementa módulos desplegables con detalles de lecciones
 * - Marca las lecciones gratuitas para atraer a nuevos estudiantes
 * - Incluye navegación para ver el programa completo
 * - Proporciona un CTA (Call To Action) para inscripción
 */
async function CourseContent({ courseSlug }: { courseSlug: string }) {
  const course = await getCourseDetails(courseSlug);
  
  if (!course) {
    notFound();
    // TypeScript necesita saber que el flujo termina con notFound()
    return null as never;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Contenido del curso</h2>
        <Link 
          href={`/courses/${course.id}/curriculum`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          Ver programa completo
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7m0 0l-7-7 7-7" />
          </svg>
        </Link>
      </div>
      <p className="text-gray-700 mb-6">{course.modules.length} módulos • {course.modules.reduce((total, module) => total + module.lessons, 0)} lecciones • {course.duration}</p>
      
      <div className="space-y-4">
        {course.modules.map(module => (
          <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <details className="group">
              <summary className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                <h3 className="font-medium">Módulo {module.id}: {module.title}</h3>
                <div className="flex items-center">
                  <div className="text-sm text-gray-600 mr-2">{module.lessons} lecciones • {module.duration}</div>
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>
              <div className="p-4 border-t border-gray-200">
                <ul className="space-y-2">
                  {[...Array(module.lessons)].map((_, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Lección {index + 1}: {index === 0 ? 'Introducción a ' + module.title : 'Tema ' + (index + 1) + ' de ' + module.title}</span>
                      {index === 0 && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">Gratis</span>
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

/**
 * Componente Server Component que muestra cursos relacionados al curso actual.
 * 
 * @param currentSlug - Identificador del curso actual para excluirlo de recomendaciones
 * @returns Componente React con tarjetas de cursos relacionados
 * 
 * Implementación técnica:
 * - Utiliza Promise.all para realizar fetching en paralelo de múltiples cursos
 * - Filtra el curso actual para evitar mostrar el mismo curso
 * - Limita los resultados a 3 cursos para no saturar la interfaz
 * - Cada tarjeta muestra información resumida y un enlace al detalle
 */
async function RelatedCourses({ currentSlug }: { currentSlug: string }) {
  const currentCourse = await getCourseDetails(currentSlug);
  if (!currentCourse) return null;
  
  // Obtenemos todos los slugs de cursos excepto el actual
  const allSlugs = Object.keys(courses).filter(slug => slug !== currentSlug);
  
  // Seleccionamos 3 cursos aleatorios (o menos si no hay suficientes)
  const relatedSlugs = allSlugs
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  // Obtenemos los detalles de cada curso en paralelo
  const relatedCoursesWithNull = await Promise.all(
    relatedSlugs.map(slug => getCourseDetails(slug))
  );
  
  // Filtra cualquier valor null de la lista
  const relatedCourses = relatedCoursesWithNull.filter((course): course is Course => course !== null);
  
  if (relatedCourses.length === 0) {
    return null;
  }
  
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Cursos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCourses.map((course: Course) => (
          <div key={course.id} className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-4">
            <h3 className="font-bold mb-2">{course.title}</h3>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {course.rating}
              </span>
              <span className="mx-2">•</span>
              <span>{course.level}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
            <Link 
              href={`/courses/${course.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Ver detalles
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Componente principal de la página de detalle de curso.
 * 
 * @param params - Objeto con los parámetros de ruta dinámica (courseSlug)
 * @returns Página completa de detalle de curso con todos sus componentes
 * 
 * Este componente orquesta la página completa siguiendo las mejores prácticas de Next.js 15:
 * - Estructura modular con componentes especializados para cada sección
 * - Uso de Suspense para gestionar estados de carga de manera declarativa
 * - Navegación mediante Link para experiencia SPA (Single Page Application)
 * - Implementación de footer consistente en toda la plataforma
 * 
 * El patrón de diseño separa las responsabilidades entre los componentes y
 * optimiza el streaming de contenido mediante Suspense boundaries estratégicos.
 */
export default function CourseDetailPage({ params: { courseSlug } }: { params: { courseSlug: string } }) {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/courses" className="text-blue-600 hover:text-blue-800 flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a cursos
        </Link>
      </div>

      <Suspense fallback={<div className="text-center py-10">Cargando detalles del curso...</div>}>
        <CourseInfo courseSlug={courseSlug} />
      </Suspense>

      <Suspense fallback={<div className="text-center py-10">Cargando contenido del curso...</div>}>
        <CourseContent courseSlug={courseSlug} />
      </Suspense>
      
      <Suspense fallback={<div className="text-center py-10">Cargando recomendaciones...</div>}>
        <RelatedCourses currentSlug={courseSlug} />
      </Suspense>
      
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Frontium Videos. Todos los derechos reservados.
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-blue-600">Términos de uso</Link>
            <Link href="/privacy" className="hover:text-blue-600">Política de privacidad</Link>
            <Link href="/contact" className="hover:text-blue-600">Contacto</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

