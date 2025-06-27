/**
 * Datos simulados de cursos para la plataforma Frontium Videos
 * 
 * Esta constante proporciona datos de prueba para el desarrollo y testing.
 * En un entorno de producción, estos datos serían reemplazados por
 * información proveniente de una API o base de datos.
 */

// Definición del tipo para un curso individual
export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  instructor: string;
  rating: number;
  students: number;
  price: number;
  updatedAt: string;
  topics: string[];
  modules: {
    id: number;
    title: string;
    lessons: number;
    duration: string;
  }[];
}

// Tipo para el objeto completo de cursos
export type CoursesData = Record<string, Course>;

// Datos de cursos disponibles en la plataforma
export const courses: CoursesData = {
  'nextjs': {
    id: 'nextjs',
    title: 'Next.js 15: De cero a experto',
    description: 'Domina el framework más potente del ecosistema React. Aprende a crear aplicaciones web modernas con Server Components, App Router, y las últimas innovaciones de Next.js 15.',
    level: 'Intermedio',
    duration: '12 horas',
    instructor: 'María González',
    rating: 4.9,
    students: 1587,
    price: 69.99,
    updatedAt: '2025-06-15',
    topics: [
      'Fundamentos de Next.js 15',
      'App Router y arquitectura de proyecto',
      'Server Components y Client Components',
      'Server Actions para mutaciones',
      'Patrones de caché y rendering',
      'Despliegue y optimización'
    ],
    modules: [
      { id: 1, title: 'Introducción a Next.js 15', lessons: 5, duration: '1h 45m' },
      { id: 2, title: 'Arquitectura App Router', lessons: 6, duration: '2h 20m' },
      { id: 3, title: 'Server Components', lessons: 8, duration: '3h 10m' },
      { id: 4, title: 'Data Fetching y caché', lessons: 4, duration: '1h 50m' },
      { id: 5, title: 'Optimizaciones y despliegue', lessons: 5, duration: '2h 55m' },
    ]
  },
  'server-components': {
    id: 'server-components',
    title: 'React Server Components',
    description: 'Explora en detalle la tecnología que está revolucionando el desarrollo frontend. Aprende a trabajar con React Server Components para construir aplicaciones más rápidas y escalables.',
    level: 'Avanzado',
    duration: '8 horas',
    instructor: 'Carlos Jiménez',
    rating: 4.8,
    students: 965,
    price: 54.99,
    updatedAt: '2025-06-02',
    topics: [
      'Arquitectura de Server Components',
      'Modelo mental client vs server',
      'Patrones de composición',
      'Streaming y Suspense',
      'Interoperabilidad con Client Components',
      'Optimización de performance'
    ],
    modules: [
      { id: 1, title: 'Fundamentos de RSC', lessons: 4, duration: '1h 30m' },
      { id: 2, title: 'Interoperabilidad', lessons: 5, duration: '1h 45m' },
      { id: 3, title: 'Streaming y Suspense', lessons: 6, duration: '2h 10m' },
      { id: 4, title: 'Optimizaciones avanzadas', lessons: 4, duration: '1h 50m' },
      { id: 5, title: 'Proyecto integrado', lessons: 2, duration: '0h 45m' },
    ]
  },
  'typescript-pro': {
    id: 'typescript-pro',
    title: 'TypeScript Profesional',
    description: 'Eleva tus habilidades de TypeScript a un nivel profesional. Aprende tipos avanzados, patrones de diseño específicos de TypeScript, y mejores prácticas para grandes proyectos.',
    level: 'Intermedio',
    duration: '10 horas',
    instructor: 'Laura Martínez',
    rating: 4.7,
    students: 843,
    price: 59.99,
    updatedAt: '2025-05-20',
    topics: [
      'Tipos avanzados en TypeScript',
      'Type Guards y Type Narrowing',
      'Mapped Types y Conditional Types',
      'Inferencia de tipos',
      'Generics avanzados',
      'Patrones de diseño en TypeScript'
    ],
    modules: [
      { id: 1, title: 'Fundamentos avanzados', lessons: 5, duration: '1h 45m' },
      { id: 2, title: 'Sistema de tipos en profundidad', lessons: 6, duration: '2h 10m' },
      { id: 3, title: 'Generics y utilidades', lessons: 4, duration: '1h 40m' },
      { id: 4, title: 'Patrones de TypeScript', lessons: 7, duration: '2h 30m' },
      { id: 5, title: 'Proyecto TypeScript', lessons: 4, duration: '1h 55m' },
    ]
  },
  'web': {
    id: 'web',
    title: 'Desarrollo Web Completo',
    description: 'Aprende HTML5, CSS3, JavaScript, jQuery, Bootstrap 5, PHP, MySQL y más. Conviértete en un desarrollador web completo desde cero con este curso intensivo.',
    level: 'Principiante a Intermedio',
    duration: '30 horas',
    instructor: 'Alejandro Mendez',
    rating: 4.8,
    students: 1245,
    price: 59.99,
    updatedAt: '2025-05-15',
    topics: [
      'Fundamentos de HTML5 y CSS3',
      'JavaScript moderno (ES6+)',
      'Desarrollo responsivo con Bootstrap 5',
      'APIs REST y consumo de servicios',
      'Bases de datos MySQL y manejo con PHP',
      'Despliegue de aplicaciones web'
    ],
    modules: [
      { id: 1, title: 'Introducción al desarrollo web', lessons: 5, duration: '2h 30m' },
      { id: 2, title: 'HTML5 avanzado', lessons: 8, duration: '4h 15m' },
      { id: 3, title: 'CSS3 y Flexbox', lessons: 10, duration: '5h 45m' },
      { id: 4, title: 'JavaScript fundamentals', lessons: 12, duration: '8h 20m' },
      { id: 5, title: 'APIs y servicios externos', lessons: 6, duration: '3h 50m' },
      { id: 6, title: 'Proyecto final', lessons: 4, duration: '5h 10m' },
    ]
  },
  'react': {
    id: 'react',
    title: 'React & Next.js Masterclass',
    description: 'Domina React 19 y Next.js 15 con este curso completo. Aprenderás Server Components, Suspense, React Server Actions y las últimas características de Next.js 15.',
    level: 'Intermedio a Avanzado',
    duration: '25 horas',
    instructor: 'Sofía Rodríguez',
    rating: 4.9,
    students: 986,
    price: 79.99,
    updatedAt: '2025-06-10',
    topics: [
      'React 19 y sus nuevas características',
      'Server Components y Client Components',
      'Next.js 15 App Router',
      'React Server Actions',
      'Suspense para carga de datos',
      'Optimización y despliegue'
    ],
    modules: [
      { id: 1, title: 'Fundamentos de React 19', lessons: 6, duration: '3h 20m' },
      { id: 2, title: 'Server Components', lessons: 8, duration: '4h 45m' },
      { id: 3, title: 'Next.js 15 App Router', lessons: 7, duration: '4h 10m' },
      { id: 4, title: 'React Server Actions', lessons: 5, duration: '3h 30m' },
      { id: 5, title: 'Performance y optimización', lessons: 4, duration: '2h 50m' },
      { id: 6, title: 'Proyecto final', lessons: 5, duration: '6h 15m' },
    ]
  },
  'javascript': {
    id: 'javascript',
    title: 'JavaScript Avanzado',
    description: 'Profundiza en JavaScript con patrones avanzados, programación funcional, TypeScript, testing y arquitectura de aplicaciones modernas.',
    level: 'Avanzado',
    duration: '20 horas',
    instructor: 'Carlos Méndez',
    rating: 4.7,
    students: 754,
    price: 69.99,
    updatedAt: '2025-04-22',
    topics: [
      'Programación funcional en JavaScript',
      'TypeScript avanzado',
      'Testing con Jest y Testing Library',
      'Patrones de diseño',
      'Optimización y rendimiento',
      'Node.js y runtime avanzado'
    ],
    modules: [
      { id: 1, title: 'Fundamentos avanzados de JS', lessons: 7, duration: '3h 45m' },
      { id: 2, title: 'Programación funcional', lessons: 6, duration: '3h 20m' },
      { id: 3, title: 'TypeScript en profundidad', lessons: 8, duration: '4h 30m' },
      { id: 4, title: 'Testing avanzado', lessons: 5, duration: '2h 50m' },
      { id: 5, title: 'Patrones y arquitectura', lessons: 6, duration: '3h 15m' },
      { id: 6, title: 'Proyecto final', lessons: 3, duration: '2h 20m' },
    ]
  },
  'backend': {
    id: 'backend',
    title: 'Backend con Node.js y Express',
    description: 'Desarrolla APIs robustas y aplicaciones del lado del servidor con Node.js, Express, MongoDB y más. Aprende autenticación JWT, validación, manejo de errores y mejores prácticas.',
    level: 'Intermedio',
    duration: '28 horas',
    instructor: 'Pablo González',
    rating: 4.8,
    students: 876,
    price: 74.99,
    updatedAt: '2025-03-18',
    topics: [
      'Fundamentos de Node.js',
      'Express.js y middlewares',
      'MongoDB y Mongoose',
      'JWT y autenticación',
      'Validación y manejo de errores',
      'Despliegue en la nube'
    ],
    modules: [
      { id: 1, title: 'Introducción a Node.js', lessons: 5, duration: '2h 45m' },
      { id: 2, title: 'Express y REST APIs', lessons: 7, duration: '5h 10m' },
      { id: 3, title: 'Bases de datos con MongoDB', lessons: 6, duration: '4h 30m' },
      { id: 4, title: 'Autenticación y autorización', lessons: 8, duration: '6h 15m' },
      { id: 5, title: 'Testing y seguridad', lessons: 5, duration: '3h 40m' },
      { id: 6, title: 'Proyecto API completa', lessons: 6, duration: '5h 40m' },
    ]
  },
  'devops': {
    id: 'devops',
    title: 'DevOps: CI/CD y Deployment Automatizado',
    description: 'Aprende a implementar prácticas DevOps efectivas con CI/CD, Docker, Kubernetes y herramientas de automatización. Reduce los tiempos de despliegue y mejora la calidad del software.',
    level: 'Avanzado',
    duration: '22 horas',
    instructor: 'Elena Torres',
    rating: 4.8,
    students: 645,
    price: 84.99,
    updatedAt: '2025-06-05',
    topics: [
      'Docker y contenerización',
      'Kubernetes básico y avanzado',
      'CI/CD con GitHub Actions',
      'Infraestructura como código',
      'Monitoreo y logging',
      'Seguridad DevOps'
    ],
    modules: [
      { id: 1, title: 'Fundamentos DevOps', lessons: 4, duration: '2h 30m' },
      { id: 2, title: 'Docker en profundidad', lessons: 6, duration: '4h 15m' },
      { id: 3, title: 'Orquestación con Kubernetes', lessons: 8, duration: '5h 30m' },
      { id: 4, title: 'CI/CD y automatización', lessons: 5, duration: '3h 45m' },
      { id: 5, title: 'Monitoreo y observabilidad', lessons: 4, duration: '2h 40m' },
      { id: 6, title: 'Proyecto integrador', lessons: 5, duration: '3h 20m' },
    ]
  },
  'typescript': {
    id: 'typescript',
    title: 'TypeScript: De cero a experto',
    description: 'Domina TypeScript y eleva tus habilidades de JavaScript al siguiente nivel. Aprende tipos avanzados, genéricos, decoradores y cómo integrar TypeScript en proyectos reales.',
    level: 'Intermedio a Avanzado',
    duration: '18 horas',
    instructor: 'Luisa Martín',
    rating: 4.9,
    students: 789,
    price: 64.99,
    updatedAt: '2025-05-28',
    topics: [
      'Sistema de tipos en TypeScript',
      'Interfaces y tipos avanzados',
      'Genéricos y utility types',
      'Decoradores y metaprogramación',
      'Integración con React y Next.js',
      'Testing con TypeScript'
    ],
    modules: [
      { id: 1, title: 'Fundamentos de TypeScript', lessons: 7, duration: '3h 20m' },
      { id: 2, title: 'Tipos avanzados', lessons: 6, duration: '3h 10m' },
      { id: 3, title: 'Genéricos y patrones', lessons: 5, duration: '2h 45m' },
      { id: 4, title: 'Decoradores y metadatos', lessons: 4, duration: '2h 15m' },
      { id: 5, title: 'TypeScript en el frontend', lessons: 6, duration: '3h 30m' },
      { id: 6, title: 'Proyecto TypeScript', lessons: 5, duration: '3h 00m' },
    ]
  },
  'angular': {
    id: 'angular',
    title: 'Angular 17: Framework Completo',
    description: 'Aprende Angular 17 desde sus fundamentos hasta técnicas avanzadas. Desarrollo de aplicaciones SPA robustas con el framework más maduro del mercado.',
    level: 'Intermedio',
    duration: '26 horas',
    instructor: 'Roberto Sánchez',
    rating: 4.7,
    students: 912,
    price: 74.99,
    updatedAt: '2025-04-10',
    topics: [
      'Arquitectura de Angular 17',
      'Componentes y directivas',
      'Servicios e inyección de dependencias',
      'Formularios reactivos',
      'RxJS y programación reactiva',
      'Testing con Jasmine y Karma'
    ],
    modules: [
      { id: 1, title: 'Introducción a Angular', lessons: 6, duration: '3h 10m' },
      { id: 2, title: 'Componentes en profundidad', lessons: 8, duration: '5h 20m' },
      { id: 3, title: 'Servicios y HttpClient', lessons: 7, duration: '4h 30m' },
      { id: 4, title: 'Enrutamiento y navegación', lessons: 5, duration: '3h 15m' },
      { id: 5, title: 'Formularios y validación', lessons: 6, duration: '4h 25m' },
      { id: 6, title: 'Despliegue y optimización', lessons: 4, duration: '2h 20m' },
      { id: 7, title: 'Proyecto final', lessons: 5, duration: '3h 00m' },
    ]
  }
};
