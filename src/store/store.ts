import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'

export const makeStore = (preloadedState?: { favorites: ReturnType<typeof favoritesReducer> }) =>
  configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState,
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']