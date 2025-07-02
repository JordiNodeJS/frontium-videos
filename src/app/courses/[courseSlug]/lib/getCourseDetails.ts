import { courses, type Course } from "@/mocks/data/courses";

/**
 * Función que simula la obtención de datos detallados de un curso específico.
 *
 * @param slug - Identificador único del curso en formato URL-friendly
 * @returns El objeto curso completo o null si no existe
 *
 * En un caso real, esto sería una llamada a una API o base de datos
 * o directamente con una base de datos a través de un ORM como Prisma.
 *
 * La implementación actual utiliza datos estáticos y un timeout artificial para
 * simular la latencia de red y demostrar el funcionamiento de Suspense.
 */
export async function getCourseDetails(slug: string): Promise<Course | null> {
  // En un caso real, esto sería una llamada a una API o base de datos

  // Simulando latencia de red
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return courses[slug as keyof typeof courses] || null;
}
