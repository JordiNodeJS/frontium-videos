export default function Slide6() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border dark:border-gray-700">
      <div className="flex items-center mb-6">
        <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-3 mr-4">
          <span className="text-2xl">🎯</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Casos de Uso Ideales
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
            🛒 E-commerce
          </h3>
          <ul className="text-blue-700 dark:text-blue-300 space-y-2">
            <li>• Carrito de compras</li>
            <li>• Lista de deseos</li>
            <li>• Filtros de productos</li>
            <li>• Comparador</li>
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-3">
            📚 Educación
          </h3>
          <ul className="text-green-700 dark:text-green-300 space-y-2">
            <li>• Progreso de cursos</li>
            <li>• Favoritos</li>
            <li>• Configuraciones</li>
            <li>• Notificaciones</li>
          </ul>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">
            📱 Social Media
          </h3>
          <ul className="text-purple-700 dark:text-purple-300 space-y-2">
            <li>• Likes y reacciones</li>
            <li>• Estado de seguimiento</li>
            <li>• Preferencias de tema</li>
            <li>• Chat en vivo</li>
          </ul>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
            📊 Dashboards
          </h3>
          <ul className="text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>• Widgets interactivos</li>
            <li>• Filtros globales</li>
            <li>• Configuraciones</li>
            <li>• Estado de conexión</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-3">
            🎮 Gaming
          </h3>
          <ul className="text-red-700 dark:text-red-300 space-y-2">
            <li>• Estado del jugador</li>
            <li>• Inventario</li>
            <li>• Chat del juego</li>
            <li>• Configuraciones</li>
          </ul>
        </div>

        <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
          <h3 className="text-lg font-semibold text-teal-800 dark:text-teal-200 mb-3">
            💼 Productividad
          </h3>
          <ul className="text-teal-700 dark:text-teal-300 space-y-2">
            <li>• Estado de tareas</li>
            <li>• Colaboración</li>
            <li>• Notificaciones</li>
            <li>• Preferencias</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 