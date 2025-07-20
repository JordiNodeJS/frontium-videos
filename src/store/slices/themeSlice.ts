import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
  isSystemPreference: boolean
}

const initialState: ThemeState = {
  mode: 'light',
  isSystemPreference: true,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload
      state.isSystemPreference = false
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      state.isSystemPreference = false
    },
    setSystemPreference(state, action: PayloadAction<boolean>) {
      state.isSystemPreference = action.payload
      if (action.payload) {
        // Detectar preferencia del sistema
        if (typeof window !== 'undefined') {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          state.mode = prefersDark ? 'dark' : 'light'
        }
      }
    },
    initializeTheme(state) {
      // Inicializar tema basado en localStorage o sistema
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null
        const savedSystemPref = localStorage.getItem('theme-system-preference')
        
        if (savedTheme && savedSystemPref === 'false') {
          state.mode = savedTheme
          state.isSystemPreference = false
        } else {
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          state.mode = prefersDark ? 'dark' : 'light'
          state.isSystemPreference = true
        }
      }
    },
  },
})

export const { setTheme, toggleTheme, setSystemPreference, initializeTheme } = themeSlice.actions
export default themeSlice.reducer 