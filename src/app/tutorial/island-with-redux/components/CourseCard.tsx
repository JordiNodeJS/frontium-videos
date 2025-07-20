// Este es un Server Component - se renderiza en el servidor

interface CourseCardProps {
  title: string
  description: string
  duration: string
  level: string
}

export default function CourseCard({ 
  title, 
  description, 
  duration, 
  level 
}: CourseCardProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-xl text-green-800">{title}</h3>
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">
          {level}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">⏱️ Duración: {duration}</span>
        <span className="bg-green-500 text-white px-3 py-1 rounded text-sm">
          Disponible
        </span>
      </div>
      <div className="mt-4 p-3 bg-green-100 rounded text-sm">
        <p className="text-green-700">
          🖥️ Este es un <strong>Server Component</strong> - 
          Se renderiza completamente en el servidor, no necesita JavaScript ni hidratación.
          No tiene acceso al store de Redux.
        </p>
      </div>
    </div>
  )
} 