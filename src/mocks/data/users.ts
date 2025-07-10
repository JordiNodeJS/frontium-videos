export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  bio: string;
  location: string;
  website?: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  joinedDate: string;
  lastActiveDate: string;
  stats: {
    coursesCompleted: number;
    coursesInProgress: number;
    totalWatchTime: number; // en minutos
    streak: number; // días consecutivos de actividad
    certificates: number;
  };
  preferences: {
    language: 'es' | 'en';
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      courseUpdates: boolean;
      achievements: boolean;
    };
  };
  subscription: {
    plan: 'free' | 'premium' | 'pro';
    status: 'active' | 'cancelled' | 'expired';
    startDate: string;
    endDate?: string;
  };
  favoriteCourses: string[]; // IDs de cursos favoritos
  courseProgress: {
    courseId: string;
    progress: number; // 0-100
    lastWatchedLesson: string;
    lastWatchedAt: string;
    timeSpent: number; // en minutos
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
    category: 'learning' | 'social' | 'milestone' | 'special';
  }[];
  badges: string[]; // IDs de badges obtenidos
}

export const mockUsers: User[] = [
  {
    id: "user-001",
    username: "carlos_dev",
    email: "carlos@example.com",
    firstName: "Carlos",
    lastName: "García",
    fullName: "Carlos García",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Desarrollador Full Stack apasionado por React y Next.js. Siempre aprendiendo nuevas tecnologías.",
    location: "Madrid, España",
    website: "https://carlosdev.com",
    socialLinks: {
      twitter: "https://twitter.com/carlos_dev",
      linkedin: "https://linkedin.com/in/carlosgarcia",
      github: "https://github.com/carlosdev"
    },
    joinedDate: "2023-06-15",
    lastActiveDate: "2024-01-15",
    stats: {
      coursesCompleted: 12,
      coursesInProgress: 3,
      totalWatchTime: 2450, // ~40 horas
      streak: 15,
      certificates: 8
    },
    preferences: {
      language: "es",
      theme: "dark",
      notifications: {
        email: true,
        push: true,
        courseUpdates: true,
        achievements: true
      }
    },
    subscription: {
      plan: "premium",
      status: "active",
      startDate: "2023-12-01",
      endDate: "2024-12-01"
    },
    favoriteCourses: ["nextjs-15-complete", "react-hooks-advanced", "typescript-mastery"],
    courseProgress: [
      {
        courseId: "nextjs-15-complete",
        progress: 85,
        lastWatchedLesson: "lesson-12",
        lastWatchedAt: "2024-01-14T20:30:00Z",
        timeSpent: 720
      },
      {
        courseId: "react-hooks-advanced",
        progress: 60,
        lastWatchedLesson: "lesson-8",
        lastWatchedAt: "2024-01-13T19:15:00Z",
        timeSpent: 480
      },
      {
        courseId: "typescript-mastery",
        progress: 30,
        lastWatchedLesson: "lesson-4",
        lastWatchedAt: "2024-01-12T21:00:00Z",
        timeSpent: 240
      }
    ],
    achievements: [
      {
        id: "first-course",
        title: "Primer Curso Completado",
        description: "Has completado tu primer curso en Frontium Videos",
        icon: "🎓",
        unlockedAt: "2023-07-01T10:00:00Z",
        category: "milestone"
      },
      {
        id: "week-streak",
        title: "Racha de 7 días",
        description: "Has estudiado durante 7 días consecutivos",
        icon: "🔥",
        unlockedAt: "2023-09-15T08:30:00Z",
        category: "learning"
      },
      {
        id: "social-sharer",
        title: "Compartidor Social",
        description: "Has compartido tu primer certificado",
        icon: "📢",
        unlockedAt: "2023-08-10T14:20:00Z",
        category: "social"
      }
    ],
    badges: ["early-adopter", "react-expert", "javascript-ninja"]
  },
  {
    id: "user-002",
    username: "ana_frontend",
    email: "ana@example.com",
    firstName: "Ana",
    lastName: "Martínez",
    fullName: "Ana Martínez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    bio: "Frontend Developer especializada en UX/UI. Me encanta crear interfaces hermosas y funcionales.",
    location: "Barcelona, España",
    socialLinks: {
      linkedin: "https://linkedin.com/in/anamartinez",
      github: "https://github.com/ana-frontend"
    },
    joinedDate: "2023-08-20",
    lastActiveDate: "2024-01-14",
    stats: {
      coursesCompleted: 8,
      coursesInProgress: 2,
      totalWatchTime: 1820,
      streak: 7,
      certificates: 5
    },
    preferences: {
      language: "es",
      theme: "light",
      notifications: {
        email: true,
        push: false,
        courseUpdates: true,
        achievements: false
      }
    },
    subscription: {
      plan: "free",
      status: "active",
      startDate: "2023-08-20"
    },
    favoriteCourses: ["css-grid-flexbox", "react-components-design"],
    courseProgress: [
      {
        courseId: "css-grid-flexbox",
        progress: 95,
        lastWatchedLesson: "lesson-15",
        lastWatchedAt: "2024-01-13T18:45:00Z",
        timeSpent: 600
      },
      {
        courseId: "react-components-design",
        progress: 40,
        lastWatchedLesson: "lesson-6",
        lastWatchedAt: "2024-01-12T20:00:00Z",
        timeSpent: 360
      }
    ],
    achievements: [
      {
        id: "first-course",
        title: "Primer Curso Completado",
        description: "Has completado tu primer curso en Frontium Videos",
        icon: "🎓",
        unlockedAt: "2023-09-30T16:00:00Z",
        category: "milestone"
      },
      {
        id: "design-enthusiast",
        title: "Entusiasta del Diseño",
        description: "Has completado 3 cursos de diseño",
        icon: "🎨",
        unlockedAt: "2023-12-15T12:30:00Z",
        category: "learning"
      }
    ],
    badges: ["css-master", "design-lover"]
  },
  {
    id: "user-003",
    username: "miguel_backend",
    email: "miguel@example.com",
    firstName: "Miguel",
    lastName: "Rodríguez",
    fullName: "Miguel Rodríguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Backend Engineer con experiencia en Node.js, Python y bases de datos. Mentor en desarrollo web.",
    location: "Valencia, España",
    website: "https://migueldev.tech",
    socialLinks: {
      twitter: "https://twitter.com/miguel_backend",
      linkedin: "https://linkedin.com/in/miguelrodriguez",
      github: "https://github.com/miguel-backend"
    },
    joinedDate: "2023-05-10",
    lastActiveDate: "2024-01-15",
    stats: {
      coursesCompleted: 20,
      coursesInProgress: 4,
      totalWatchTime: 3650,
      streak: 25,
      certificates: 15
    },
    preferences: {
      language: "es",
      theme: "system",
      notifications: {
        email: true,
        push: true,
        courseUpdates: true,
        achievements: true
      }
    },
    subscription: {
      plan: "pro",
      status: "active",
      startDate: "2023-06-01",
      endDate: "2024-06-01"
    },
    favoriteCourses: ["nodejs-advanced", "database-optimization", "docker-kubernetes"],
    courseProgress: [
      {
        courseId: "nodejs-advanced",
        progress: 100,
        lastWatchedLesson: "lesson-20",
        lastWatchedAt: "2024-01-10T22:00:00Z",
        timeSpent: 900
      },
      {
        courseId: "database-optimization",
        progress: 75,
        lastWatchedLesson: "lesson-12",
        lastWatchedAt: "2024-01-14T19:30:00Z",
        timeSpent: 540
      },
      {
        courseId: "docker-kubernetes",
        progress: 50,
        lastWatchedLesson: "lesson-8",
        lastWatchedAt: "2024-01-13T21:15:00Z",
        timeSpent: 420
      }
    ],
    achievements: [
      {
        id: "first-course",
        title: "Primer Curso Completado",
        description: "Has completado tu primer curso en Frontium Videos",
        icon: "🎓",
        unlockedAt: "2023-06-15T09:00:00Z",
        category: "milestone"
      },
      {
        id: "power-learner",
        title: "Aprendiz Avanzado",
        description: "Has completado 10 cursos",
        icon: "⚡",
        unlockedAt: "2023-11-20T15:45:00Z",
        category: "milestone"
      },
      {
        id: "month-streak",
        title: "Racha de 30 días",
        description: "Has estudiado durante 30 días consecutivos",
        icon: "🌟",
        unlockedAt: "2023-12-25T20:00:00Z",
        category: "learning"
      },
      {
        id: "mentor",
        title: "Mentor",
        description: "Has ayudado a 10 estudiantes",
        icon: "👨‍🏫",
        unlockedAt: "2024-01-05T11:30:00Z",
        category: "social"
      }
    ],
    badges: ["backend-expert", "nodejs-ninja", "mentor-gold", "early-adopter"]
  },
  {
    id: "user-004",
    username: "sofia_designer",
    email: "sofia@example.com",
    firstName: "Sofía",
    lastName: "López",
    fullName: "Sofía López",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    bio: "UX/UI Designer convertida a desarrolladora. Me apasiona la intersección entre diseño y código.",
    location: "Sevilla, España",
    socialLinks: {
      twitter: "https://twitter.com/sofia_designer",
      linkedin: "https://linkedin.com/in/sofialopez"
    },
    joinedDate: "2023-09-05",
    lastActiveDate: "2024-01-13",
    stats: {
      coursesCompleted: 6,
      coursesInProgress: 3,
      totalWatchTime: 1240,
      streak: 5,
      certificates: 4
    },
    preferences: {
      language: "es",
      theme: "light",
      notifications: {
        email: false,
        push: true,
        courseUpdates: false,
        achievements: true
      }
    },
    subscription: {
      plan: "premium",
      status: "active",
      startDate: "2023-10-01",
      endDate: "2024-10-01"
    },
    favoriteCourses: ["figma-to-code", "design-systems"],
    courseProgress: [
      {
        courseId: "figma-to-code",
        progress: 80,
        lastWatchedLesson: "lesson-10",
        lastWatchedAt: "2024-01-12T17:20:00Z",
        timeSpent: 480
      },
      {
        courseId: "design-systems",
        progress: 65,
        lastWatchedLesson: "lesson-9",
        lastWatchedAt: "2024-01-11T19:45:00Z",
        timeSpent: 390
      }
    ],
    achievements: [
      {
        id: "first-course",
        title: "Primer Curso Completado",
        description: "Has completado tu primer curso en Frontium Videos",
        icon: "🎓",
        unlockedAt: "2023-10-20T14:30:00Z",
        category: "milestone"
      },
      {
        id: "design-to-code",
        title: "De Diseño a Código",
        description: "Has completado tu primer curso de desarrollo",
        icon: "🎨➡️💻",
        unlockedAt: "2023-12-01T16:00:00Z",
        category: "special"
      }
    ],
    badges: ["design-expert", "career-changer"]
  },
  {
    id: "user-005",
    username: "david_student",
    email: "david@example.com",
    firstName: "David",
    lastName: "Pérez",
    fullName: "David Pérez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    bio: "Estudiante de Ingeniería Informática. Aprendiendo desarrollo web para mi futuro profesional.",
    location: "Bilbao, España",
    socialLinks: {
      github: "https://github.com/david-student"
    },
    joinedDate: "2024-01-01",
    lastActiveDate: "2024-01-15",
    stats: {
      coursesCompleted: 1,
      coursesInProgress: 2,
      totalWatchTime: 320,
      streak: 12,
      certificates: 1
    },
    preferences: {
      language: "es",
      theme: "dark",
      notifications: {
        email: true,
        push: true,
        courseUpdates: true,
        achievements: true
      }
    },
    subscription: {
      plan: "free",
      status: "active",
      startDate: "2024-01-01"
    },
    favoriteCourses: ["javascript-fundamentals"],
    courseProgress: [
      {
        courseId: "javascript-fundamentals",
        progress: 100,
        lastWatchedLesson: "lesson-16",
        lastWatchedAt: "2024-01-08T20:30:00Z",
        timeSpent: 960
      },
      {
        courseId: "html-css-basics",
        progress: 70,
        lastWatchedLesson: "lesson-12",
        lastWatchedAt: "2024-01-14T18:00:00Z",
        timeSpent: 420
      }
    ],
    achievements: [
      {
        id: "welcome",
        title: "¡Bienvenido!",
        description: "Te has registrado en Frontium Videos",
        icon: "👋",
        unlockedAt: "2024-01-01T10:00:00Z",
        category: "milestone"
      },
      {
        id: "first-course",
        title: "Primer Curso Completado",
        description: "Has completado tu primer curso en Frontium Videos",
        icon: "🎓",
        unlockedAt: "2024-01-08T21:00:00Z",
        category: "milestone"
      }
    ],
    badges: ["newcomer", "javascript-learner"]
  }
];

