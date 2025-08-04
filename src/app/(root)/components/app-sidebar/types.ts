import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

export interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}

export type NavigationData = NavigationGroup[];