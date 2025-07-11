'use client'

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/mocks/data/users';

// Tipos del contexto
interface ProfileContextValue {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  toggleFavoriteCourse: (courseId: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

// Valor por defecto del contexto
const defaultContextValue: ProfileContextValue = {
  user: null,
  isLoading: false,
  error: null,
  toggleFavoriteCourse: () => {},
  updateProfile: () => {},
};

// Crear el contexto
export const ProfileContext = createContext<ProfileContextValue>(defaultContextValue);

// Props del Provider
interface ProfileProviderProps {
  children: ReactNode;
  user: User;
}

// Provider del contexto
export function ProfileProvider({ children, user: initialUser }: ProfileProviderProps) {
  // Estado local del usuario (ahora el Provider gestiona su propio estado)
  const [user, setUser] = useState<User>(initialUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para alternar curso favorito
  const toggleFavoriteCourse = (courseId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      setUser(prevUser => {
        const currentFavorites = prevUser.favoriteCourses || [];
        const isFavorite = currentFavorites.includes(courseId);
        
        const updatedFavorites = isFavorite
          ? currentFavorites.filter(id => id !== courseId) // Quitar de favoritos
          : [...currentFavorites, courseId]; // Agregar a favoritos

        return {
          ...prevUser,
          favoriteCourses: updatedFavorites
        };
      });

      // Simular una operación async (en la realidad sería una llamada a API)
      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Error toggling favorite course:', error);
      setError('Error al actualizar favoritos');
      setIsLoading(false);
    }
  };

  // Función para actualizar el perfil general
  const updateProfile = (updates: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      setUser(prevUser => ({
        ...prevUser,
        ...updates
      }));

      setTimeout(() => {
        setIsLoading(false);
      }, 500);

    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error al actualizar perfil');
      setIsLoading(false);
    }
  };

  // Valor que se proporciona a los componentes hijos
  const contextValue: ProfileContextValue = {
    user,
    isLoading,
    error,
    toggleFavoriteCourse,
    updateProfile,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useProfile() {
  const context = useContext(ProfileContext);
  
  if (!context) {
    throw new Error('useProfile debe ser usado dentro de un ProfileProvider');
  }
  
  return context;
}





