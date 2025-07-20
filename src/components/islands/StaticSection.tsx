// Este es otro Server Component - completamente estático

export default function StaticSection() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        📊 Análisis de Rendimiento
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600">98%</div>
          <div className="text-sm text-gray-600">SSR Preservado</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600">45%</div>
          <div className="text-sm text-gray-600">Menos JavaScript</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">2</div>
          <div className="text-sm text-gray-600">Islas Activas</div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h4 className="font-semibold text-yellow-800 mb-2">
          💡 Ventajas de Redux Islands
        </h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>✅ Server Components preservan SSR completamente</li>
          <li>✅ Solo las "islas" se hidratan en el cliente</li>
          <li>✅ Todas las islas comparten el mismo store global</li>
          <li>✅ Mejor rendimiento inicial y SEO</li>
        </ul>
      </div>
      <p className="text-xs text-gray-500 mt-4">
        🖥️ Este es otro <strong>Server Component</strong> - Sin hidratación necesaria
      </p>
    </div>
  )
} 