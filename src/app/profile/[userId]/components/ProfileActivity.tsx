'use client'

import { useProfile } from '../context/ProfileContext';
import { courses, Course } from '@/mocks/data/courses';
import { useState } from 'react';

export default function ProfileActivity() {
  const { user, toggleFavoriteCourse, isLoading } = useProfile();
  
  // Estado local para rastrear qué botón específico está cargando
  const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);

  if (!user) {
    return <div>No hay datos del usuario</div>;
  }

  // Obtener cursos favoritos completos
  const favoriteCourses = user.favoriteCourses 
    ? user.favoriteCourses.map(courseId => courses[courseId]).filter(Boolean) as Course[]
    : [];

  // Función para verificar si un curso es favorito
  const isFavorite = (courseId: string) => {
    return user.favoriteCourses?.includes(courseId) || false;
  };

  // Función mejorada para manejar el toggle con loading específico
  const handleToggleFavorite = async (courseId: string) => {
    setLoadingCourseId(courseId);
    try {
      await toggleFavoriteCourse(courseId);
    } finally {
      setLoadingCourseId(null);
    }
  };

  // Obtener algunos cursos disponibles para demostrar la funcionalidad
  const availableCourses = Object.values(courses).slice(0, 6);

  return (
    <div className="space-y-8">
      
      {/* Progreso de Cursos */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Progreso de Cursos</h3>
        <div className="space-y-4">
          {user.courseProgress?.map((progress) => {
            const course = courses[progress.courseId];
            if (!course) return null;
            
            return (
              <div key={progress.courseId} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{course.title}</h4>
                  <span className="text-sm text-gray-600">{progress.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progress.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Última actividad: {new Date(progress.lastWatchedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cursos Favoritos */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          Cursos Favoritos ({favoriteCourses.length})
        </h3>
        
        {favoriteCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {favoriteCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-sm">{course.title}</h4>
                  <button
                    onClick={() => handleToggleFavorite(course.id)}
                    disabled={loadingCourseId === course.id}
                    className="text-red-500 hover:text-red-700 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform active:scale-95 cursor-pointer"
                    title="Quitar de favoritos"
                  >
                    {loadingCourseId === course.id ? '⏳' : '❤️'}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mb-2">{course.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Nivel: {course.level}</span>
                  <span>{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8 bg-gray-50 rounded-lg">
            No tienes cursos favoritos aún. ¡Agrega algunos desde la lista de abajo!
          </p>
        )}
      </section>

      {/* Explorar Cursos - Para agregar a favoritos */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Explorar Cursos</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">{course.title}</h4>
                <button
                  onClick={() => handleToggleFavorite(course.id)}
                  disabled={loadingCourseId === course.id}
                  className={`transition-all duration-200 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${
                    isFavorite(course.id)
                      ? 'text-red-500 hover:text-red-700 hover:drop-shadow-lg'
                      : 'text-gray-400 hover:text-red-500 hover:drop-shadow-md'
                  }`}
                  title={isFavorite(course.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                  {loadingCourseId === course.id ? '⏳' : (isFavorite(course.id) ? '❤️' : '🤍')}
                </button>
              </div>
              <p className="text-xs text-gray-600 mb-3">{course.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                <span>Nivel: {course.level}</span>
                <span>{course.duration}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-green-600">${course.price}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {course.instructor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logros */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Logros</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {user.achievements?.map((achievement, index) => (
            <div key={index} className="bg-white rounded-lg border p-4 text-center">
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
              <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
              <p className="text-xs text-gray-500">
                Obtenido: {new Date(achievement.unlockedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Estadísticas */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Estadísticas</h3>
        <div className="grid gap-4 md:grid-cols-4">
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{user.stats?.coursesCompleted || 0}</div>
            <p className="text-sm text-gray-600">Cursos Completados</p>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round((user.stats?.totalWatchTime || 0) / 60)}</div>
            <p className="text-sm text-gray-600">Horas de Aprendizaje</p>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{user.stats?.certificates || 0}</div>
            <p className="text-sm text-gray-600">Certificados</p>
          </div>
          <div className="bg-white rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{user.stats?.streak || 0}</div>
            <p className="text-sm text-gray-600">Racha Actual</p>
          </div>
        </div>
      </section>

      {/* Debug: Estado del contexto */}
      {process.env.NODE_ENV === 'development' && (
        <section className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Debug - Estado del Contexto:</h4>
          <div className="text-xs space-y-1">
            <p><strong>Loading Global:</strong> {isLoading ? 'Sí' : 'No'}</p>
            <p><strong>Loading Específico:</strong> {loadingCourseId || 'Ninguno'}</p>
            <p><strong>Favoritos:</strong> {user.favoriteCourses?.length || 0} cursos</p>
            <p><strong>IDs Favoritos:</strong> {user.favoriteCourses?.join(', ') || 'Ninguno'}</p>
          </div>
        </section>
      )}
    </div>
  );
} 