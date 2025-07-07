"use client";

import { createContext, useContext, ReactNode } from "react";
import { Course } from "@/mocks/data/courses";

/**
 * 📚 PATRÓN: Context + Hook personalizado
 *
 * Este patrón es una best practice que incluye:
 * 1. Context tipado con TypeScript
 * 2. Hook personalizado para acceso controlado
 * 3. Validación automática de uso dentro del Provider
 * 4. Separación clara de responsabilidades
 */

// Paso 1: Definir el tipo del Context
interface CourseContextType {
  course: Course;
}

// Paso 2: Crear el Context con valor inicial undefined
// Esto nos permitirá detectar si se usa fuera del Provider
const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Paso 3: Props del Provider
interface CourseProviderProps {
  course: Course;
  children: ReactNode;
}

/**
 * 🏭 PROVIDER COMPONENT
 *
 * Responsabilidades:
 * - Proporcionar los datos del curso a todos los componentes hijos
 * - Mantener un punto centralizado de datos
 * - Facilitar el acceso sin prop drilling
 *
 * @param course - Datos completos del curso
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function CourseProvider({ course, children }: CourseProviderProps) {
  // El valor que se compartirá con todos los componentes hijos
  const contextValue: CourseContextType = {
    course,
  };

  return (
    <CourseContext.Provider value={contextValue}>
      {children}
    </CourseContext.Provider>
  );
}

/**
 * 🎯 HOOK PERSONALIZADO (Best Practice)
 *
 * Ventajas de usar un hook personalizado:
 * 1. ✅ Validación automática: asegura que se use dentro del Provider
 * 2. ✅ IntelliSense mejorado: TypeScript sabe que course nunca será undefined
 * 3. ✅ Reutilización: un solo lugar para importar en lugar de useContext
 * 4. ✅ Mantenimiento: si cambia la lógica, solo se actualiza aquí
 *
 * @returns Datos del curso garantizados (nunca undefined)
 * @throws Error si se usa fuera del CourseProvider
 */
export function useCourse(): CourseContextType {
  const context = useContext(CourseContext);

  // Validación: asegurar que se usa dentro del Provider
  if (context === undefined) {
    throw new Error(
      "🚨 useCourse must be used within a CourseProvider. " +
        "Make sure to wrap your component tree with <CourseProvider>."
    );
  }

  return context;
}

/**
 * 📖 EJEMPLO DE USO:
 *
 * // En el componente padre:
 * <CourseProvider course={courseData}>
 *   <CourseInfo />
 *   <CourseContent />
 * </CourseProvider>
 *
 * // En cualquier componente hijo:
 * function CourseInfo() {
 *   const { course } = useCourse();
 *   return <h1>{course.title}</h1>;
 * }
 */
