/**
 * Datos simulados de cursos para la plataforma Frontium Videos
 * 
 * Esta constante proporciona datos de prueba para el desarrollo y testing.
 * En un entorno de producción, estos datos serían reemplazados por
 * información proveniente de una API o base de datos.
 */

// Definición del tipo para un topic individual
export interface Topic {
  id: string;
  name: string;
}

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
  topics: Topic[];
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
      { id: 'nextjs-fundamentals', name: 'Fundamentos de Next.js 15' },
      { id: 'app-router-architecture', name: 'App Router y arquitectura de proyecto' },
      { id: 'server-client-components', name: 'Server Components y Client Components' },
      { id: 'server-actions', name: 'Server Actions para mutaciones' },
      { id: 'cache-rendering-patterns', name: 'Patrones de caché y rendering' },
      { id: 'deployment-optimization', name: 'Despliegue y optimización' }
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
      { id: 'rsc-architecture', name: 'Arquitectura de Server Components' },
      { id: 'client-server-mental-model', name: 'Modelo mental client vs server' },
      { id: 'composition-patterns', name: 'Patrones de composición' },
      { id: 'streaming-suspense', name: 'Streaming y Suspense' },
      { id: 'client-components-interop', name: 'Interoperabilidad con Client Components' },
      { id: 'performance-optimization', name: 'Optimización de performance' }
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
      { id: 'advanced-types', name: 'Tipos avanzados en TypeScript' },
      { id: 'type-guards-narrowing', name: 'Type Guards y Type Narrowing' },
      { id: 'mapped-conditional-types', name: 'Mapped Types y Conditional Types' },
      { id: 'type-inference', name: 'Inferencia de tipos' },
      { id: 'advanced-generics', name: 'Generics avanzados' },
      { id: 'design-patterns-ts', name: 'Patrones de diseño en TypeScript' }
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
      { id: 'html5-css3-fundamentals', name: 'Fundamentos de HTML5 y CSS3' },
      { id: 'modern-javascript', name: 'JavaScript moderno (ES6+)' },
      { id: 'responsive-bootstrap', name: 'Desarrollo responsivo con Bootstrap 5' },
      { id: 'rest-apis', name: 'APIs REST y consumo de servicios' },
      { id: 'mysql-php', name: 'Bases de datos MySQL y manejo con PHP' },
      { id: 'web-deployment', name: 'Despliegue de aplicaciones web' }
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
      { id: 'react19-features', name: 'React 19 y sus nuevas características' },
      { id: 'server-client-components-react', name: 'Server Components y Client Components' },
      { id: 'nextjs15-app-router', name: 'Next.js 15 App Router' },
      { id: 'react-server-actions', name: 'React Server Actions' },
      { id: 'suspense-data-loading', name: 'Suspense para carga de datos' },
      { id: 'optimization-deployment-react', name: 'Optimización y despliegue' }
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
      { id: 'functional-programming-js', name: 'Programación funcional en JavaScript' },
      { id: 'typescript-advanced-js', name: 'TypeScript avanzado' },
      { id: 'testing-jest-library', name: 'Testing con Jest y Testing Library' },
      { id: 'design-patterns-js', name: 'Patrones de diseño' },
      { id: 'optimization-performance-js', name: 'Optimización y rendimiento' },
      { id: 'nodejs-runtime-advanced', name: 'Node.js y runtime avanzado' }
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
      { id: 'nodejs-fundamentals', name: 'Fundamentos de Node.js' },
      { id: 'express-middlewares', name: 'Express.js y middlewares' },
      { id: 'mongodb-mongoose', name: 'MongoDB y Mongoose' },
      { id: 'jwt-authentication', name: 'JWT y autenticación' },
      { id: 'validation-error-handling', name: 'Validación y manejo de errores' },
      { id: 'cloud-deployment', name: 'Despliegue en la nube' }
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
      { id: 'docker-containerization', name: 'Docker y contenerización' },
      { id: 'kubernetes-basic-advanced', name: 'Kubernetes básico y avanzado' },
      { id: 'cicd-github-actions', name: 'CI/CD con GitHub Actions' },
      { id: 'infrastructure-as-code', name: 'Infraestructura como código' },
      { id: 'monitoring-logging', name: 'Monitoreo y logging' },
      { id: 'devops-security', name: 'Seguridad DevOps' }
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
      { id: 'typescript-type-system', name: 'Sistema de tipos en TypeScript' },
      { id: 'interfaces-advanced-types', name: 'Interfaces y tipos avanzados' },
      { id: 'generics-utility-types', name: 'Genéricos y utility types' },
      { id: 'decorators-metaprogramming', name: 'Decoradores y metaprogramación' },
      { id: 'react-nextjs-integration', name: 'Integración con React y Next.js' },
      { id: 'testing-typescript', name: 'Testing con TypeScript' }
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
      { id: 'angular17-architecture', name: 'Arquitectura de Angular 17' },
      { id: 'components-directives', name: 'Componentes y directivas' },
      { id: 'services-dependency-injection', name: 'Servicios e inyección de dependencias' },
      { id: 'reactive-forms', name: 'Formularios reactivos' },
      { id: 'rxjs-reactive-programming', name: 'RxJS y programación reactiva' },
      { id: 'testing-jasmine-karma', name: 'Testing con Jasmine y Karma' }
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
  },
  'vue': {
    id: 'vue',
    title: 'Vue.js 3: Desarrollo Moderno',
    description: 'Domina Vue.js 3 con Composition API, TypeScript y el ecosistema completo. Aprende a crear aplicaciones SPA escalables y reactivas.',
    level: 'Intermedio',
    duration: '18 horas',
    instructor: 'Carmen López',
    rating: 4.6,
    students: 743,
    price: 64.99,
    updatedAt: '2025-05-20',
    topics: [
      { id: 'vue3-composition-api', name: 'Composition API y reactividad' },
      { id: 'vue-router-vuex', name: 'Vue Router y Pinia' },
      { id: 'vue-typescript', name: 'Vue 3 con TypeScript' },
      { id: 'vue-testing', name: 'Testing en Vue' },
      { id: 'vue-performance', name: 'Optimización y performance' },
      { id: 'vue-deployment', name: 'Despliegue y build' }
    ],
    modules: [
      { id: 1, title: 'Fundamentos de Vue 3', lessons: 6, duration: '2h 30m' },
      { id: 2, title: 'Composition API', lessons: 7, duration: '3h 15m' },
      { id: 3, title: 'Estado y routing', lessons: 6, duration: '3h 00m' },
      { id: 4, title: 'Vue con TypeScript', lessons: 5, duration: '2h 45m' },
      { id: 5, title: 'Testing y debugging', lessons: 4, duration: '2h 10m' },
      { id: 6, title: 'Proyecto completo', lessons: 8, duration: '4h 20m' },
    ]
  },
  'python-fullstack': {
    id: 'python-fullstack',
    title: 'Python Full Stack Developer',
    description: 'Conviértete en desarrollador Full Stack con Python. Django, Flask, APIs REST, bases de datos y despliegue en la nube.',
    level: 'Intermedio a Avanzado',
    duration: '35 horas',
    instructor: 'Diego Morales',
    rating: 4.8,
    students: 1234,
    price: 89.99,
    updatedAt: '2025-03-25',
    topics: [
      { id: 'python-fundamentals', name: 'Python avanzado y buenas prácticas' },
      { id: 'django-framework', name: 'Django y Django REST Framework' },
      { id: 'flask-microservices', name: 'Flask y microservicios' },
      { id: 'database-orm', name: 'Bases de datos y ORM' },
      { id: 'api-development', name: 'Desarrollo de APIs REST' },
      { id: 'deployment-docker', name: 'Despliegue con Docker y AWS' }
    ],
    modules: [
      { id: 1, title: 'Python para web', lessons: 8, duration: '4h 30m' },
      { id: 2, title: 'Django completo', lessons: 12, duration: '8h 15m' },
      { id: 3, title: 'APIs con Django REST', lessons: 10, duration: '6h 20m' },
      { id: 4, title: 'Flask y microservicios', lessons: 8, duration: '5h 10m' },
      { id: 5, title: 'Bases de datos avanzadas', lessons: 6, duration: '4h 25m' },
      { id: 6, title: 'Despliegue y DevOps', lessons: 7, duration: '4h 20m' },
      { id: 7, title: 'Proyecto integrador', lessons: 5, duration: '2h 00m' },
    ]
  },
  'css-advanced': {
    id: 'css-advanced',
    title: 'CSS Avanzado y Animaciones',
    description: 'Domina CSS moderno con Grid, Flexbox, Custom Properties, animaciones y técnicas avanzadas de diseño responsive.',
    level: 'Intermedio',
    duration: '14 horas',
    instructor: 'Isabella Fernández',
    rating: 4.7,
    students: 892,
    price: 49.99,
    updatedAt: '2025-06-01',
    topics: [
      { id: 'css-grid-flexbox', name: 'CSS Grid y Flexbox avanzado' },
      { id: 'css-custom-properties', name: 'Custom Properties y variables' },
      { id: 'css-animations', name: 'Animaciones y transiciones' },
      { id: 'responsive-design', name: 'Diseño responsive avanzado' },
      { id: 'css-architecture', name: 'Arquitectura CSS escalable' },
      { id: 'performance-optimization', name: 'Optimización y performance' }
    ],
    modules: [
      { id: 1, title: 'Layout moderno', lessons: 6, duration: '2h 45m' },
      { id: 2, title: 'Variables y propiedades', lessons: 4, duration: '1h 50m' },
      { id: 3, title: 'Animaciones CSS', lessons: 8, duration: '4h 10m' },
      { id: 4, title: 'Responsive avanzado', lessons: 5, duration: '2h 30m' },
      { id: 5, title: 'Arquitectura CSS', lessons: 4, duration: '1h 45m' },
      { id: 6, title: 'Proyecto práctico', lessons: 3, duration: '1h 00m' },
    ]
  },
  'mobile-react-native': {
    id: 'mobile-react-native',
    title: 'React Native: Apps Multiplataforma',
    description: 'Desarrolla aplicaciones móviles nativas para iOS y Android usando React Native. Desde lo básico hasta publicación en stores.',
    level: 'Intermedio',
    duration: '22 horas',
    instructor: 'Andrés Castillo',
    rating: 4.5,
    students: 567,
    price: 79.99,
    updatedAt: '2025-04-18',
    topics: [
      { id: 'react-native-setup', name: 'Configuración y entorno de desarrollo' },
      { id: 'native-components', name: 'Componentes nativos y navegación' },
      { id: 'state-management-mobile', name: 'Gestión de estado en móvil' },
      { id: 'native-features', name: 'Características nativas del dispositivo' },
      { id: 'performance-mobile', name: 'Optimización y performance' },
      { id: 'app-store-deployment', name: 'Publicación en App Store y Play Store' }
    ],
    modules: [
      { id: 1, title: 'Introducción a React Native', lessons: 5, duration: '2h 20m' },
      { id: 2, title: 'Componentes y navegación', lessons: 8, duration: '4h 15m' },
      { id: 3, title: 'Estado y almacenamiento', lessons: 6, duration: '3h 30m' },
      { id: 4, title: 'APIs nativas', lessons: 7, duration: '4h 00m' },
      { id: 5, title: 'Testing y debugging', lessons: 4, duration: '2h 15m' },
      { id: 6, title: 'Publicación y distribución', lessons: 5, duration: '2h 40m' },
      { id: 7, title: 'Proyecto completo', lessons: 6, duration: '3h 00m' },
    ]
  },
  'graphql-api': {
    id: 'graphql-api',
    title: 'GraphQL: APIs Modernas y Eficientes',
    description: 'Aprende a crear APIs GraphQL escalables con Apollo Server, integrar con bases de datos y implementar subscripciones en tiempo real.',
    level: 'Avanzado',
    duration: '16 horas',
    instructor: 'Valeria Ruiz',
    rating: 4.6,
    students: 445,
    price: 72.99,
    updatedAt: '2025-05-08',
    topics: [
      { id: 'graphql-schema-design', name: 'Diseño de esquemas GraphQL' },
      { id: 'apollo-server', name: 'Apollo Server y resolvers' },
      { id: 'database-integration', name: 'Integración con bases de datos' },
      { id: 'authentication-authorization', name: 'Autenticación y autorización' },
      { id: 'subscriptions-realtime', name: 'Subscripciones en tiempo real' },
      { id: 'performance-optimization', name: 'Optimización y caching' }
    ],
    modules: [
      { id: 1, title: 'Fundamentos de GraphQL', lessons: 5, duration: '2h 10m' },
      { id: 2, title: 'Apollo Server', lessons: 6, duration: '3h 00m' },
      { id: 3, title: 'Resolvers y datos', lessons: 7, duration: '3h 45m' },
      { id: 4, title: 'Autenticación avanzada', lessons: 5, duration: '2h 30m' },
      { id: 5, title: 'Subscripciones', lessons: 4, duration: '2h 15m' },
      { id: 6, title: 'Performance y testing', lessons: 6, duration: '2h 20m' },
    ]
  }
};
