export function RelatedCoursesSkeleton() {
  return (
    <section className="mt-12 animate-pulse">
      {/* Título de la sección */}
      <div className="h-8 bg-gray-200 rounded mb-6 w-56"></div>

      {/* Grid de cursos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg bg-white shadow-sm p-4"
          >
            {/* Título del curso */}
            <div className="h-5 bg-gray-200 rounded mb-2 w-full"></div>

            {/* Rating y nivel */}
            <div className="flex items-center text-sm mb-2">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="mx-2 w-1 h-1 bg-gray-200 rounded-full"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>

            {/* Descripción */}
            <div className="space-y-1 mb-3">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-4/5"></div>
            </div>

            {/* Enlace */}
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
