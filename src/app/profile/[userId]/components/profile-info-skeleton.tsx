export function ProfileInfoSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-pulse">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Avatar skeleton */}
        <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
        
        <div className="flex-1 space-y-4">
          {/* Name and username */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-300 rounded w-48"></div>
            <div className="h-5 bg-gray-200 rounded w-32"></div>
          </div>
          
          {/* Bio */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          
          {/* Location and website */}
          <div className="flex flex-wrap gap-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-4 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
        
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-300 rounded w-12 mx-auto mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 