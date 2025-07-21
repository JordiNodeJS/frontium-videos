export default function Slide4() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3 mr-4">
          <span className="text-2xl">📊</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestión de Estado
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-4">
            ❤️ Favorites Slice
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// favoritesSlice.ts
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] as string[],
    count: 0,
  },
  reducers: {
    addFavorite: (state, action) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        state.count = state.items.length;
      }
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter(
        id => id !== action.payload
      );
      state.count = state.items.length;
    },
  },
});`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
            🎨 Theme Slice
          </h3>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
            <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// themeSlice.ts
const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light' as 'light' | 'dark',
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' 
        ? 'dark' 
        : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
    },
  },
});`}
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">
          🔄 Sincronización Automática
        </h4>
        <p className="text-orange-700 dark:text-orange-300">
          Cuando una isla modifica el estado (ej: agregar favorito), todas las demás islas 
          que subscriben a ese estado se actualizan automáticamente gracias a Redux.
        </p>
      </div>
    </div>
  );
}