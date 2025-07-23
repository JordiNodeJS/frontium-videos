# Reglas de IA y Codificación para Windsurf y Frontium Videos

## 1. Reglas Generales de Windsurf

### Acceso a Rutas en Windows
- **Usa siempre la ruta exactamente como está autorizada**, respetando mayúsculas/minúsculas en la letra de la unidad y el resto del path.
- **Siempre utiliza la letra de la unidad en mayúsculas** al especificar rutas de archivos o carpetas en Windows.
  - **Ejemplo correcto:** `G:\DEV\academia\frontium-videos`
  - **Ejemplo incorrecto:** `g:\DEV\academia\frontium-videos`

### Interacción y Comunicación
- **Respuestas del asistente:** SIEMPRE en español (excepto commits y código).
- **Comandos Git:** SIEMPRE en inglés y siguiendo el formato Conventional Commits.

---

## 2. Reglas Específicas del Proyecto (Frontium Videos)

Estas reglas se extraen de `.github/prompts/` y son de obligado cumplimiento.

### 2.1. Configuración del Proyecto y Tecnologías

#### Package Manager (OBLIGATORIO)
- **SIEMPRE** usar `bun` como package manager exclusivo
- Comandos permitidos: `bun install`, `bun dev`, `bun build`, `bun start`
- Para paquetes ejecutables: `bunx <package>`
- **Puerto de desarrollo:** `4000`
- **❌ PROHIBIDO:** `npm`, `yarn`, `pnpm`

#### Stack Tecnológico
- **Next.js 15** - Solo App Router, nunca Pages Router
- **React 18** - Server Components por defecto
- **TypeScript** - Configuración estricta obligatoria
- **ESLint** - Flat config (`eslint.config.mjs`)
- **Prettier** - Formateo automático
- **Tailwind CSS** - Para estilos (opcional)

### 2.2. Estructura de Directorios
```
frontium-videos/
├── .github/
│   └── prompts/           # Reglas de codificación
├── src/
│   └── app/              # App Router (OBLIGATORIO)
│       ├── layout.tsx    # Root layout (REQUERIDO)
│       ├── page.tsx      # Página principal
│       ├── globals.css   # Estilos globales
│       └── components/   # Componentes reutilizables
├── public/               # Assets estáticos
├── package.json
├── next.config.ts        # Configuración TypeScript
├── tsconfig.json
├── eslint.config.mjs     # ESLint flat config
└── postcss.config.mjs
```

### 2.3. Arquitectura Next.js 15

#### App Router (OBLIGATORIO)
- **USAR SOLO** App Router, nunca Pages Router
- Estructura basada en sistema de archivos en `src/app/`
- Convenciones de archivos:
  - `layout.tsx` - Layout compartido
  - `page.tsx` - Página de ruta
  - `loading.tsx` - UI de carga
  - `error.tsx` - UI de error
  - `not-found.tsx` - Página 404
  - `route.ts` - API endpoints

#### Server Components vs Client Components

**Server Components (Por Defecto)**
```tsx
// Server Component - NO usar 'use client'
export default async function ServerPage() {
  // ✅ Fetch de datos directo
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache' // o 'no-store' para datos dinámicos
  });
  
  return <div>{/* UI */}</div>;
}
```

**Client Components (Solo cuando sea necesario)**
```tsx
'use client' // ✅ Al inicio del archivo

import { useState } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState('');
  return <div>{/* Interactive UI */}</div>;
}
```

### 2.4. Reglas de Importación React (OBLIGATORIO)

#### ✅ CORRECTO - Importación explícita
```tsx
import { useState, useEffect, FormEvent, ChangeEvent, FC, ReactNode } from 'react';

export default function Component() {
  const [state, setState] = useState(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
}
```

#### ❌ INCORRECTO - Namespace React
```tsx
import React from 'react';

export default function Component() {
  const [state, setState] = React.useState(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
}
```

### 2.5. Naming Conventions

- **Componentes:** `PascalCase` (ej. `UserProfile.tsx`)
- **Páginas (directorio):** `kebab-case` (ej. `user-profile/page.tsx`)
- **Hooks:** `camelCase` con prefijo `use` (ej. `useAuthState`)
- **Server Actions:** `camelCase` (ej. `createPost`)
- **Tipos e Interfaces:** `PascalCase` (ej. `UserProfile`)

### 2.6. Orden de Importaciones

1. Imports de React (`import { useState } from 'react';`)
2. Imports de Next.js (`import Link from 'next/link';`)
3. Imports de librerías externas (`import { clsx } from 'clsx';`)
4. Imports internos con alias (`import { Button } from '@/components/ui/button';`)
5. Imports relativos (`import './styles.css';`)

### 2.7. TypeScript (Configuración Estricta)

- **Tipado estricto:** SIEMPRE tipar props y variables. NUNCA usar `any`
- **Interfaces para objetos complejos:** Usar `interface` para definir la forma de los objetos
- **Props explícitas:**

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

### 2.8. ShadCN/UI con Bun (OBLIGATORIO)

#### ✅ CORRECTO
```bash
bunx --bun shadcn@latest add button
bunx --bun shadcn@latest add input
bunx --bun shadcn@latest add dialog
```

#### ❌ INCORRECTO
```bash
npx shadcn@latest add button
bunx shadcn@latest add button
```

### 2.9. Data Fetching

#### Server-Side (Recomendado)
```tsx
export default async function Page() {
  const data = await fetch('api/data', { cache: 'force-cache' });
  return <div>{/* UI */}</div>;
}
```

#### Parallel Fetching
```tsx
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  return <div>{/* UI with both data */}</div>;
}
```

### 2.10. Server Actions

```tsx
'use server'

import { z } from 'zod';

const CreatePostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export async function createPost(formData: FormData) {
  const result = CreatePostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Crear post...
}
```

### 2.11. Git y Commits (Inglés)

**Formato Obligatorio (Conventional Commits):**
```bash
feat: add user authentication
fix: resolve hydration issue
docs: update setup guide
style: format with prettier
refactor: extract auth logic
test: add user tests
chore: update dependencies
```

### 2.12. Seguridad y Performance

#### Optimizaciones Obligatorias
- Usar componente `<Image>` de Next.js para imágenes
- Implementar loading states con `loading.tsx`
- Usar Error boundaries con `error.tsx`
- Implementar Suspense para streaming

#### Seguridad
- **Server Actions:** Validar entradas con Zod y verificar autorización
- **Variables de Entorno:** Usar variables de entorno para claves secretas. NUNCA exponerlas en el cliente
- **Validación:** Siempre validar datos del lado del servidor

### 2.13. Testing Patterns

```tsx
import { render, screen } from '@testing-library/react';
import { CourseCard } from './CourseCard';

describe('CourseCard', () => {
  const mockCourse = {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn React basics',
  };

  it('renders course information', () => {
    render(<CourseCard course={mockCourse} />);
    
    expect(screen.getByText('React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Learn React basics')).toBeInTheDocument();
  });
});
```

---

**IMPORTANTE**: Estas reglas son **obligatorias** para mantener la consistencia y calidad del código en Frontium Videos. Cualquier código que no siga estas convenciones debe ser corregido.

Para detalles ampliados, consultar los archivos de reglas en `.github/prompts/`.
