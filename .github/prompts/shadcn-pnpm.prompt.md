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
```

### ❌ INCORRECTO:
```bash
npx shadcn@latest add button
bunx --bun shadcn@latest add button
```

## Motivación

1. **Entorno 100% pnpm**: Mantiene consistencia en el uso de pnpm como package manager
2. **Optimización de rendimiento**: Aprovecha la deduplicación y workspace support de pnpm
3. **Evita conflictos**: Previene problemas de versiones entre diferentes gestores
4. **Coherencia del proyecto**: Mantiene la política de usar únicamente pnpm en Frontium Videos

Esta regla es **obligatoria** para todas las instalaciones de componentes shadcn/ui en el proyecto. 