'use client'

import { memo } from "react";
import Link from "next/link";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { NavigationItem } from "./types";

interface SidebarMenuItemProps {
  item: NavigationItem;
  isActive: boolean;
}

/**
 * Componente optimizado para renderizar un item del menú del sidebar
 * Utiliza React.memo para evitar re-renders innecesarios
 */
export const OptimizedSidebarMenuItem = memo<SidebarMenuItemProps>(({ 
  item, 
  isActive 
}) => {
  const IconComponent = item.icon;
  
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.url}>
          <IconComponent className="h-4 w-4" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
});

OptimizedSidebarMenuItem.displayName = 'OptimizedSidebarMenuItem';