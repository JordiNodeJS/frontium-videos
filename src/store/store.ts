import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'

const rootReducer = {
  favorites: favoritesReducer,
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