import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
  favoriteIds: string[]
  isLoading: boolean
  loadingCourseId: string | null
  error: string | null
}

const initialState: FavoritesState = {
  favoriteIds: [],
  isLoading: false,
  loadingCourseId: null,
  error: null,
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Ejemplo de acción: toggleFavoriteOptimistic
    toggleFavoriteOptimistic(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.favoriteIds.includes(id)) {
        state.favoriteIds = state.favoriteIds.filter(favId => favId !== id)
      } else {
        state.favoriteIds.push(id)
      }
    },
    setLoading(state, action: PayloadAction<{ courseId: string | null }>) {
      state.loadingCourseId = action.payload.courseId
      state.isLoading = !!action.payload.courseId
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
  },
})

export const { toggleFavoriteOptimistic, setLoading, setError } = favoritesSlice.actions
export default favoritesSlice.reducer
