import { LucideIcon } from "lucide-react";

export interface NavigationSubItem {
  id: string;
  title: string;
  url: string;
}

export interface NavigationItem {
  id: string;
  title: string;
  url?: string; // Opcional cuando tiene subItems
  icon: LucideIcon;
  subItems?: NavigationSubItem[]; // Opcional para submenús
}

export interface NavigationGroup {
  id: string;
  label: string;
  items: NavigationItem[];
}

export type NavigationData = NavigationGroup[];