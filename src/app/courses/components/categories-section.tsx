import { Suspense } from 'react';
import Link from 'next/link';
import CourseCategories from './course-categories';

export default function CategoriesSection() {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categorías</h2>
        <Link 
          href="/courses/all"
          className="text-blue-600 hover:text-blue-800"
        >
          Ver todas
        </Link>
      </div>
      <Suspense fallback={<div className="text-center">Cargando categorías...</div>}>
        <CourseCategories />
      </Suspense>
    </section>
  );
} 