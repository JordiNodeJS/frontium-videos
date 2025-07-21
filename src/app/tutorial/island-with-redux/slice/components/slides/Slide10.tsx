'use client'

export default function Slide10() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-3 mr-4">
          <span className="text-2xl">🌟</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Nuestro Enfoque: Singleton Global
        </h2>
      </div>

      <div className="space-y-6">
        {/* Descripción del enfoque singleton */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
            getGlobalStore() - Store Singleton
          </h3>
          <p className="text-emerald-700 dark:text-emerald-300 mb-4">
            Una única instancia global del store que es compartida por todas las Redux Islands, permitiendo sincronización automática entre islas separadas.
          </p>
        </div>

        {/* Código de ejemplo */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-600">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Implementación:</h4>
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`let globalStore: ReturnType<typeof createStore> | null = null;

function createStore() {
  return configureStore({
    reducer: { favorites: favoritesSlice.reducer }
  });
}

export function getGlobalStore() {
  if (!globalStore) {
    globalStore = createStore();
  }
  return globalStore;
}

// Uso en cada isla
<Provider store={getGlobalStore()}>{children}</Provider>`}</code>
          </pre>
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Ventajas:</h4>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• <strong>Estado global real:</strong> Todas las islas comparten estado</li>
              <li>• <strong>Sincronización automática:</strong> Cambios instantáneos</li>
              <li>• <strong>Ideal para Islands:</strong> Perfecto para arquitectura de islas</li>
              <li>• <strong>Simplicidad:</strong> Una sola fuente de verdad</li>
              <li>• <strong>Rendimiento:</strong> No duplicación de estado</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Consideraciones:</h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• <strong>SSR multiusuario:</strong> Requiere store por request</li>
              <li>• <strong>Aislamiento:</strong> No ideal para microfrontends independientes</li>
              <li>• <strong>Testing:</strong> Necesita limpiar estado entre tests</li>
              <li>• <strong>Memory leaks:</strong> Cuidado en SSR con múltiples usuarios</li>
            </ul>
          </div>
        </div>

        {/* Diagrama conceptual */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-600">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Diagrama de Arquitectura:</h4>
          <div className="flex flex-col items-center space-y-4">
            {/* Store global central */}
            <div className="bg-purple-100 dark:bg-purple-900 border-2 border-purple-300 dark:border-purple-700 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-purple-800 dark:text-purple-200">🌟 Store Global Singleton</div>
              <div className="text-sm text-purple-600 dark:text-purple-300 mt-1">Estado: {`{favorites: ['nextjs-course'], theme: 'dark'}`}</div>
            </div>
            
            {/* Flecha hacia abajo */}
            <div className="text-2xl text-gray-400">↓</div>
            
            {/* Islas conectadas */}
            <div className="flex space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-3 text-center">
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">Isla A</div>
                <div className="text-xs text-blue-600 dark:text-blue-300">FavoriteButton</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 border-2 border-green-300 dark:border-green-700 rounded-lg p-3 text-center">
                <div className="text-sm font-semibold text-green-800 dark:text-green-200">Isla B</div>
                <div className="text-xs text-green-600 dark:text-green-300">FavoriteCounter</div>
              </div>
              <div className="bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 rounded-lg p-3 text-center">
                <div className="text-sm font-semibold text-red-800 dark:text-red-200">Isla C</div>
                <div className="text-xs text-red-600 dark:text-red-300">ThemeToggle</div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              ✅ <strong>Todas las islas comparten el mismo estado</strong> - Sincronización automática
            </div>
          </div>
        </div>

        {/* Casos de uso ideales */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
            🎯 Casos de Uso Ideales:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Redux Islands Architecture:</h5>
              <ul className="text-purple-600 dark:text-purple-400 space-y-1">
                <li>• SPAs con múltiples islas Redux</li>
                <li>• Estado global compartido necesario</li>
                <li>• Sincronización en tiempo real</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Aplicaciones modernas:</h5>
              <ul className="text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Next.js con App Router</li>
                <li>• Hidratación granular</li>
                <li>• Preservación completa de SSR</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Implementación en el proyecto */}
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-indigo-800 dark:text-indigo-200">
            🛠️ En nuestro proyecto:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Archivos clave:</h5>
              <ul className="text-indigo-600 dark:text-indigo-400 space-y-1 font-mono">
                <li>• <code>globalStore.ts</code> - Singleton</li>
                <li>• <code>ServerReduxWrapper.tsx</code> - Provider</li>
                <li>• <code>favoritesSlice.ts</code> - Estado</li>
                <li>• <code>themeSlice.ts</code> - Tema</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">Componentes que lo usan:</h5>
              <ul className="text-indigo-600 dark:text-indigo-400 space-y-1">
                <li>• FavoriteButton (múltiples islas)</li>
                <li>• FavoriteCounter (isla separada)</li>
                <li>• ThemeToggle (múltiples variantes)</li>
                <li>• ThemeProvider (aplicación global)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 