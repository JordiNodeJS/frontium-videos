import Link from 'next/link';

export default function Slide8() {
  return (
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
  );
} 