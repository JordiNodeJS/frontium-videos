'use client'

import { useMemo } from "react";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { navigationConfig } from "./navigation-config";
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
  // Usando navigationConfig con IDs generados automáticamente
  const renderedGroups = useMemo(() => {
    return navigationConfig.map((group) => (
      <OptimizedSidebarGroup 
        key={group.id}
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