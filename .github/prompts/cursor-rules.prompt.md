---
description: "Reglas específicas para Cursor AI en el proyecto Frontium Videos"
mode: agent
---

# Cursor Rules - Frontium Videos

## Stack Tecnológico Obligatorio

### Framework y Runtime
- **Next.js 15** - Solo App Router, nunca Pages Router
- **React 18** - Server Components por defecto, Client Components solo cuando sea necesario
- **TypeScript** - Configuración estricta
- **pnpm** - Package manager exclusivo

### Herramientas de Desarrollo
- **ESLint** - Flat config con reglas de Next.js
- **Prettier** - Formateo automático
- **Tailwind CSS** - Para estilos (opcional)

## Patrones de Código Obligatorios

### 1. Server Components por Defecto
```tsx
// ✅ CORRECTO - Server Component
export default async function Page() {
  const data = await fetch('api/data', { cache: 'force-cache' });
  return <div>{/* UI */}</div>;
}
```

### 2. Client Components Solo Cuando Necesario
```tsx
// ✅ CORRECTO - Client Component para interactividad
'use client'
import { useState } from 'react';

export default function InteractiveComponent() {
  const [state, setState] = useState('');
  return <div>{/* Interactive UI */}</div>;
}
```

### 3. Importaciones React Explícitas
```tsx
// ✅ CORRECTO
import { useState, FormEvent, ChangeEvent } from 'react';

// ❌ INCORRECTO
import React from 'react';
const handleSubmit = (e: React.FormEvent) => {};
```

## Convenciones de Naming

### Archivos y Componentes
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Páginas**: kebab-case (`user-profile/page.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useAuthState`)
- **Server Actions**: camelCase (`createPost`)
- **Tipos**: PascalCase (`UserProfile`)

### Estructura de Proyecto
```
src/app/              # App Router (OBLIGATORIO)
├── layout.tsx       # Root layout (REQUERIDO)
├── page.tsx         # Home page
├── globals.css      # Global styles
└── components/      # Reusable components
```

## Package Manager

### Comandos pnpm Obligatorios
```bash
# Instalación
pnpm install

# Desarrollo (puerto 4000)
pnpm dev

# Build
pnpm build

# Ejecutables
pnpm dlx <package>

# Shadcn/ui components
pnpm dlx shadcn@latest add button
```

### ❌ Prohibido usar npm/yarn/bun
```bash
# NO USAR
npm install
yarn add
bun install
bunx --bun
```

## Git Commits

### Formato Obligatorio (Inglés)
```bash
feat: add user authentication
fix: resolve hydration issue
docs: update setup guide
style: format with prettier
refactor: extract auth logic
test: add user tests
chore: update dependencies
```

## Data Fetching

### Server-Side (Recomendado)
```tsx
export default async function Page() {
  const data = await fetch('api/data', { cache: 'force-cache' });
  return <div>{/* UI */}</div>;
}
```

### Parallel Fetching
```tsx
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  return <div>{/* UI with both data */}</div>;
}
```

## TypeScript Rules

### Configuración Estricta Obligatoria
- Always use explicit types for props
- Use interfaces for complex objects
- Never use 'any' type
- Configure strict mode

### Ejemplo de Props
```tsx
interface ComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default function Component({ title, items, onSelect }: ComponentProps) {
  // implementation
}
```

## Performance

### Optimizaciones Obligatorias
- Use Next.js Image component for images
- Implement loading states with `loading.tsx`
- Use Error boundaries with `error.tsx`
- Implement Suspense for streaming

### Security
- Validate Server Actions with zod
- Check authorization in Server Actions
- Never expose secrets client-side

---

**IMPORTANTE**: Seguir estas reglas estrictamente para todas las generaciones y modificaciones de código en Frontium Videos. 