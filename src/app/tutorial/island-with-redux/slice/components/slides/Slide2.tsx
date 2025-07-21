export default function Slide2() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 dark:bg-purple-900 rounded-full p-3 mr-4">
          <span className="text-2xl">🏗️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Arquitectura del Sistema
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
            🖥️ Server Components
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-2">
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
          <ul className="text-green-700 dark:text-green-300 space-y-2">
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
          <ul className="text-purple-700 dark:text-purple-300 space-y-2">
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
        <div className="flex items-center justify-center space-x-4 text-sm flex-wrap">
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
  );
} 