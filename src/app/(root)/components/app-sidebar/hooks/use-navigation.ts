'use client'

import { usePathname } from "next/navigation";
import { useCallback } from "react";

export function useNavigation() {
  const pathname = usePathname();

  /**
   * Determina si una URL está activa basándose en la ruta actual
   * @param url - La URL a verificar
   * @returns true si la URL está activa
   */
  const isActive = useCallback((url: string): boolean => {
    if (url === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(url);
  }, [pathname]);

  return {
    pathname,
    isActive,
  };
}