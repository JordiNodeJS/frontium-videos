---
description: "Regla para usar bunx --bun con shadcn/ui para mantener entorno 100% Bun"
mode: agent
---

# Regla para instalación de componentes shadcn/ui con Bun

## Comando obligatorio para shadcn/ui

**Siempre usar `bunx --bun` al ejecutar comandos de shadcn/ui:**

### ✅ CORRECTO:
```bash
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add dialog
```

### ❌ INCORRECTO:
```bash
npx shadcn@latest add button
bunx shadcn@latest add button
```

## Motivación

1. **Entorno 100% Bun**: Mantiene consistencia en el uso de Bun como runtime y package manager
2. **Optimización de rendimiento**: Aprovecha las optimizaciones específicas de Bun
3. **Evita conflictos**: Previene problemas de versiones entre npm y bun
4. **Coherencia del proyecto**: Mantiene la política de usar únicamente Bun en Frontium Videos

Esta regla es **obligatoria** para todas las instalaciones de componentes shadcn/ui en el proyecto. 