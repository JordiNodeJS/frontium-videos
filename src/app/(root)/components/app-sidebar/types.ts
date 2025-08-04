import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  id: string;
  label: string;
  items: NavigationItem[];
}

export type NavigationData = NavigationGroup[];