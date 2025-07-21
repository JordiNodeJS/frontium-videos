import Link from "next/link";

export default function ReduxIslandsSliceDocumentation() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                📊 Redux Islands - Documentación Técnica
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Análisis profundo de la arquitectura e implementación
              </p>
            </div>
            <Link 
              href="/tutorial/island-with-redux"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Volver al Tutorial
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Diapositiva 1: Introducción */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
                <span className="text-2xl">🏝️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 1: ¿Qué son las Redux Islands?
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                  Concepto Fundamental
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Las Redux Islands son componentes Client que comparten estado global 
                  pero están estructuralmente separados en el árbol DOM, rodeados de 
                  Server Components que preservan el SSR.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Ventajas Clave:
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>✅ Hidratación granular (solo donde se necesita)</li>
                    <li>✅ SSR preservado en el resto de la aplicación</li>
                    <li>✅ Estado compartido sin Context drilling</li>
                    <li>✅ Rendimiento optimizado</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Diagrama: Arquitectura Tradicional vs Islands
                </h4>
                <div className="space-y-4 text-sm">
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded border-l-4 border-red-500">
                    <strong className="text-red-700 dark:text-red-300">❌ Tradicional (SPA):</strong>
                    <div className="mt-1 text-red-600 dark:text-red-400">
                      Toda la página se hidrata → JavaScript pesado
                    </div>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded border-l-4 border-green-500">
                    <strong className="text-green-700 dark:text-green-300">✅ Redux Islands:</strong>
                    <div className="mt-1 text-green-600 dark:text-green-400">
                      Solo las islas se hidratan → JavaScript mínimo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 2: Arquitectura del Sistema */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 mr-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 2: Arquitectura del Sistema
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  🖥️ Server Components
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• Renderizado en servidor</li>
                  <li>• Sin JavaScript en cliente</li>
                  <li>• SEO optimizado</li>
                  <li>• Carga instantánea</li>
                </ul>
                <div className="mt-3 p-2 bg-blue-100 dark:bg-blue-800/30 rounded text-xs">
                  <code>layout.tsx, page.tsx, headers, footers</code>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                  🏝️ Redux Islands
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• Client Components aislados</li>
                  <li>• Estado Redux compartido</li>
                  <li>• Hidratación selectiva</li>
                  <li>• Interactividad completa</li>
                </ul>
                <div className="mt-3 p-2 bg-green-100 dark:bg-green-800/30 rounded text-xs">
                  <code>FavoriteButton, ThemeToggle, Counter</code>
                </div>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  🔗 Store Global
                </h3>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                  <li>• Singleton compartido</li>
                  <li>• Estado sincronizado</li>
                  <li>• Gestión automática</li>
                  <li>• SSR compatible</li>
                </ul>
                <div className="mt-3 p-2 bg-purple-100 dark:bg-purple-800/30 rounded text-xs">
                  <code>globalStore.ts, slices/</code>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                🔄 Flujo de Datos
              </h4>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="bg-blue-200 dark:bg-blue-800 px-3 py-2 rounded">Server Component</div>
                <span className="text-gray-500">→</span>
                <div className="bg-green-200 dark:bg-green-800 px-3 py-2 rounded">Redux Island</div>
                <span className="text-gray-500">↔</span>
                <div className="bg-purple-200 dark:bg-purple-800 px-3 py-2 rounded">Global Store</div>
                <span className="text-gray-500">↔</span>
                <div className="bg-green-200 dark:bg-green-800 px-3 py-2 rounded">Otra Island</div>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 3: Implementación SSR */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mr-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 3: Implementación SSR
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                  🔧 ServerReduxWrapper
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// ServerReduxWrapper.tsx
'use client'
import { Provider } from 'react-redux';
import { getGlobalStore } from '@/store/globalStore';

export default function ServerReduxWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const store = getGlobalStore();
  
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}`}
                  </pre>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    <strong>Clave:</strong> Cada isla tiene su propio Provider pero 
                    todas usan el mismo store singleton.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                  🏪 Store Singleton
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`// globalStore.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './slices/favoritesSlice';
import themeSlice from './slices/themeSlice';

let globalStore: ReturnType<typeof createStore> | null = null;

function createStore() {
  return configureStore({
    reducer: {
      favorites: favoritesSlice,
      theme: themeSlice,
    },
  });
}

