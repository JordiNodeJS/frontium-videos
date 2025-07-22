'use client'

export default function Slide12() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-red-100 dark:bg-red-900 rounded-full p-3 mr-4">
          <span className="text-2xl">🚨</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Seguridad SSR: Cross-Request Data Pollution
        </h2>
      </div>

      <div className="space-y-6">
        {/* Problema principal */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-red-800 dark:text-red-200">
            🚨 El Problema: Contaminación Entre Requests
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-4">
            En SSR verdadero con múltiples usuarios simultáneos, un store global singleton puede causar 
            que los datos de un usuario "contaminen" la respuesta de otro usuario.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded p-4 border">
            <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Escenario Peligroso:</h4>
            <div className="text-sm font-mono space-y-1 text-gray-700 dark:text-gray-300">
              <div className="text-blue-600 dark:text-blue-400">// ❌ PELIGROSO en SSR multiusuario</div>
              <div>let globalStore = null;</div>
              <div></div>
              <div>export function getGlobalStore() {`{`}</div>
              <div className="pl-4">if (!globalStore) {`{`}</div>
              <div className="pl-8">globalStore = configureStore({`{...}`});</div>
              <div className="pl-4">{`}`}</div>
              <div className="pl-4">return globalStore; // ¡Mismo store para TODOS!</div>
              <div>{`}`}</div>
            </div>
          </div>
        </div>

        {/* Escenario problemático */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
            ⚠️ Secuencia Problemática
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-3">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-semibold">
                Request Usuario A
              </span>
              <span className="text-gray-600 dark:text-gray-400">→</span>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                globalStore.dispatch(setUser("Alice"))
              </code>
            </div>
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded text-xs font-semibold">
                Request Usuario B
              </span>
              <span className="text-gray-600 dark:text-gray-400">→</span>
              <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                globalStore.dispatch(setUser("Bob"))
              </code>
            </div>
            <div className="flex items-center space-x-3 bg-red-100 dark:bg-red-900/50 p-2 rounded">
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded text-xs font-semibold">
                Resultado
              </span>
              <span className="text-red-600 dark:text-red-400">→</span>
              <span className="text-red-700 dark:text-red-300 text-xs">
                ¡Usuario A recibe datos de Usuario B!
              </span>
            </div>
          </div>
        </div>

        {/* Nuestro caso específico */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-green-800 dark:text-green-200">
            ✅ Nuestro Proyecto: Bien Diseñado
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Datos Seguros que Manejamos:</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                  <div className="font-mono text-xs text-gray-700 dark:text-gray-300">
                    <div className="text-blue-600 dark:text-blue-400">// ✅ Favoritos: UI del cliente</div>
                    <div>favoriteIds: ['nextjs-course']</div>
                    <div></div>
                    <div className="text-blue-600 dark:text-blue-400">// ✅ Tema: Preferencia UI</div>
                    <div>mode: 'light' | 'dark'</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">Implementación Segura:</h4>
              <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                <div className="font-mono text-xs text-gray-700 dark:text-gray-300">
                  <div className="text-green-600 dark:text-green-400">// ✅ Separación por sesión</div>
                  <div>function getSessionId() {`{`}</div>
                  <div className="pl-4">if (typeof window !== 'undefined') {`{`}</div>
                  <div className="pl-8">return window.__SESSION_ID__</div>
                  <div className="pl-4">{`}`}</div>
                  <div className="pl-4">return `server_$`{`{Date.now()}`}</div>
                  <div>{`}`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cuándo es seguro vs peligroso */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
            🎯 Cuándo es Seguro vs. Peligroso
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-green-700 dark:text-green-300">✅ SEGURO - Nuestro Caso:</h4>
              <ul className="space-y-1 text-sm text-green-600 dark:text-green-400">
                <li>• Datos de UI/preferencias</li>
                <li>• No información sensible</li>
                <li>• Sesiones aisladas</li>
                <li>• Limpieza automática</li>
                <li>• Solo client-side state</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-red-700 dark:text-red-300">❌ PELIGROSO:</h4>
              <ul className="space-y-1 text-sm text-red-600 dark:text-red-400">
                <li>• Datos de usuario personales</li>
                <li>• Información de autenticación</li>
                <li>• Contenido privado</li>
                <li>• Datos de facturación</li>
                <li>• Información empresarial</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recomendaciones */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-purple-800 dark:text-purple-200">
            🛡️ Recomendaciones de Seguridad
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Para Store Singleton:</h4>
              <ul className="space-y-1 text-purple-600 dark:text-purple-400">
                <li>• Solo datos no sensibles</li>
                <li>• Implementar aislamiento de sesión</li>
                <li>• Limpiar automáticamente</li>
                <li>• Validar en cada request</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-purple-700 dark:text-purple-300">Para Datos Sensibles:</h4>
              <ul className="space-y-1 text-purple-600 dark:text-purple-400">
                <li>• Usar enfoque oficial Redux</li>
                <li>• Store por request/sesión</li>
                <li>• Validación server-side</li>
                <li>• Nunca compartir entre usuarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusión */}
        <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            💡 Conclusión Clave
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Nuestro enfoque singleton es <strong>seguro para este proyecto</strong> porque solo manejamos 
            datos de UI no sensibles. Sin embargo, para aplicaciones con datos de usuario reales, 
            autenticación o información privada, debes usar el enfoque oficial con stores separados 
            por request o implementar un sistema robusto de aislamiento de sesiones.
          </p>
        </div>
      </div>
    </div>
  );
} 