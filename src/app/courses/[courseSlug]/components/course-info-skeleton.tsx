export function CourseInfoSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1 mr-8">
          {/* Título */}
          <div className="h-8 bg-gray-200 rounded mb-2 w-3/4"></div>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>

          {/* Instructor */}
          <div className="h-4 bg-gray-200 rounded mb-2 w-48"></div>

          {/* Fecha actualización */}
          <div className="h-4 bg-gray-200 rounded w-40"></div>
        </div>

        {/* Área de precio y botones */}
        <div className="text-right">
          <div className="h-10 bg-gray-200 rounded mb-2 w-24"></div>
          <div className="space-y-2">
            <div className="h-10 bg-gray-200 rounded w-32"></div>
            <div className="h-10 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded mb-3 w-32"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
        </div>
      </div>

      {/* Lo que aprenderás */}
      <div className="mb-6">
        <div className="h-6 bg-gray-200 rounded mb-3 w-40"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="flex items-start">
              <div className="w-5 h-5 bg-gray-200 rounded mr-2 flex-shrink-0 mt-0.5"></div>
              <div className="h-4 bg-gray-200 rounded flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
