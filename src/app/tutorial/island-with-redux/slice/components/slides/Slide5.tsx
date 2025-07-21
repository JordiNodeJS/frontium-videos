export default function Slide5() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-red-100 dark:bg-red-900 rounded-full p-3 mr-4">
          <span className="text-2xl">💧</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Hidratación Granular
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
            ⚡ Proceso de Hidratación
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
              <div className="text-blue-700 dark:text-blue-300">
                <strong>Server:</strong> Renderiza toda la página con datos iniciales
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
              <div className="text-green-700 dark:text-green-300">
                <strong>Cliente:</strong> Solo las islas se hidratan con JavaScript
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
              <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
              <div className="text-purple-700 dark:text-purple-300">
                <strong>Redux:</strong> Store se inicializa y conecta todas las islas
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
              <div className="text-yellow-700 dark:text-yellow-300">
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
  );
} 