'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
  } from "@/components/ui/sidebar"
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
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const groupedItems = [
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

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  };

  return (
    <Sidebar>
      <SidebarContent>
        {groupedItems.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  const active = isActive(item.url);
                  
                  return (
                    <SidebarMenuItem key={itemIndex}>
                      <SidebarMenuButton asChild isActive={active}>
                        <Link href={item.url}>
                          <IconComponent className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}