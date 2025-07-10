'use client'

import { createContext, useContext, ReactNode } from "react"
import { User } from "@/mocks/data/users"

// Tipos para el contexto
interface ProfileContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  // Métodos para actualizar perfil
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updatePreferences: (preferences: Partial<User['preferences']>) => Promise<void>;
  updateStats: (stats: Partial<User['stats']>) => Promise<void>;
  // Métodos para progreso de cursos
  addCourseProgress: (courseProgress: User['courseProgress'][0]) => Promise<void>;
  updateCourseProgress: (courseId: string, progress: number) => Promise<void>;
  // Métodos para favoritos
  toggleFavoriteCourse: (courseId: string) => Promise<void>;
  // Métodos para logros
  unlockAchievement: (achievement: User['achievements'][0]) => Promise<void>;
}

// Valor por defecto del contexto
const defaultContextValue: ProfileContextValue = {
  user: null,
  isLoading: true,
  error: null,
  updateProfile: async () => {},
  updatePreferences: async () => {},
  updateStats: async () => {},
  addCourseProgress: async () => {},
  updateCourseProgress: async () => {},
  toggleFavoriteCourse: async () => {},
  unlockAchievement: async () => {},
};

export const ProfileContext = createContext<ProfileContextValue>(defaultContextValue);

// Hook personalizado para usar el contexto
export const useProfile = (): ProfileContextValue => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile debe usarse dentro de un ProfileProvider');
  }
  return context;
};

// Props del Provider
interface ProfileProviderProps {
  children: ReactNode;
  user: User;
}

// Provider component
export const ProfileProvider = ({ children, user }: ProfileProviderProps) => {
  // TODO: Implementar la lógica del estado y métodos
  // Por ahora devolvemos los valores por defecto con el usuario
  const contextValue: ProfileContextValue = {
    user,
    isLoading: false,
    error: null,
    updateProfile: async (updates) => {
      // TODO: Implementar actualización de perfil
      console.log('Actualizando perfil:', updates);
    },
    updatePreferences: async (preferences) => {
      // TODO: Implementar actualización de preferencias
      console.log('Actualizando preferencias:', preferences);
    },
    updateStats: async (stats) => {
      // TODO: Implementar actualización de estadísticas
      console.log('Actualizando estadísticas:', stats);
    },
    addCourseProgress: async (courseProgress) => {
      // TODO: Implementar agregar progreso de curso
      console.log('Agregando progreso de curso:', courseProgress);
    },
    updateCourseProgress: async (courseId, progress) => {
      // TODO: Implementar actualización de progreso
      console.log('Actualizando progreso:', { courseId, progress });
    },
    toggleFavoriteCourse: async (courseId) => {
      // TODO: Implementar toggle de curso favorito
      console.log('Toggle curso favorito:', courseId);
    },
    unlockAchievement: async (achievement) => {
      // TODO: Implementar desbloqueo de logro
      console.log('Desbloqueando logro:', achievement);
    },
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};





