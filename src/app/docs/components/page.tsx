import Link from 'next/link';

export default function ComponentsDocumentationPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Componentes del Sistema
        </h1>
        <p className="text-xl text-gray-600">
          Documentación de componentes reutilizables en Frontium Videos
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h2>🧩 Componentes de Autenticación</h2>
        
        <h3>AuthGuard</h3>
        <p><strong>Ubicación:</strong> <code>src/components/auth/auth-guard.tsx</code></p>
        <p>Componente para proteger rutas que requieren autenticación.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`import { AuthGuard } from '@/components/auth';

export default function ProtectedPage() {
  return (
    <AuthGuard>
      <div>
        <h1>Contenido protegido</h1>
        <p>Solo usuarios autenticados pueden ver esto</p>
      </div>
    </AuthGuard>
  );
}`}
          </pre>
        </div>

        <h4>Props</h4>
        <ul>
          <li><code>children: React.ReactNode</code> - Contenido a proteger</li>
          <li><code>fallback?: React.ReactNode</code> - Componente a mostrar mientras carga</li>
        </ul>

        <h3>UserButton</h3>
        <p><strong>Ubicación:</strong> <code>src/components/auth/user-button.tsx</code></p>
        <p>Botón de usuario que se adapta al estado de autenticación.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`import { UserButton } from '@/components/auth';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Frontium Videos</h1>
      <UserButton />
    </header>
  );
}`}
          </pre>
        </div>

        <h4>Características</h4>
        <ul>
          <li>Muestra botón de &quot;Iniciar Sesión&quot; para usuarios no autenticados</li>
          <li>Muestra menú de usuario para usuarios autenticados</li>
          <li>Integración completa con Clerk</li>
          <li>Estilos responsivos con Tailwind CSS</li>
        </ul>

        <h2>📱 Componentes de Layout</h2>
        
        <h3>Layout de Autenticación</h3>
        <p><strong>Ubicación:</strong> <code>src/app/(auth)/layout.tsx</code></p>
        <p>Layout específico para páginas de autenticación con branding.</p>

        <h3>Layout de Documentación</h3>
        <p><strong>Ubicación:</strong> <code>src/app/docs/layout.tsx</code></p>
        <p>Layout con navegación lateral para páginas de documentación.</p>

        <h2>🎨 Patrones de Diseño</h2>
        
        <h3>Componentes con Context</h3>
        <p>Para componentes que necesitan compartir estado, utilizamos el patrón Context + Hook:</p>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-blue-900 font-semibold mb-2">Ejemplo: CourseContext</h4>
          <pre className="text-sm text-blue-800">
{`// context/CourseContext.tsx
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
}

// Uso en componentes
function CourseInfo() {
  const { course, isLoading } = useCourse();
  // ...
}`}
          </pre>
        </div>

        <h3>Componentes de Formulario</h3>
        <p>Patrones recomendados para formularios:</p>
        <ul>
          <li>Validación con React Hook Form</li>
          <li>Esquemas de validación con Zod</li>
          <li>Estados de carga y error consistentes</li>
          <li>Accesibilidad con labels y ARIA</li>
        </ul>

        <h2>🎯 Mejores Prácticas</h2>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">✅ Hacer</h4>
          <ul className="space-y-2 text-green-800">
            <li>• Usar TypeScript para tipado estricto</li>
            <li>• Implementar props opcionales con valores por defecto</li>
            <li>• Documentar props y uso con JSDoc</li>
            <li>• Seguir convenciones de nomenclatura consistentes</li>
            <li>• Implementar manejo de errores</li>
            <li>• Usar Tailwind CSS para estilos</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg mt-4">
          <h4 className="font-semibold text-red-900 mb-3">❌ Evitar</h4>
          <ul className="space-y-2 text-red-800">
            <li>• Componentes con más de 200 líneas</li>
            <li>• Props drilling excesivo (usar Context cuando sea necesario)</li>
            <li>• Estilos inline complejos</li>
            <li>• Lógica de negocio en componentes de presentación</li>
            <li>• Dependencias circulares entre componentes</li>
          </ul>
        </div>

        <h2>📁 Estructura de Archivos</h2>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`src/
├── components/
│   ├── auth/
│   │   ├── auth-guard.tsx
│   │   ├── user-button.tsx
│   │   └── index.ts
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts
│   └── layout/
│       ├── header.tsx
│       ├── footer.tsx
│       └── index.ts`}
          </pre>
        </div>

        <h3>Convenciones de Nomenclatura</h3>
        <ul>
          <li><strong>Componentes:</strong> PascalCase (<code>UserButton.tsx</code>)</li>
          <li><strong>Hooks:</strong> camelCase con prefijo &quot;use&quot; (<code>useAuth.ts</code>)</li>
          <li><strong>Utilities:</strong> camelCase (<code>formatDate.ts</code>)</li>
          <li><strong>Constants:</strong> UPPER_SNAKE_CASE (<code>API_ENDPOINTS.ts</code>)</li>
        </ul>

        <h2>🧪 Testing</h2>
        
        <p>Para testing de componentes, recomendamos:</p>
        <ul>
          <li><strong>Jest</strong> para unit tests</li>
          <li><strong>React Testing Library</strong> para testing de componentes</li>
          <li><strong>MSW</strong> para mocking de APIs</li>
        </ul>

        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// Ejemplo de test
import { render, screen } from '@testing-library/react';
import { UserButton } from './user-button';

test('renders login button when not authenticated', () => {
  render(<UserButton />);
  expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
});`}
          </pre>
        </div>

        <h2>🔗 Enlaces Relacionados</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-blue-600">
            <li><Link href="/docs/auth" className="hover:text-blue-700">Documentación de Autenticación</Link></li>
            <li><Link href="/tutorial/context" className="hover:text-blue-700">Tutorial de React Context</Link></li>
            <li><Link href="/demo/auth" className="hover:text-blue-700">Demo Interactivo</Link></li>
            <li><a href="https://react.dev/reference/react" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">React Reference ↗</a></li>
            <li><a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Tailwind CSS Docs ↗</a></li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>💡 Tip:</strong> Antes de crear un nuevo componente, verifica si ya existe uno similar 
                que puedas reutilizar o extender. La reutilización es clave para mantener la consistencia del diseño.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
