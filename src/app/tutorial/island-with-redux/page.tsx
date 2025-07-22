import ServerReduxWrapper from "@/components/ServerReduxWrapper";
import FavoriteButton from "./components/FavoriteButton";
import FavoriteCounter from "./components/FavoriteCounter";
import CourseCard from "./components/CourseCard";
import StaticSection from "./components/StaticSection";
import ThemeToggle from "./components/ThemeToggle";
import ThemeProvider from "./components/ThemeProvider";

export default function IslandWithReduxTutorial() {
  return (
    <ServerReduxWrapper>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header estático - Server Component */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                🏝️ Tutorial: Redux Islands
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Demostración de state compartido entre islas separadas con SSR preservado
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                📍 Ruta: <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">/tutorial/island-with-redux</code>
              </div>
              {/* Isla Redux para el tema */}
              <ServerReduxWrapper>
                <ThemeToggle variant="compact" showLabel={false} />
              </ServerReduxWrapper>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Introducción del Tutorial */}
        <section className="mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 transition-colors">
            <h2 className="text-2xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
              📚 ¿Qué vas a aprender?
            </h2>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li>✅ <strong>Compartir estado</strong> entre componentes separados</li>
              <li>✅ <strong>Preservar SSR</strong> completamente</li>
              <li>✅ <strong>Aislar estado</strong> por sesión/usuario</li>
              <li>✅ <strong>Hidratación perfecta</strong> servidor-cliente</li>
              <li>✅ <strong>Gestión automática</strong> de memoria</li>
            </ul>
          </div>
        </section>
        
        {/* Sección 1: Isla Redux #1 - Completamente separada */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 1: Gestión de Favoritos (Islas Redux)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Isla Redux #1 */}
            <ServerReduxWrapper>
              <FavoriteButton 
                courseId="nextjs-course" 
                courseName="Next.js 15 - Curso Completo" 
              />
            </ServerReduxWrapper>
            
            {/* Isla Redux #2 - Otra isla separada */}
            <ServerReduxWrapper>
              <FavoriteButton 
                courseId="react-fundamentals" 
                courseName="React - Fundamentos" 
              />
            </ServerReduxWrapper>
          </div>
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded transition-colors">
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              💡 <strong>Nota:</strong> Estos dos botones son islas Redux separadas. 
              Cada una tiene su propio Provider pero comparten el mismo store global.
            </p>
          </div>
        </section>

        {/* Server Component - Sin Redux, se renderiza en el servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 2: Server Components (Sin Hidratación)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CourseCard
              title="TypeScript Avanzado"
              description="Domina TypeScript con patrones avanzados y mejores prácticas para aplicaciones enterprise."
              duration="8 horas"
              level="Avanzado"
            />
            <CourseCard
              title="Node.js & APIs"
              description="Construcción de APIs robustas y escalables con Node.js, Express y bases de datos."
              duration="12 horas"
              level="Intermedio"
            />
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded transition-colors">
            <p className="text-green-700 dark:text-green-300 text-sm">
              🖥️ <strong>Server Components:</strong> Estos componentes se renderizán completamente en el servidor. 
              No necesitan JavaScript ni hidratación en el cliente.
            </p>
          </div>
        </section>

        {/* Más contenido del servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 3: Análisis de Rendimiento (Server Component)
          </h2>
          <StaticSection />
        </section>

        {/* Nueva sección: Tema con Redux Islands */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 4: Control de Tema (Nueva Isla Redux)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Isla Redux para tema - Variante botón */}
            <ServerReduxWrapper>
              <ThemeToggle variant="button" />
            </ServerReduxWrapper>
            
            {/* Isla Redux para tema - Variante switch */}
            <ServerReduxWrapper>
              <ThemeToggle variant="switch" />
            </ServerReduxWrapper>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded">
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">
              🎨 <strong>Sincronización en Tiempo Real:</strong> Ambos controles de tema están sincronizados. 
              Cambia uno y verás como el otro se actualiza automáticamente, incluyendo el del header.
            </p>
          </div>
        </section>

        {/* Isla Redux #3 - Separada de las anteriores en el árbol DOM */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 5: Panel de Estado Global (Isla Redux Separada)
          </h2>
          {/* Esta isla NO tiene ancestro común con las anteriores */}
          <ServerReduxWrapper>
            <FavoriteCounter />
          </ServerReduxWrapper>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded transition-colors">
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              🏝️ <strong>Isla Separada:</strong> Este componente está estructuralmente separado de los botones anteriores, 
              pero comparte el mismo estado global. Los cambios se sincronizan automáticamente.
            </p>
          </div>
        </section>

        {/* Análisis de arquitectura */}
        <section className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border dark:border-gray-700 transition-colors">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              🔍 Análisis de la Arquitectura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700 dark:text-green-400">✅ Server Components:</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300 pl-4">
                  <li>• Header principal</li>
                  <li>• Introducción del tutorial</li>
                  <li>• Sección de cursos (CourseCard)</li>
                  <li>• Análisis de rendimiento (StaticSection)</li>
                  <li>• Esta misma sección de análisis</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400">🏝️ Redux Islands (Client):</h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-300 pl-4">
                  <li>• Isla #1: FavoriteButton (Next.js)</li>
                  <li>• Isla #2: FavoriteButton (React)</li>
                  <li>• Isla #3: ThemeToggle (Header)</li>
                  <li>• Isla #4: ThemeToggle (Botón)</li>
                  <li>• Isla #5: ThemeToggle (Switch)</li>
                  <li>• Isla #6: FavoriteCounter (Panel)</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-purple-700 dark:text-purple-400">🎨 Estado del Tema:</h3>
                <ServerReduxWrapper>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded">
                      <ThemeToggle variant="compact" />
                    </div>
                    <div className="text-xs">
                      ↑ Esta isla también se sincroniza con todas las demás
                    </div>
                  </div>
                </ServerReduxWrapper>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded transition-colors">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                🎯 Concepto Clave Demostrado
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                Las islas de Redux están completamente separadas en el árbol DOM, 
                no tienen ancestros comunes, pero comparten el mismo estado global. 
                Los cambios en una isla se reflejan inmediatamente en todas las demás.
              </p>
            </div>
          </div>
        </section>

        {/* Más islas para demostrar escalabilidad */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 6: Escalabilidad - Múltiples Islas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ServerReduxWrapper>
              <FavoriteButton 
                courseId="vue-masterclass" 
                courseName="Vue.js Masterclass" 
              />
            </ServerReduxWrapper>
            
            <ServerReduxWrapper>
              <FavoriteButton 
                courseId="python-django" 
                courseName="Python & Django" 
              />
            </ServerReduxWrapper>
            
            <ServerReduxWrapper>
              <FavoriteButton 
                courseId="docker-kubernetes" 
                courseName="Docker & Kubernetes" 
              />
            </ServerReduxWrapper>
          </div>
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded transition-colors">
            <p className="text-indigo-700 dark:text-indigo-300 text-sm">
              🚀 <strong>Escalabilidad:</strong> Puedes crear tantas islas como necesites. 
              Cada una se hidrata independientemente pero todas comparten el estado global.
            </p>
          </div>
        </section>

        {/* Enlace a documentación técnica */}
        <section className="mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 transition-colors">
            <h2 className="text-xl font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              📖 ¿Quieres profundizar más?
            </h2>
            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
              Explora la documentación técnica detallada con diagramas y análisis de arquitectura:
            </p>
            <a 
              href="/tutorial/island-with-redux/slice" 
              className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
            >
              📊 Ver Documentación Técnica →
            </a>
          </div>
        </section>

        {/* Nueva sección: Comparación de enfoques */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 7: Enfoques Redux - Oficial vs. Singleton
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Enfoque oficial */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-2 mr-3">
                  <span className="text-lg">📚</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  Enfoque Oficial Redux Toolkit
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                  <code className="text-xs text-gray-700 dark:text-gray-300">
                    {`const store = useRef(makeStore());`}<br/>
                    {`<Provider store={store.current}>`}
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">✅ Ventajas:</h4>
                  <ul className="text-blue-600 dark:text-blue-400 space-y-1">
                    <li>• Cada Provider tiene su propio store</li>
                    <li>• SSR multiusuario seguro</li>
                    <li>• Ideal para microfrontends</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-700 dark:text-red-300 mb-1">❌ Limitaciones:</h4>
                  <ul className="text-red-600 dark:text-red-400 space-y-1">
                    <li>• Sin sincronización entre islas</li>
                    <li>• No ideal para Islands Architecture</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Nuestro enfoque */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-100 dark:bg-emerald-900 rounded-full p-2 mr-3">
                  <span className="text-lg">🌟</span>
                </div>
                <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-200">
                  Nuestro Enfoque: Singleton Global
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                  <code className="text-xs text-gray-700 dark:text-gray-300">
                    {`export function getGlobalStore() {`}<br/>
                    {`  if (!globalStore) globalStore = createStore();`}<br/>
                    {`  return globalStore;`}<br/>
                    {`}`}
                  </code>
                </div>
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">✅ Ventajas:</h4>
                  <ul className="text-emerald-600 dark:text-emerald-400 space-y-1">
                    <li>• Todas las islas comparten estado</li>
                    <li>• Sincronización automática</li>
                    <li>• Perfecto para Islands Architecture</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-1">⚠️ Consideraciones:</h4>
                  <ul className="text-yellow-600 dark:text-yellow-400 space-y-1">
                    <li>• SSR multiusuario requiere adaptación</li>
                    <li>• No ideal para microfrontends independientes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded transition-colors">
            <div className="flex items-center mb-2">
              <span className="text-lg mr-2">🤔</span>
              <h4 className="font-semibold text-purple-800 dark:text-purple-200">¿Cuál elegir?</h4>
            </div>
            <p className="text-purple-700 dark:text-purple-300 text-sm">
              <strong>Usa el oficial</strong> para SSR multiusuario, microfrontends o testing aislado. 
              <strong>Usa el singleton</strong> para Redux Islands, SPAs modernas con estado global compartido.
              En la documentación técnica encontrarás una comparación detallada.
            </p>
          </div>
        </section>

        {/* Nueva sección: Consideraciones de Seguridad */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Paso 8: Consideraciones de Seguridad SSR
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 dark:bg-red-900 rounded-full p-2 mr-3">
                <span className="text-lg">🚨</span>
              </div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
                Cross-Request Data Pollution
              </h3>
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-red-700 dark:text-red-300">
                <strong>⚠️ Advertencia Importante:</strong> En SSR con múltiples usuarios simultáneos, 
                un store global singleton puede causar que los datos de un usuario "contaminen" 
                la respuesta de otro usuario.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700 rounded p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Nuestro Proyecto (Seguro):</h4>
                  <ul className="space-y-1 text-green-700 dark:text-green-300">
                    <li>• Solo datos de UI (favoritos, tema)</li>
                    <li>• No información sensible</li>
                    <li>• Sesiones aisladas automáticamente</li>
                    <li>• Limpieza de memoria</li>
                  </ul>
                </div>
                
                <div className="bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 rounded p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Casos Peligrosos:</h4>
                  <ul className="space-y-1 text-red-700 dark:text-red-300">
                    <li>• Datos de usuario personales</li>
                    <li>• Información de autenticación</li>
                    <li>• Contenido privado/empresarial</li>
                    <li>• Datos de facturación</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-700 rounded p-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🛡️ Recomendación:</h4>
                <p className="text-yellow-700 dark:text-yellow-300">
                  Para aplicaciones con datos sensibles, usa el <strong>enfoque oficial Redux</strong> 
                  con stores separados por request, o implementa un sistema robusto de aislamiento de sesiones.
                  En la documentación técnica encontrarás el análisis completo de seguridad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusiones del Tutorial */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 transition-colors">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              🎉 ¡Tutorial Completado!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Has aprendido:</h3>
                <ul className="text-sm text-green-600 dark:text-green-300 space-y-1">
                  <li>• Crear islas Redux independientes</li>
                  <li>• Compartir estado entre componentes separados</li>
                  <li>• Preservar SSR en Server Components</li>
                  <li>• Optimizar hidratación granular</li>
                  <li>• Gestionar sesiones aisladas</li>
                  <li>• Sincronizar estado del tema globalmente</li>
                  <li>• Entender consideraciones de seguridad SSR</li>
                  <li>• Comparar enfoques Redux oficiales vs singleton</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">🔧 Archivos clave:</h3>
                <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                  <li>• <code>globalStore.ts</code> - Store singleton</li>
                  <li>• <code>ServerReduxWrapper.tsx</code> - SSR wrapper</li>
                  <li>• <code>favoritesSlice.ts</code> - Estado favoritos</li>
                  <li>• <code>themeSlice.ts</code> - Estado del tema</li>
                  <li>• <code>ThemeToggle.tsx</code> - Control de tema</li>
                  <li>• <code>ThemeProvider.tsx</code> - Aplicar tema</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">🎨 Demo en vivo:</h3>
                <div className="space-y-2">
                  <ServerReduxWrapper>
                    <ThemeToggle variant="switch" showLabel={false} />
                  </ServerReduxWrapper>
                  <p className="text-xs text-purple-600 dark:text-purple-300">
                    ↑ ¡Prueba este toggle y observa cómo se sincronizan todos los demás en tiempo real!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Server Component */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 transition-colors">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              🏝️ <strong>Redux Islands Tutorial</strong> - 
              Arquitectura avanzada para Next.js 15 con App Router
            </p>
            <p className="text-xs mt-2 text-gray-500 dark:text-gray-500">
              Sesión actual: Datos fake precargados para demostración • 
              Estado aislado por sesión • Hidratación granular • Tema sincronizado
            </p>
          </div>
        </footer>

          </div>
        </div>
      </ThemeProvider>
    </ServerReduxWrapper>
  );
} 