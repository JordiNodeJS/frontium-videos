'use client'

import { useMemo } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { navigationData } from "./navigation-data";
import { useNavigation } from "./hooks/use-navigation";
import { OptimizedSidebarGroup } from "./sidebar-group";

/**
 * Componente principal del sidebar de la aplicación
 * Renderiza la navegación completa con optimizaciones de rendimiento
 */
export function AppSidebar() {
  const { isActive } = useNavigation();

  // ✅ OPTIMIZACIÓN: useMemo para el array de grupos renderizados
  // Evita recrear el array en cada render, solo cuando isActive cambia
  const renderedGroups = useMemo(() => {
    return navigationData.map((group, groupIndex) => (
      <OptimizedSidebarGroup 
        key={`group-${groupIndex}`}
        group={group}
        isActive={isActive}
      />
    ));
  }, [isActive]);

  return (
    <Sidebar>
      <SidebarContent>
        {renderedGroups}
      </SidebarContent>
    </Sidebar>
  );
}