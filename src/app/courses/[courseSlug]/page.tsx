import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCourseDetails } from "./lib/getCourseDetails";
import { CourseProvider } from "./context/CourseContext";
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
  params,
}: {
  params: { courseSlug: string };
}) {
  const { courseSlug } = await params;
  
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

      {/* 
        🎓 PATRÓN: Context Provider Wrapping
        
        El CourseProvider envuelve solo los componentes que necesitan
        acceso a los datos del curso. Esto es una best practice porque:
        
        1. ✅ Scope limitado: Solo los componentes que realmente necesitan 
           los datos tienen acceso a ellos
        2. ✅ Performance: Re-renders se limitan al árbol del Provider
        3. ✅ Claridad: Es evidente qué componentes dependen del contexto
      */}
      <CourseProvider course={course}>
        <Suspense fallback={<CourseInfoSkeleton />}>
          <CourseInfo />
        </Suspense>

        <Suspense fallback={<CourseContentSkeleton />}>
          <CourseContent />
        </Suspense>
      </CourseProvider>

      {/* 
        📝 NOTA: RelatedCourses queda fuera del Provider porque
        no necesita los datos del curso actual (solo el slug)
      */}
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
