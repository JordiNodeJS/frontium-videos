'use client'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleFavoriteOptimistic } from '@/store/slices/favoritesSlice'

interface FavoriteButtonProps {
  courseId: string
  courseName: string
}

export default function FavoriteButton({ courseId, courseName }: FavoriteButtonProps) {
  const favorites = useSelector((state: RootState) => state.favorites.favoriteIds)
  const dispatch = useDispatch()
  
  const isFavorite = favorites.includes(courseId)
  
  const handleToggle = () => {
    dispatch(toggleFavoriteOptimistic(courseId))
  }
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2">{courseName}</h3>
      <button 
        onClick={handleToggle}
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          isFavorite 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
        }`}
      >
        {isFavorite ? '❤️ Eliminar de favoritos' : '🤍 Agregar a favoritos'}
      </button>
      <p className="text-sm text-gray-500 mt-2">
        Este es un <strong>Client Component</strong> - Isla Redux #1
      </p>
    </div>
  )
} 