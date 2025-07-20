import ServerReduxWrapper from "@/components/ServerReduxWrapper";
import FavoriteButton from "@/components/islands/FavoriteButton";
import FavoriteCounter from "@/components/islands/FavoriteCounter";
import CourseCard from "@/components/islands/CourseCard";
import StaticSection from "@/components/islands/StaticSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header estático - Server Component */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🏝️ Demo: Redux Islands
          </h1>
          <p className="text-lg text-gray-600">
            Demostración de state compartido entre islas separadas con SSR preservado
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Sección 1: Isla Redux #1 - Completamente separada */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sección A: Gestión de Favoritos
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
        </section>

        {/* Server Component - Sin Redux, se renderiza en el servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sección B: Contenido del Servidor
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
        </section>

        {/* Más contenido del servidor */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sección C: Análisis de Rendimiento
          </h2>
          <StaticSection />
        </section>

        {/* Isla Redux #3 - Separada de las anteriores en el árbol DOM */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sección D: Panel de Estado Global
          </h2>
          {/* Esta isla NO tiene ancestro común con las anteriores */}
          <ServerReduxWrapper>
            <FavoriteCounter />
          </ServerReduxWrapper>
        </section>

        {/* Más Server Components - Separador visual */}
        <section className="mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              🔍 Análisis de la Arquitectura
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <h3 className="font-semibold text-green-700">✅ Server Components:</h3>
                <ul className="space-y-1 text-gray-600 pl-4">
                  <li>• Header principal (líneas 9-18)</li>
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
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>🎯 Demostración exitosa:</strong> Las tres islas de Redux están 
                completamente separadas en el árbol DOM, no tienen ancestros comunes, 
                pero comparten el mismo estado global. Los cambios en una isla se 
                reflejan inmediatamente in todas las demás.
              </p>
            </div>
          </div>
        </section>

        {/* Isla Redux #4 - Otra sección completamente separada */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Sección E: Más Cursos
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
        </section>

        {/* Footer - Server Component */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-600">
            <p className="text-sm">
              🖥️ Esta página demuestra <strong>Redux Islands</strong> - 
              La mayoría del contenido se renderiza en el servidor (SSR), 
              mientras que solo las "islas" interactivas se hidratan en el cliente.
            </p>
            <p className="text-xs mt-2 text-gray-500">
              Sesión actual: Datos fake precargados para demostración
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
