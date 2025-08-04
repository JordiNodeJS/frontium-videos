import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  User, 
  Home, 
  Search, 
  Calendar, 
  Settings, 
  BarChart3,
  Video,
  FileText,
  Award,
  MessageSquare,
  Bell
} from "lucide-react";
import { NavigationData } from "./types";

export const navigationData: NavigationData = [
  {
    id: "general-nav",
    label: "General",
    items: [
      { id: "home", title: "Inicio", url: "/", icon: Home },
      { id: "search-courses", title: "Buscar Cursos", url: "/courses", icon: Search },
      { id: "calendar", title: "Calendario", url: "/calendar", icon: Calendar },
    ],
  },
  {
    id: "courses-nav",
    label: "Cursos",
    items: [
      { id: "my-courses", title: "Mis Cursos", url: "/courses/my", icon: BookOpen },
      { id: "course-catalog", title: "Catálogo", url: "/courses/catalog", icon: Video },
      { id: "course-progress", title: "Progreso", url: "/courses/progress", icon: BarChart3 },
      { id: "certificates", title: "Certificados", url: "/courses/certificates", icon: Award },
    ],
  },
  {
    id: "teacher-nav",
    label: "Profesorado",
    items: [
      { id: "teacher-dashboard", title: "Panel de Control", url: "/teacher/dashboard", icon: BarChart3 },
      { id: "teacher-courses", title: "Mis Cursos", url: "/teacher/courses", icon: BookOpen },
      { id: "create-course", title: "Crear Curso", url: "/teacher/courses/create", icon: FileText },
      { id: "students", title: "Estudiantes", url: "/teacher/students", icon: Users },
      { id: "teacher-messages", title: "Mensajes", url: "/teacher/messages", icon: MessageSquare },
    ],
  },
  {
    id: "student-nav",
    label: "Alumno",
    items: [
      { id: "profile", title: "Mi Perfil", url: "/profile", icon: User },
      { id: "student-courses", title: "Mis Cursos", url: "/student/courses", icon: GraduationCap },
      { id: "student-progress", title: "Progreso", url: "/student/progress", icon: BarChart3 },
      { id: "notifications", title: "Notificaciones", url: "/student/notifications", icon: Bell },
      { id: "settings", title: "Configuración", url: "/student/settings", icon: Settings },
    ],
  },
];