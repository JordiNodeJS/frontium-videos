export function CourseContentSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Resumen */}
      <div className="h-4 bg-gray-200 rounded mb-6 w-64"></div>

      {/* Módulos */}
      <div className="space-y-4">
        {[...Array(4)].map((_, moduleIndex) => (
          <div
            key={moduleIndex}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Header del módulo */}
            <div className="flex justify-between items-center p-4 bg-gray-50">
              <div className="h-5 bg-gray-200 rounded w-64"></div>
              <div className="flex items-center">
                <div className="h-4 bg-gray-200 rounded w-24 mr-2"></div>
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Contenido del módulo (expandido para el primero) */}
            {moduleIndex === 0 && (
              <div className="p-4 border-t border-gray-200">
                <div className="space-y-2">
                  {[...Array(3)].map((_, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-center text-sm"
                    >
                      <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                      {lessonIndex === 0 && (
                        <div className="ml-2 h-5 bg-gray-200 rounded w-12"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón de inscripción */}
      <div className="mt-8 flex justify-center">
        <div className="h-12 bg-gray-200 rounded w-40"></div>
      </div>
    </div>
  );
}
