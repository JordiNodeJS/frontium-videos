---
description: "Regla para usar pnpm dlx con shadcn/ui para mantener entorno 100% pnpm"
mode: agent
---

# Regla para instalación de componentes shadcn/ui con pnpm

## Comando obligatorio para shadcn/ui

**Siempre usar `pnpm dlx` al ejecutar comandos de shadcn/ui:**

### ✅ CORRECTO:
```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add card
```

### ❌ INCORRECTO:
```bash
npx shadcn@latest add button
bunx --bun shadcn@latest add button
yarn dlx shadcn@latest add button
```

## Motivación

1. **Entorno 100% pnpm**: Mantiene consistencia en el uso de pnpm como package manager
2. **Optimización de rendimiento**: Aprovecha las optimizaciones específicas de pnpm y eficiencia de espacio
3. **Evita conflictos**: Previene problemas de versiones entre diferentes package managers
4. **Coherencia del proyecto**: Mantiene la política de usar únicamente pnpm en Frontium Videos
5. **Workspace support**: pnpm ofrece mejor soporte para monorepos y workspaces

Esta regla es **obligatoria** para todas las instalaciones de componentes shadcn/ui en el proyecto. 