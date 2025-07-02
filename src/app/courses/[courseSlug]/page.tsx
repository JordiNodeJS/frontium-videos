import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCourseDetails } from "./lib/getCourseDetails";
import { CourseInfoSkeleton } from "./components/course-info-skeleton";
import { CourseContentSkeleton } from "./components/course-content-skeleton";
import { RelatedCoursesSkeleton } from "./components/related-courses-skeleton";
import CourseInfo from "./components/CourseInfo";
import CourseContent from "./components/CourseContent";
import RelatedCourses from "./components/RelatedCourses";

export const metadata = {
  title: "Detalle del Curso | Frontium Videos",
  description: "Información detallada sobre el curso y contenido disponible.",
};

export default async function CourseDetailPage({
  params: { courseSlug },
}: {
  params: { courseSlug: string };
}) {
  // Validación única a nivel de página
  const course = await getCourseDetails(courseSlug);

  if (!course) {
    notFound();
  }
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
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

      <Suspense fallback={<CourseInfoSkeleton />}>
        <CourseInfo course={course} />
      </Suspense>

      <Suspense fallback={<CourseContentSkeleton />}>
        <CourseContent course={course} />
      </Suspense>

      <Suspense fallback={<RelatedCoursesSkeleton />}>
        <RelatedCourses currentSlug={courseSlug} />
      </Suspense>

      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="mb-4 md:mb-0">
            © {new Date().getFullYear()} Frontium Videos. By PETRONINI.
          </div>
          <div className="flex space-x-4">
            <Link href="/terms" className="hover:text-blue-600">
              Términos de uso
            </Link>
            <Link href="/privacy" className="hover:text-blue-600">
              Política de privacidad
            </Link>
            <Link href="/contact" className="hover:text-blue-600">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
