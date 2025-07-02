import Link from "next/link";
import { getCourseDetails } from "../lib/getCourseDetails";

/**
 * Componente Server Component que muestra cursos relacionados al curso actual.
 *
 * @param currentSlug - Identificador del curso actual para excluirlo de recomendaciones
 * @returns Componente React con tarjetas de cursos relacionados
 */
export default async function RelatedCourses({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const currentCourse = await getCourseDetails(currentSlug);
  if (!currentCourse) return null;

  // Obtenemos todos los slugs de cursos excepto el actual
  const { courses } = await import("@/mocks/data/courses");
  const allSlugs = Object.keys(courses).filter((slug) => slug !== currentSlug);

  // Seleccionamos 3 cursos aleatorios (o menos si no hay suficientes)
  const relatedSlugs = allSlugs.sort(() => 0.5 - Math.random()).slice(0, 3);

  // Obtenemos los detalles de cada curso en paralelo
  const relatedCoursesWithNull = await Promise.all(
    relatedSlugs.map((slug) => getCourseDetails(slug))
  );

  // Filtra cualquier valor null de la lista
  const relatedCourses = relatedCoursesWithNull.filter(
    (course): course is NonNullable<typeof course> => course !== null
  );

  if (relatedCourses.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Cursos relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCourses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <h3 className="font-bold mb-2">{course.title}</h3>
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
              <span>{course.level}</span>
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {course.description}
            </p>
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
