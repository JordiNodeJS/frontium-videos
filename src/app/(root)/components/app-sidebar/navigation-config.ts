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

/**
 * Genera ID único: "Mi Perfil" → "mi-perfil-8f2a"
 */
function createId(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const hex = crypto.getRandomValues(new Uint8Array(2))
    .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
  
  return `${base}-${hex}`;
}



/**
 * Función helper para crear la navegación con IDs automáticos
 * ¡Solo 3 líneas de código por item!
 */
function createNavigation() {
  const groups = [
    {
      label: "General",
      items: [
        { title: "Inicio", url: "/", icon: Home },
        { title: "Buscar Cursos", url: "/courses", icon: Search },
        { title: "Calendario", url: "/calendar", icon: Calendar },
      ],
    },
    {
      label: "Cursos",
      items: [
        { title: "Mis Cursos", url: "/courses/my", icon: BookOpen },
        { title: "Catálogo", url: "/courses/catalog", icon: Video },
        { title: "Progreso", url: "/courses/progress", icon: BarChart3 },
        { title: "Certificados", url: "/courses/certificates", icon: Award },
      ],
    },
    {
      label: "Profesorado",
      items: [
        { title: "Panel de Control", url: "/teacher/dashboard", icon: BarChart3 },
        { title: "Mis Cursos", url: "/teacher/courses", icon: BookOpen },
        { title: "Crear Curso", url: "/teacher/courses/create", icon: FileText },
        { title: "Estudiantes", url: "/teacher/students", icon: Users },
        { title: "Mensajes", url: "/teacher/messages", icon: MessageSquare },
      ],
    },
    {
      label: "Alumno",
      items: [
        { title: "Mi Perfil", url: "/profile", icon: User },
        { title: "Mis Cursos", url: "/student/courses", icon: GraduationCap },
        { title: "Progreso", url: "/student/progress", icon: BarChart3 },
        { title: "Notificaciones", url: "/student/notifications", icon: Bell },
        { title: "Configuración", url: "/student/settings", icon: Settings },
      ],
    },
  ];

  // ✨ Magia simple: añadir IDs automáticamente
  return groups.map(group => ({
    id: createId(group.label),
    label: group.label,
    items: group.items.map(item => ({
      id: createId(item.title),
      title: item.title,
      url: item.url,
      icon: item.icon,
    }))
  }));
}

// 🎯 Configuración de navegación con IDs generados automáticamente
export const navigationConfig: NavigationData = createNavigation();