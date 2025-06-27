# Cursor Rules - Frontium Videos

## 🎯 Reglas Específicas de Cursor

### Package Manager y Comandos
- **SIEMPRE** usar `bun` y `bunx` [[memory:3678609492168897462]]
- Puerto de desarrollo: **4000**
- Comandos Git: **SIEMPRE en inglés**
- Respuestas del asistente: **SIEMPRE en español** (excepto commits)

### Tecnologías Obligatorias
- ✅ Next.js 15 con App Router
- ✅ TypeScript
- ✅ bun como package manager
- ✅ ESLint flat config
- ✅ Prettier
- ❌ NUNCA Pages Router
- ❌ NUNCA npm/yarn/pnpm

### Estructura de Archivos Requerida
```
src/app/                 # App Router obligatorio
├── layout.tsx          # Root layout (REQUERIDO)
├── page.tsx           # Home page
├── globals.css        # Estilos globales
└── (rutas)/           # Páginas organizadas
```

### Patrones de Código Obligatorios

#### Server Components (Por Defecto)
```tsx
// ✅ SIEMPRE así por defecto
export default async function Page() {
  const data = await fetch(/* ... */);
  return <div>{/* UI */}</div>;
}
```

#### Client Components (Solo cuando necesario)
```tsx
'use client' // ✅ SIEMPRE al inicio

export default function InteractiveComponent() {
  // ✅ Hooks permitidos aquí
  return <div>{/* UI interactiva */}</div>;
}
```

### Reglas de Importación
```tsx
// 1. React
import { useState } from 'react';

// 2. Next.js
import Link from 'next/link';

// 3. Librerías externas
import { clsx } from 'clsx';

// 4. Internos (absolute path)
import { Button } from '@/components/ui/button';

// 5. Relativos
import './styles.css';
```

### Naming Conventions
- **Componentes**: `PascalCase` (`UserProfile.tsx`)
- **Páginas**: `kebab-case` (`user-profile/page.tsx`)
- **Hooks**: `camelCase` con `use` (`useAuthState`)
- **Server Actions**: `camelCase` (`createPost`)
- **Tipos**: `PascalCase` (`UserProfile`)

### Git Commit Format (INGLÉS)
```
feat: add user authentication
fix: resolve hydration issue
docs: update setup guide
style: format with prettier
refactor: extract auth logic
test: add user tests
chore: update dependencies
```

### TypeScript Obligatorio
- **SIEMPRE** tipar props explícitamente
- **SIEMPRE** usar interfaces para objetos complejos
- **NUNCA** usar `any`

### Performance Rules
- ✅ Usar `Image` de Next.js para imágenes
- ✅ Implementar loading states
- ✅ Usar Server Components para fetch de datos
- ✅ Implementar error boundaries
- ❌ NUNCA fetch en useEffect si puede ser server-side

### Security Rules
- ✅ Validar Server Actions con zod
- ✅ Verificar autorización en Server Actions
- ❌ NUNCA exponer secrets en client-side

---

**Estas reglas son OBLIGATORIAS para mantener consistencia en el proyecto.** 