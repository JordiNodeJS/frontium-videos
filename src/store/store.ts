import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'
import themeReducer from './slices/themeSlice'

const rootReducer = {
  favorites: favoritesReducer,
  theme: themeReducer,
}

// Tipo para el estado inicial/precargado
type PreloadedState = Parameters<typeof configureStore>[0]['preloadedState']

export function makeStore(preloadedState?: PreloadedState) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']