import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  count: number;
}

async function getCoursesCategories(): Promise<Category[]> {
  // Simulando una llamada a la API para obtener categorías de cursos
  // En un caso real, esto vendría de una base de datos o API
  return [
    { id: 'web', name: 'Desarrollo Web', count: 14 },
    { id: 'javascript', name: 'JavaScript Avanzado', count: 8 },
    { id: 'react', name: 'React & Next.js', count: 12 },
    { id: 'backend', name: 'Backend', count: 9 },
    { id: 'devops', name: 'DevOps', count: 6 }
  ];
}

export default async function CourseCategories() {
  const categories = await getCoursesCategories();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {categories.map((category) => (
        <div key={category.id} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-medium">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.count} cursos disponibles</p>
          <Link 
            href={`/courses/${category.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block"
          >
            Explorar →
          </Link>
        </div>
      ))}
    </div>
  );
} 