export function getGlobalStore() {
  if (!globalStore) {
    globalStore = createStore();
  }
  return globalStore;
}`}
                  </pre>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Patrón Singleton:</strong> Garantiza que todas las islas 
                    compartan la misma instancia del store.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 4: Gestión de Estado */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 dark:bg-yellow-900 rounded-full p-3 mr-4">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 4: Gestión de Estado
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
              <p className="text-sm text-orange-700 dark:text-orange-300">
                Cuando una isla modifica el estado (ej: agregar favorito), todas las demás islas 
                que subscriben a ese estado se actualizan automáticamente gracias a Redux.
              </p>
            </div>
          </div>
        </section>

        {/* Diapositiva 5: Hidratación Granular */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 dark:bg-red-900 rounded-full p-3 mr-4">
                <span className="text-2xl">💧</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 5: Hidratación Granular
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                  ⚡ Proceso de Hidratación
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                    <div className="text-blue-700 dark:text-blue-300 text-sm">
                      <strong>Server:</strong> Renderiza toda la página con datos iniciales
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                    <div className="text-green-700 dark:text-green-300 text-sm">
                      <strong>Cliente:</strong> Solo las islas se hidratan con JavaScript
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                    <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                    <div className="text-purple-700 dark:text-purple-300 text-sm">
                      <strong>Redux:</strong> Store se inicializa y conecta todas las islas
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                    <div className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                    <div className="text-yellow-700 dark:text-yellow-300 text-sm">
                      <strong>Resultado:</strong> Interactividad total con JavaScript mínimo
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                  📈 Comparativa de Rendimiento
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
                      ❌ SPA Tradicional
                    </h4>
                    <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                      <li>• JavaScript Bundle: ~200KB</li>
                      <li>• Tiempo de hidratación: ~800ms</li>
                      <li>• First Contentful Paint: ~2.1s</li>
                      <li>• Time to Interactive: ~3.2s</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
                      ✅ Redux Islands
                    </h4>
                    <ul className="text-sm text-green-600 dark:text-green-400 space-y-1">
                      <li>• JavaScript Bundle: ~45KB</li>
                      <li>• Tiempo de hidratación: ~120ms</li>
                      <li>• First Contentful Paint: ~0.8s</li>
                      <li>• Time to Interactive: ~1.1s</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-800/30 rounded">
                  <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                    🚀 Mejora del 77% en JavaScript y 65% en TTI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 6: Casos de Uso */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mr-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 6: Casos de Uso Ideales
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                  🛒 E-commerce
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-2">
                  <li>• Carrito de compras</li>
                  <li>• Lista de deseos</li>
                  <li>• Filtros de productos</li>
                  <li>• Comparador</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
                  📚 Educación
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• Progreso de cursos</li>
                  <li>• Favoritos</li>
                  <li>• Configuraciones</li>
                  <li>• Notificaciones</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
                  📱 Social Media
                </h3>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-2">
                  <li>• Likes y reacciones</li>
                  <li>• Estado de seguimiento</li>
                  <li>• Preferencias de tema</li>
                  <li>• Chat en vivo</li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                  📊 Dashboards
                </h3>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-2">
                  <li>• Widgets interactivos</li>
                  <li>• Filtros globales</li>
                  <li>• Configuraciones</li>
                  <li>• Estado de conexión</li>
                </ul>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
                  🎮 Gaming
                </h3>
                <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                  <li>• Estado del jugador</li>
                  <li>• Inventario</li>
                  <li>• Chat del juego</li>
                  <li>• Configuraciones</li>
                </ul>
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
                <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">
                  💼 Productividad
                </h3>
                <ul className="text-sm text-teal-700 dark:text-teal-300 space-y-2">
                  <li>• Estado de tareas</li>
                  <li>• Colaboración</li>
                  <li>• Notificaciones</li>
                  <li>• Preferencias</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 7: Mejores Prácticas */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-3 mr-4">
                <span className="text-2xl">💡</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Diapositiva 7: Mejores Prácticas
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4">
                  ✅ Qué SÍ hacer
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">
                      🎯 Usar para estado compartido
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Ideal cuando múltiples componentes necesitan el mismo estado
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">
                      ⚡ Mantener islas pequeñas
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Cada isla debe tener una responsabilidad específica
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">
                      🔄 Lazy loading de slices
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Carga solo los slices que necesitas por página
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 text-sm mb-1">
                      📊 Normalizar estado complejo
                    </h4>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Usa estructuras normalizadas para datos relacionales
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
                  ❌ Qué NO hacer
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm mb-1">
                      🚫 Estado local en Redux
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      No uses Redux para estado que solo necesita un componente
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm mb-1">
                      🔄 Múltiples stores
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      Un solo store global es suficiente para toda la app
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm mb-1">
                      💾 Persistir todo el estado
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      Solo persiste datos críticos como preferencias de usuario
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded border border-red-200 dark:border-red-800">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 text-sm mb-1">
                      🏝️ Islas demasiado grandes
                    </h4>
                    <p className="text-xs text-red-700 dark:text-red-300">
                      Evita islas que contengan mucho contenido estático
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diapositiva 8: Conclusión */}
        <section className="mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <span className="text-3xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                ¡Domina Redux Islands!
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Performance</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">77% menos JavaScript</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">SEO</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">SSR preservado</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">Estado</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Sincronización automática</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="text-2xl mb-2">🛠️</div>
                <div className="font-semibold text-gray-900 dark:text-white text-sm">DX</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Fácil mantenimiento</div>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/tutorial/island-with-redux"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all transform hover:scale-105"
              >
                🏝️ Volver al Tutorial Interactivo
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
} 