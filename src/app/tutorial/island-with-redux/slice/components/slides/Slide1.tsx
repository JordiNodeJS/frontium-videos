export default function Slide1() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
          <span className="text-2xl">🏝️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          ¿Qué son las Redux Islands?
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Concepto Fundamental
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            Las Redux Islands son componentes Client que comparten estado global 
            pero están estructuralmente separados en el árbol DOM, rodeados de 
            Server Components que preservan el SSR.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Ventajas Clave:
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 space-y-1">
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
          <div className="space-y-4">
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
  );
} 