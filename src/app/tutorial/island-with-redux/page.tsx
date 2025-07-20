import ServerReduxWrapper from "@/components/ServerReduxWrapper";
import FavoriteButton from "./components/FavoriteButton";
import FavoriteCounter from "./components/FavoriteCounter";
import CourseCard from "./components/CourseCard";
import StaticSection from "./components/StaticSection";

export default function IslandWithReduxTutorial() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header estático - Server Component */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🏝️ Tutorial: Redux Islands
              </h1>
              <p className="text-lg text-gray-600">
                Demostración de state compartido entre islas separadas con SSR preservado
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                📍 Ruta: <code className="bg-gray-100 px-2 py-1 rounded">/tutorial/island-with-redux</code>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Introducción del Tutorial */}
        <section className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-3 text-blue-800">
              📚 ¿Qué vas a aprender?
            </h2>
            <ul className="space-y-2 text-blue-700">
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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
          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
            <p className="text-purple-700 text-sm">
              💡 <strong>Nota:</strong> Estos dos botones son islas Redux separadas. 
              Cada una tiene su propio Provider pero comparten el mismo store global.
            </p>
          </div>
        </section>

        {/* Server Component - Sin Redux, se renderiza en el servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-green-700 text-sm">
              🖥️ <strong>Server Components:</strong> Estos componentes se renderizán completamente en el servidor. 
              No necesitan JavaScript ni hidratación en el cliente.
            </p>
          </div>
        </section>

        {/* Más contenido del servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Paso 3: Análisis de Rendimiento (Server Component)
          </h2>
          <StaticSection />
        </section>

        {/* Isla Redux #3 - Separada de las anteriores en el árbol DOM */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Paso 4: Panel de Estado Global (Isla Redux Separada)
          </h2>
          {/* Esta isla NO tiene ancestro común con las anteriores */}
          <ServerReduxWrapper>
            <FavoriteCounter />
          </ServerReduxWrapper>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="text-blue-700 text-sm">
              🏝️ <strong>Isla Separada:</strong> Este componente está estructuralmente separado de los botones anteriores, 
              pero comparte el mismo estado global. Los cambios se sincronizan automáticamente.
            </p>
          </div>
        </section>

        {/* Análisis de arquitectura */}
        <section className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              🔍 Análisis de la Arquitectura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700">✅ Server Components:</h3>
                <ul className="space-y-1 text-gray-600 pl-4">
                  <li>• Header principal (líneas 9-22)</li>
                  <li>• Introducción del tutorial</li>
                  <li>• Sección de cursos (CourseCard)</li>
                  <li>• Análisis de rendimiento (StaticSection)</li>
                  <li>• Esta misma sección de análisis</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-blue-700">🏝️ Redux Islands (Client):</h3>
                <ul className="space-y-1 text-gray-600 pl-4">
                  <li>• Isla #1: FavoriteButton (Next.js)</li>
                  <li>• Isla #2: FavoriteButton (React)</li>
                  <li>• Isla #3: FavoriteCounter (Panel)</li>
                  <li>• Todas comparten el mismo store global</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
              <h4 className="font-semibold text-yellow-800 mb-2">
                🎯 Concepto Clave Demostrado
              </h4>
              <p className="text-yellow-700 text-sm">
                Las tres islas de Redux están completamente separadas en el árbol DOM, 
                no tienen ancestros comunes, pero comparten el mismo estado global. 
                Los cambios en una isla se reflejan inmediatamente en todas las demás.
              </p>
            </div>
          </div>
        </section>

        {/* Más islas para demostrar escalabilidad */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Paso 5: Escalabilidad - Múltiples Islas
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
          <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded">
            <p className="text-indigo-700 text-sm">
              🚀 <strong>Escalabilidad:</strong> Puedes crear tantas islas como necesites. 
              Cada una se hidrata independientemente pero todas comparten el estado global.
            </p>
          </div>
        </section>

        {/* Conclusiones del Tutorial */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              🎉 ¡Tutorial Completado!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">✅ Has aprendido:</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Crear islas Redux independientes</li>
                  <li>• Compartir estado entre componentes separados</li>
                  <li>• Preservar SSR en Server Components</li>
                  <li>• Optimizar hidratación granular</li>
                  <li>• Gestionar sesiones aisladas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-700 mb-2">🔧 Archivos clave:</h3>
                <ul className="text-sm text-blue-600 space-y-1">
                  <li>• <code>globalStore.ts</code> - Store singleton</li>
                  <li>• <code>ServerReduxWrapper.tsx</code> - SSR wrapper</li>
                  <li>• <code>ReduxIsland.tsx</code> - Isla cliente</li>
                  <li>• <code>GlobalReduxProvider.tsx</code> - Provider</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Server Component */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              🏝️ <strong>Redux Islands Tutorial</strong> - 
              Arquitectura avanzada para Next.js 15 con App Router
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Sesión actual: Datos fake precargados para demostración • 
              Estado aislado por sesión • Hidratación granular
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
} 