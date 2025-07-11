import Link from 'next/link';

interface Course {
  id: number;
  title: string;
  level: string;
  duration: string;
  instructor: string;
}

async function getFeaturedCourses(): Promise<Course[]> {
  // Simulando una llamada a la API para obtener cursos destacados
  return [
    {
      id: 1,
      title: 'Next.js 15: De cero a experto',
      level: 'Intermedio',
      duration: '12 horas',
      instructor: 'María González'
    },
    {
      id: 2,
      title: 'React Server Components',
      level: 'Avanzado',
      duration: '8 horas',
      instructor: 'Carlos Jiménez'
    },
    {
      id: 3,
      title: 'TypeScript Profesional',
      level: 'Intermedio',
      duration: '10 horas',
      instructor: 'Laura Martínez'
    }
  ];
}

export default async function FeaturedCourses() {
  const courses = await getFeaturedCourses();
  
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-2">{course.title}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">{course.level}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">{course.duration}</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">Instructor: {course.instructor}</p>
          <Link 
            href={`/courses/${course.id}`}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Ver curso
          </Link>
        </div>
      ))}
    </div>
  );
} 