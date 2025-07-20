// Este es otro Server Component - completamente estático

export default function StaticSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        📊 Análisis de Rendimiento
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">98%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">SSR Preservado</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">45%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Menos JavaScript</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">2</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Islas Activas</div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded transition-colors">
        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          💡 Ventajas de Redux Islands
        </h4>
        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <li>✅ Server Components preservan SSR completamente</li>
          <li>✅ Solo las &ldquo;islas&rdquo; se hidratan en el cliente</li>
          <li>✅ Todas las islas comparten el mismo store global</li>
          <li>✅ Mejor rendimiento inicial y SEO</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
        🖥️ Este es otro <strong>Server Component</strong> - Sin hidratación necesaria
      </p>
    </div>
  )
} 