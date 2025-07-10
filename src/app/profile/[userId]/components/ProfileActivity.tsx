'use client'

import { useProfile } from "../context/ProfileContext";
import Link from "next/link";

export default function ProfileActivity() {
  const { user } = useProfile();

  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      learning: 'bg-blue-100 text-blue-800',
      social: 'bg-green-100 text-green-800',
      milestone: 'bg-purple-100 text-purple-800',
      special: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Course Progress */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Progreso de Cursos</h2>
          <Link 
            href="/courses" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Ver todos →
          </Link>
        </div>

        {user.courseProgress.length > 0 ? (
          <div className="space-y-4">
            {user.courseProgress.slice(0, 3).map((course) => (
              <div key={course.courseId} className="flex items-center gap-4">
                {/* Course thumbnail placeholder */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">
                    {course.courseId.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {course.courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  
                  {/* Progress bar */}
                  <div className="mt-1">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                      <span>{course.progress}% completado</span>
                      <span>{formatDuration(course.timeSpent)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-1">
                    Última vez: {formatDate(course.lastWatchedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">📚</div>
            <p className="text-gray-600">Aún no has empezado ningún curso</p>
            <Link 
              href="/courses"
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 inline-block"
            >
              Explorar cursos
            </Link>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Logros</h2>
          <span className="text-sm text-gray-600">
            {user.achievements.length} desbloqueados
          </span>
        </div>

        {user.achievements.length > 0 ? (
          <div className="space-y-4">
            {user.achievements.slice(0, 4).map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{achievement.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-900 text-sm">
                      {achievement.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement.category)}`}>
                      {achievement.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(achievement.unlockedAt)}
                  </p>
                </div>
              </div>
            ))}

            {user.achievements.length > 4 && (
              <div className="text-center pt-2">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todos los logros (+{user.achievements.length - 4})
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">🏆</div>
            <p className="text-gray-600">Aún no has desbloqueado logros</p>
            <p className="text-gray-500 text-sm mt-1">
              ¡Completa cursos para obtener tus primeros logros!
            </p>
          </div>
        )}
      </div>

      {/* Favorite Courses */}
      <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Cursos Favoritos</h2>
          <span className="text-sm text-gray-600">
            {user.favoriteCourses.length} favoritos
          </span>
        </div>

        {user.favoriteCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.favoriteCourses.slice(0, 3).map((courseId) => (
              <Link 
                key={courseId}
                href={`/courses/${courseId}`}
                className="group"
              >
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded mb-3 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {courseId.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {courseId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Curso favorito</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">❤️</div>
            <p className="text-gray-600">Aún no tienes cursos favoritos</p>
            <p className="text-gray-500 text-sm mt-1">
              Marca cursos como favoritos para acceder rápidamente
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 