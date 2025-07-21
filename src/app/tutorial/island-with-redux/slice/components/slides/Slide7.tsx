export default function Slide7() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-3 mr-4">
          <span className="text-2xl">💡</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mejores Prácticas
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
  );
} 