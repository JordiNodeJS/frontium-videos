import CoursesHeader from './components/courses-header';
import CategoriesSection from './components/categories-section';
import FeaturedSection from './components/featured-section';

export const metadata = {
  title: 'Cursos | Frontium Videos',
  description: 'Explora nuestra colección de cursos de desarrollo web y programación'
};

export default async function CoursesPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <CoursesHeader />
      <CategoriesSection />
      <FeaturedSection />
    </div>
  );
}
