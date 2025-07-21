'use client'

export default function Slide11() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-orange-100 dark:bg-orange-900 rounded-full p-3 mr-4">
          <span className="text-2xl">⚖️</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Comparación de Enfoques
        </h2>
      </div>

      <div className="space-y-6">
        {/* Introducción */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-orange-800 dark:text-orange-200">
            📊 Enfoque Oficial vs. Singleton Global
          </h3>
          <p className="text-orange-700 dark:text-orange-300">
            Cada patrón tiene sus ventajas y casos de uso específicos. La elección depende de los requisitos de tu aplicación.
          </p>
        </div>

        {/* Tabla de comparación */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-600 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900 dark:text-white">Característica</th>
                  <th className="px-6 py-3 text-left font-semibold text-blue-800 dark:text-blue-200">
                    📚 Oficial (useRef + makeStore)
                  </th>
                  <th className="px-6 py-3 text-left font-semibold text-emerald-800 dark:text-emerald-200">
                    🌟 Singleton Global
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Store por Provider</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">✅ Sí - Cada Provider tiene su store</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">❌ No - Un store global compartido</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Estado compartido entre islas</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">❌ No - Stores independientes</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">✅ Sí - Sincronización automática</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Ideal para Islands Architecture</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">❌ No - Sin sincronización</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">✅ Sí - Diseñado para esto</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">SSR multiusuario seguro</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">✅ Sí - Store por request natural</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">⚠️ Requiere adaptación</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Aislamiento para testing</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">✅ Sí - Stores independientes</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">⚠️ Requiere limpieza manual</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Microfrontends independientes</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">✅ Sí - Perfecto para aislamiento</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">❌ No - Todo está conectado</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Complejidad de implementación</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">🟡 Media - Patrón estándar</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">🟢 Baja - Muy simple</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Rendimiento</td>
                  <td className="px-6 py-4 text-blue-700 dark:text-blue-300">🟡 Múltiples stores en memoria</td>
                  <td className="px-6 py-4 text-emerald-700 dark:text-emerald-300">🟢 Un solo store, menos memoria</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recomendaciones de uso */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cuándo usar el enfoque oficial */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3 text-blue-800 dark:text-blue-200">
              📚 Usa el Enfoque Oficial cuando:
            </h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <strong>SSR multiusuario:</strong> Necesitas estado aislado por request/usuario</li>
              <li>• <strong>Microfrontends:</strong> Aplicaciones completamente independientes</li>
              <li>• <strong>Testing robusto:</strong> Aislamiento total entre tests</li>
              <li>• <strong>Aplicación tradicional:</strong> Un solo Provider en toda la app</li>
              <li>• <strong>Portales independientes:</strong> Cada portal con su propio estado</li>
            </ul>
          </div>

          {/* Cuándo usar nuestro enfoque */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
              🌟 Usa el Singleton Global cuando:
            </h4>
            <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
              <li>• <strong>Redux Islands:</strong> Múltiples islas que deben compartir estado</li>
              <li>• <strong>SPA moderna:</strong> Una sola sesión de usuario</li>
              <li>• <strong>Sincronización real-time:</strong> Cambios instantáneos entre componentes</li>
              <li>• <strong>Next.js App Router:</strong> Hidratación granular con estado global</li>
              <li>• <strong>Simplicidad:</strong> Una sola fuente de verdad</li>
            </ul>
          </div>
        </div>

        {/* Ejemplo práctico de decisión */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
            🤔 ¿Cómo decidir?
          </h4>
          <div className="space-y-3 text-sm">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-600">
              <h5 className="font-semibold text-gray-800 dark:text-white mb-2">Pregúntate:</h5>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>¿Necesito que componentes separados compartan estado en tiempo real?</li>
                <li>¿Tengo múltiples usuarios simultáneos en el servidor?</li>
                <li>¿Necesito aislamiento total entre diferentes partes de la aplicación?</li>
                <li>¿Estoy construyendo microfrontends independientes?</li>
              </ol>
            </div>
            <div className="text-purple-700 dark:text-purple-300">
              <strong>Si respondiste "Sí" a las preguntas 1:</strong> Considera el singleton global.<br/>
              <strong>Si respondiste "Sí" a las preguntas 2, 3 o 4:</strong> Usa el enfoque oficial.
            </div>
          </div>
        </div>

        {/* Adaptación híbrida */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
            💡 ¿Y si necesito ambos?
          </h4>
          <p className="text-yellow-700 dark:text-yellow-300 text-sm mb-3">
            Puedes adaptar el singleton para SSR multiusuario creando el store por request:
          </p>
          <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
            <code>{`// Para SSR multiusuario con singleton
export function getStoreForRequest(requestId: string) {
  if (!requestStores[requestId]) {
    requestStores[requestId] = createStore();
  }
  return requestStores[requestId];
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
} 