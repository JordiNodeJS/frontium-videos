export default function Slide3() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-green-100 dark:bg-green-900 rounded-full p-3 mr-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Implementación SSR
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
  );
} 