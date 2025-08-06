'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton
} from "@/components/ui/sidebar";
import { navigationConfig } from "./nav-data";

/**
 * Componente principal del sidebar de la aplicación
 * Versión simplificada sin optimizaciones para mayor claridad
 */
export function AppSidebar() {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Función mejorada para determinar si una URL está activa
  const isActive = (url: string): boolean => {
    if (url === "/") {
      return pathname === "/";
    }
    // Comparación exacta: solo activo si es exactamente la URL o una ruta hija directa
    return pathname === url;
  };

  // Función para alternar el estado expandido de un item
  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  // Función para expandir automáticamente si un sub-item está activo
  const shouldAutoExpand = (subItems: { url: string }[]) => {
    return subItems.some(subItem => isActive(subItem.url));
  };

  return (
    <Sidebar>
      <SidebarContent>
        {navigationConfig.map((group) => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const IconComponent = item.icon;
                  
                  // Si el item tiene subItems, renderizar submenú desplegable
                  if (item.subItems && item.subItems.length > 0) {
                    // Verificar si algún sub-item está activo y expandir automáticamente
                    const hasActiveSubItem = shouldAutoExpand(item.subItems);
                    const isExpanded = expandedItems.has(item.id) || hasActiveSubItem;
                    
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton 
                          isActive={false} // El botón padre nunca se marca como activo
                          onClick={() => toggleExpanded(item.id)}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.title}</span>
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          ) : (
                            <ChevronRight className="h-4 w-4 ml-auto" />
                          )}
                        </SidebarMenuButton>
                        {isExpanded && (
                          <SidebarMenuSub>
                            {item.subItems.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton asChild isActive={isActive(subItem.url)}>
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        )}
                      </SidebarMenuItem>
                    );
                  }

                  // Si no tiene subItems, renderizar como antes
                  const itemIsActive = isActive(item.url!);
                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild isActive={itemIsActive}>
                        <Link href={item.url!}>
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
  );
}