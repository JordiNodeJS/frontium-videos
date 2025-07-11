import { Suspense } from 'react';
import Link from 'next/link';
import FeaturedCourses from './featured-courses';

export default function FeaturedSection() {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cursos Destacados</h2>
        <Link 
          href="/courses/featured"
          className="text-blue-600 hover:text-blue-800"
        >
          Ver más
        </Link>
      </div>
      <Suspense fallback={<div className="text-center">Cargando cursos destacados...</div>}>
        <FeaturedCourses />
      </Suspense>
    </section>
  );
} 