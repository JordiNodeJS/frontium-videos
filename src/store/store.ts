import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from './slices/favoritesSlice'

const rootReducer = {
  favorites: favoritesReducer,
}

export function makeStore(preloadedState?: any) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']