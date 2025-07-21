'use client'

export default function Slide9() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-blue-100 dark:bg-blue-900 rounded-full p-3 mr-4">
          <span className="text-2xl">📚</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Enfoque Oficial Redux Toolkit
        </h2>
      </div>

      <div className="space-y-6">
        {/* Descripción del enfoque oficial */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-200">
            Provider + useRef + makeStore
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-4">
            La documentación oficial recomienda crear el store dentro del componente Provider usando useRef para evitar recreaciones.
          </p>
        </div>

        {/* Código de ejemplo */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border dark:border-gray-600">
          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">Implementación:</h4>
          <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
            <code>{`import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";

export default function ReduxProvider({ children }) {
  const store = useRef(makeStore());
  return <Provider store={store.current}>{children}</Provider>;
}`}</code>
          </pre>
        </div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Ventajas:</h4>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• <strong>Aislamiento:</strong> Cada Provider tiene su propio store</li>
              <li>• <strong>Predecible:</strong> No hay riesgo de state compartido no deseado</li>
              <li>• <strong>SSR seguro:</strong> Store por request fácilmente</li>
              <li>• <strong>Testing:</strong> Ideal para tests unitarios aislados</li>
              <li>• <strong>Microfrontends:</strong> Perfecto para apps independientes</li>
            </ul>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">❌ Limitaciones:</h4>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• <strong>Sin sincronización:</strong> Cada Provider es independiente</li>
              <li>• <strong>No para Islands:</strong> Las islas no comparten estado</li>
              <li>• <strong>Duplicación:</strong> Múltiples stores para el mismo estado</li>
              <li>• <strong>Complejidad:</strong> Más difícil compartir estado global</li>
            </ul>
          </div>
        </div>

        {/* Diagrama conceptual */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border dark:border-gray-600">
          <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Diagrama de Arquitectura:</h4>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-8">
              <div className="bg-blue-100 dark:bg-blue-900 border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4 text-center">
                <div className="text-sm font-semibold text-blue-800 dark:text-blue-200">Provider A</div>
                <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">Store A</div>
                <div className="text-xs text-blue-500 dark:text-blue-400">Estado: {`{favorites: []}`}</div>
              </div>
              <div className="bg-green-100 dark:bg-green-900 border-2 border-green-300 dark:border-green-700 rounded-lg p-4 text-center">
                <div className="text-sm font-semibold text-green-800 dark:text-green-200">Provider B</div>
                <div className="text-xs text-green-600 dark:text-green-300 mt-1">Store B</div>
                <div className="text-xs text-green-500 dark:text-green-400">Estado: {`{favorites: []}`}</div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              ⚠️ <strong>Stores independientes</strong> - No hay sincronización automática
            </div>
          </div>
        </div>

        {/* Casos de uso ideales */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold mb-3 text-purple-800 dark:text-purple-200">
            🎯 Casos de Uso Ideales:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Aplicaciones tradicionales:</h5>
              <ul className="text-purple-600 dark:text-purple-400 space-y-1">
                <li>• SPAs con un solo Provider</li>
                <li>• SSR multiusuario seguro</li>
                <li>• Aplicaciones con estado aislado</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Arquitecturas especiales:</h5>
              <ul className="text-purple-600 dark:text-purple-400 space-y-1">
                <li>• Microfrontends independientes</li>
                <li>• Portales con estado separado</li>
                <li>• Tests unitarios aislados</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 