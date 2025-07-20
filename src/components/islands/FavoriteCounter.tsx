'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function FavoriteCounter() {
  const favorites = useSelector((state: RootState) => state.favorites)
  
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">Panel de Favoritos</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-extrabold">{favorites.favoriteIds.length}</p>
          <p className="text-blue-100">Cursos favoritos</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-100 mb-1">Estado actual:</p>
          <p className="text-xs bg-blue-700 px-2 py-1 rounded">
            {favorites.isLoading ? '⏳ Cargando...' : '✅ Sincronizado'}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-blue-100">
        <strong>Favoritos:</strong> {' '}
        {favorites.favoriteIds.length > 0 
          ? favorites.favoriteIds.join(', ') 
          : 'Ninguno'
        }
      </div>
      <p className="text-xs text-blue-200 mt-3">
        🏝️ Este es un <strong>Client Component</strong> - Isla Redux #2
      </p>
    </div>
  )
} 