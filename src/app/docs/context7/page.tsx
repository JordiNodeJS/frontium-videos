import Link from 'next/link';

export default function Context7DocumentationPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Context7 - Gestión Inteligente de Paquetes
        </h1>
        <p className="text-xl text-gray-600">
          Guía completa para usar Context7 en el desarrollo con Next.js 15
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h2>🤖 ¿Qué es Context7?</h2>
        <p>
          Context7 es un servidor MCP (Model Context Protocol) que proporciona documentación actualizada 
          y mejores prácticas para paquetes de JavaScript/TypeScript. Nos ayuda a:
        </p>
        <ul>
          <li>Obtener información actualizada sobre paquetes antes de instalarlos</li>
          <li>Conocer las mejores prácticas de configuración</li>
          <li>Evitar problemas de compatibilidad</li>
          <li>Identificar breaking changes y migraciones</li>
        </ul>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>⚠️ REGLA OBLIGATORIA:</strong> Siempre consultar Context7 antes de instalar cualquier paquete.
              </p>
            </div>
          </div>
        </div>

        <h2>📋 Proceso Obligatorio</h2>
        <ol>
          <li><strong>Consultar Context7 PRIMERO</strong></li>
          <li><strong>Verificar información actualizada</strong> (versión, compatibilidad, breaking changes)</li>
          <li><strong>Instalar con información verificada</strong> (<code>pnpm add [paquete]@[version-verificada]</code>)</li>
          <li><strong>Configurar según mejores prácticas</strong></li>
        </ol>

        <h2>🔧 Formato de Consulta</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`use context7

Quiero instalar [nombre_del_paquete] para [propósito]. 
¿Cuál es la versión más reciente, cómo se instala 
correctamente con pnpm, y cuáles son las mejores 
prácticas de configuración para Next.js 15?`}
          </pre>
        </div>

        <h2>💡 Ejemplos Prácticos</h2>
        
        <h3>Autenticación</h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <p className="font-medium text-blue-900 mb-2">Consulta:</p>
          <code className="text-sm text-blue-800">
            use context7<br/>
            Quiero instalar @clerk/nextjs para autenticación. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
          </code>
        </div>

        <h3>Estilos e Iconos</h3>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="font-medium text-green-900 mb-2">Consulta:</p>
          <code className="text-sm text-green-800">
            use context7<br/>
            Quiero instalar @heroicons/react para iconos SVG. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
          </code>
        </div>

        <h3>Base de Datos</h3>
        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <p className="font-medium text-purple-900 mb-2">Consulta:</p>
          <code className="text-sm text-purple-800">
            use context7<br/>
            Quiero instalar prisma para ORM de base de datos. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
          </code>
        </div>

        <h2>✅ Checklist de Verificación</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">Antes de instalar, verificar:</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>¿Es la versión más reciente estable?</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>¿Es compatible con Next.js 15?</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>¿Hay breaking changes desde la última versión?</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>¿Cuáles son las mejores prácticas de configuración?</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>¿Hay alternativas más adecuadas?</span>
            </li>
          </ul>
        </div>

        <h2>⚙️ Configuración MCP</h2>
        <p>Context7 está configurado en <code>mcp_config.json</code>:</p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`"context7": {
  "serverUrl": "https://mcp.context7.com/sse"
}`}
          </pre>
        </div>

        <h2>🚨 Casos Especiales</h2>
        
        <h3>Paquetes de Desarrollo</h3>
        <p>Para paquetes de desarrollo (devDependencies), especificar claramente:</p>
        <div className="bg-orange-50 p-4 rounded-lg">
          <code className="text-sm text-orange-800">
            use context7<br/>
            Quiero instalar eslint-config-next como devDependency para linting. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
          </code>
        </div>

        <h3>Paquetes con Configuración Compleja</h3>
        <p>Para paquetes que requieren configuración adicional:</p>
        <div className="bg-red-50 p-4 rounded-lg">
          <code className="text-sm text-red-800">
            use context7<br/>
            Quiero instalar next-auth para autenticación con múltiples proveedores. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, cuáles son las mejores prácticas de configuración para Next.js 15, y qué archivos de configuración necesito crear?
          </code>
        </div>

        <h2>📚 Beneficios Implementados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">✅ Prevención de Problemas</h4>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Evita conflictos de versiones</li>
              <li>• Previene breaking changes inesperados</li>
              <li>• Identifica incompatibilidades</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🚀 Optimización</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Configuración óptima desde el inicio</li>
              <li>• Mejores prácticas actualizadas</li>
              <li>• Reduce tiempo de debugging</li>
            </ul>
          </div>
        </div>

        <h2>🔗 Enlaces Útiles</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-blue-600">
            <li><a href="https://context7.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Sitio oficial de Context7</a></li>
            <li><Link href="/docs/auth" className="hover:text-blue-700">Documentación de Autenticación</Link></li>
            <li><Link href="/demo/auth" className="hover:text-blue-700">Demo Interactivo</Link></li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>💡 Recuerda:</strong> Context7 es tu asistente para tomar decisiones informadas sobre paquetes. 
                Úsalo siempre antes de instalar para mantener el proyecto actualizado y libre de problemas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
