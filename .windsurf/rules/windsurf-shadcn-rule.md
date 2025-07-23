# Regla ShadCN/UI para Windsurf - Frontium Videos

## Uso de bunx --bun para ShadCN/UI (OBLIGATORIO)

### Descripción
En el proyecto Frontium Videos que utiliza Bun como package manager exclusivo, es **OBLIGATORIO** usar el comando `bunx --bun` para todas las operaciones con ShadCN/UI, manteniendo un entorno 100% Bun.

### Comando Correcto

#### ✅ CORRECTO
```bash
# Instalación de componentes
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add form
bunx --bun shadcn@latest add card
bunx --bun shadcn@latest add table
bunx --bun shadcn@latest add badge
bunx --bun shadcn@latest add progress

# Inicialización del proyecto
bunx --bun shadcn@latest init

# Actualización de componentes
bunx --bun shadcn@latest update
```

#### ❌ PROHIBIDO
```bash
# NO USAR npm
npx shadcn@latest add button

# NO USAR bunx sin --bun
bunx shadcn@latest add button

# NO USAR yarn
yarn dlx shadcn@latest add button

# NO USAR pnpm
pnpm dlx shadcn@latest add button
```

## Motivación

1. **Entorno 100% Bun**: Mantiene consistencia total en el uso de Bun como runtime y package manager
2. **Optimización de rendimiento**: Aprovecha las optimizaciones específicas de Bun para máxima velocidad
3. **Evita conflictos**: Previene problemas de versiones y dependencias entre diferentes package managers
4. **Coherencia del proyecto**: Mantiene la política estricta de usar únicamente Bun en Frontium Videos
5. **Compatibilidad**: Asegura que todos los componentes se instalen correctamente con las dependencias de Bun

## Aplicación Obligatoria

Esta regla se aplica a **TODAS** las operaciones con ShadCN/UI:

- **Instalación inicial** de componentes
- **Añadir nuevos componentes** durante el desarrollo
- **Actualización** de componentes existentes
- **Configuración inicial** del proyecto ShadCN/UI
- **Reinstalación** de componentes

## Configuración Inicial del Proyecto

Para configurar ShadCN/UI por primera vez en Frontium Videos:

```bash
# 1. Inicializar ShadCN/UI
bunx --bun shadcn@latest init

# 2. Añadir componentes básicos para la plataforma de cursos
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add card
bunx --bun shadcn@latest add dialog
bunx --bun shadcn@latest add form
bunx --bun shadcn@latest add table
bunx --bun shadcn@latest add tabs
bunx --bun shadcn@latest add avatar
bunx --bun shadcn@latest add badge
bunx --bun shadcn@latest add progress
```

## Estructura de Componentes

Los componentes ShadCN/UI se instalan en:

```
src/
└── components/
    └── ui/              # Componentes ShadCN/UI
        ├── button.tsx
        ├── input.tsx
        ├── card.tsx
        └── ...
```

## Importación de Componentes

Seguir el patrón de importación con alias:

```tsx
// ✅ CORRECTO
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// ❌ INCORRECTO
import { Button } from '../components/ui/button';
import { Input } from './ui/input';
```

---

**IMPORTANTE**: Esta regla es **obligatoria** para mantener la consistencia del entorno de desarrollo en Frontium Videos. Cualquier instalación de componentes ShadCN/UI que no siga esta regla debe ser corregida.

**Aplica a todos los asistentes de IA**: Cursor AI, GitHub Copilot, Windsurf y cualquier otro AI que opere sobre este repositorio.