// Función helper para obtener todos los usuarios
export const getAllUsers = (): User[] => {
  return mockUsers;
};

// Función helper para obtener un usuario por ID
export const getUserById = (userId: string): User | null => {
  return mockUsers.find(user => user.id === userId) || null;
};

// Función helper para obtener usuarios por plan de suscripción
export const getUsersByPlan = (plan: User['subscription']['plan']): User[] => {
  return mockUsers.filter(user => user.subscription.plan === plan);
};

// Función helper para obtener el progreso total de un usuario
export const getUserTotalProgress = (userId: string): number => {
  const user = getUserById(userId);
  if (!user || user.courseProgress.length === 0) return 0;
  
  const totalProgress = user.courseProgress.reduce((sum: number, course) => sum + course.progress, 0);
  return Math.round(totalProgress / user.courseProgress.length);
};

// Función helper para obtener las estadísticas globales
export const getGlobalStats = () => {
  const totalUsers = mockUsers.length;
  const totalCompletedCourses = mockUsers.reduce((sum: number, user: User) => sum + user.stats.coursesCompleted, 0);
  const totalWatchTime = mockUsers.reduce((sum: number, user: User) => sum + user.stats.totalWatchTime, 0);
  const averageStreak = Math.round(mockUsers.reduce((sum: number, user: User) => sum + user.stats.streak, 0) / totalUsers);
  
  return {
    totalUsers,
    totalCompletedCourses,
    totalWatchTime,
    averageStreak
  };
}; 