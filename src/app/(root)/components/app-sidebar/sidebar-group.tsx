'use client'

import { memo } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavigationGroup } from "./types";
import { OptimizedSidebarMenuItem } from "./sidebar-menu-item";

interface SidebarGroupProps {
  group: NavigationGroup;
  isActive: (url: string) => boolean;
}

/**
 * Componente optimizado para renderizar un grupo del sidebar
 * Maneja la renderización de todos los items dentro del grupo
 */
export const OptimizedSidebarGroup = memo<SidebarGroupProps>(({ 
  group, 
  isActive 
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {group.label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => (
            <OptimizedSidebarMenuItem 
              key={item.id}
              item={item}
              isActive={isActive(item.url)}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
});

OptimizedSidebarGroup.displayName = 'OptimizedSidebarGroup';