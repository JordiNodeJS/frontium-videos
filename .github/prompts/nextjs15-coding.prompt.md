---
description: "Reglas de codificación para Next.js 15 con App Router, Server Components y TypeScript"
mode: agent
---

# Reglas de Codificación para Next.js 15 - Frontium Videos

## 🎯 Configuración del Proyecto

### Package Manager
- **SIEMPRE** usar `bun` como package manager
- Comandos: `bun install`, `bun dev`, `bun build`, `bun start`
- Para paquetes ejecutables: `bunx <package>`
- Puerto de desarrollo: **4000**

### Estructura de Directorios
```
frontium-videos/
├── .github/
│   └── prompts/           # Reglas de Cursor
├── src/
│   └── app/              # App Router (Next.js 15)
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

## 🏗️ Arquitectura Next.js 15

### App Router (OBLIGATORIO)
- **USAR SOLO** App Router, nunca Pages Router
- Estructura basada en sistema de archivos en `src/app/`
- Convenciones de archivos:
  - `layout.tsx` - Layout compartido
  - `page.tsx` - Página de ruta
  - `loading.tsx` - UI de carga
  - `error.tsx` - UI de error
  - `not-found.tsx` - Página 404
  - `route.ts` - API endpoints

### Server Components vs Client Components

#### Server Components (Por Defecto)
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

#### Client Components (Cuando sea necesario)
```tsx
'use client' // ✅ Al inicio del archivo

import { useState, useEffect } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState('');
  
  // ✅ Hooks permitidos aquí
  useEffect(() => {
    // lógica cliente
  }, []);
  
  return <div>{/* UI interactiva */}</div>;
}
```

### Importaciones React

- **SIEMPRE** usar importación explícita de tipos, hooks y elementos de React
- **NUNCA** usar el namespace `React.` para acceder a elementos

#### ✅ CORRECTO:
```tsx
import { useState, FormEvent, ChangeEvent } from 'react';

export function Component() {
  const handleSubmit = (e: FormEvent) => {
    // código...
  };
}
```

#### ❌ INCORRECTO:
```tsx
import React from 'react';

export function Component() {
  const handleSubmit = (e: React.FormEvent) => {
    // código...
  };
}
```

### Composición de Componentes

#### ✅ CORRECTO: Estrategia de límites optimizada
```tsx
// app/dashboard/page.tsx - Server Component
import { ClientWrapper } from './client-wrapper';

export default async function Dashboard() {
  const data = await fetchServerData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Solo el componente que NECESITA interactividad */}
      <ClientWrapper data={data} />
    </div>
  );
}

// app/dashboard/client-wrapper.tsx
'use client'

export function ClientWrapper({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Cerrar' : 'Abrir'}
    </button>
  );
}
```

#### ❌ INCORRECTO: Límite demasiado amplio
```tsx
'use client' // ❌ Componente entero se ejecuta en cliente

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  
  // ❌ Este fetch debería ser server-side
  useEffect(() => {
    fetch('/api/data').then(/* ... */);
  }, []);
  
  return <div>{/* ... */}</div>;
}
```

## 📡 Data Fetching

### Server-Side Fetching
```tsx
// ✅ En Server Components
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    // Estrategias de cache:
    cache: 'force-cache',     // SSG equivalente
    // cache: 'no-store',     // SSR equivalente
    // next: { revalidate: 60 } // ISR equivalente
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
```

### Client-Side Fetching
```tsx
'use client'

import { useEffect, useState } from 'react';

export default function ClientData() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // ✅ Para datos que cambian frecuentemente
    fetch('/api/dynamic-data')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{data ? JSON.stringify(data) : 'Cargando...'}</div>;
}
```

### Parallel Data Fetching
```tsx
// ✅ Fetch paralelo para reducir waterfalls
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts')
  ]);
  
  const [user, posts] = await Promise.all([
    userData.json(),
    postsData.json()
  ]);
  
  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

## 🎨 TypeScript & Styling

### TypeScript Configuración
```typescript
// tsconfig.json debe incluir:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Tipos de Componentes
```tsx
// ✅ Props interface siempre
interface ComponentProps {
  title: string;
  items: Item[];
  onSelect?: (item: Item) => void;
}

export default function Component({ title, items, onSelect }: ComponentProps) {
  // implementación
}
```

### Styling con Tailwind
```tsx
// ✅ Clases utilitarias
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
</div>

// ✅ Componentes condicionales
<button 
  className={`
    px-4 py-2 rounded transition-colors
    ${variant === 'primary' 
      ? 'bg-blue-600 text-white hover:bg-blue-700' 
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    }
  `}
>
  {children}
</button>
```

## 🚀 Performance & SEO

### Metadata API
```tsx
// app/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontium Videos',
  description: 'Plataforma de cursos en video',
};

// Para rutas dinámicas
export async function generateMetadata({ params }): Promise<Metadata> {
  const course = await getCourse(params.slug);
  
  return {
    title: course.title,
    description: course.description,
  };
}
```

### Loading States
```tsx
// app/courses/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
```

### Error Boundaries
```tsx
// app/courses/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center p-8">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Algo salió mal
      </h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
```

## 🔧 Patrones Comunes

### Server Actions
```tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  
  // Validación
  if (!title || title.length < 3) {
    return { error: 'El título debe tener al menos 3 caracteres' };
  }
  
  // Lógica del servidor
  const post = await db.post.create({
    data: { title }
  });
  
  return { success: true, post };
}
```

### Forms con Server Actions
```tsx
// app/create-post/page.tsx
import { createPost } from '../actions';

export default function CreatePost() {
  return (
    <form action={createPost} className="space-y-4">
      <input
        name="title"
        placeholder="Título del post"
        required
        className="w-full p-2 border rounded"
      />
      <button 
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Crear Post
      </button>
    </form>
  );
}
```

## 📱 Responsive Design

### Breakpoints Tailwind
```tsx
// Mobile-first approach
<div className="
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-4 
  gap-4
">
  {items.map(item => (
    <div key={item.id} className="p-4 bg-white rounded-lg">
      {item.title}
    </div>
  ))}
</div>
```

## 🔒 Seguridad

### Validación Server-Side
```tsx
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18),
});

export async function createUser(formData: FormData) {
  const result = UserSchema.safeParse({
    email: formData.get('email'),
    age: Number(formData.get('age')),
  });
  
  if (!result.success) {
    return { error: result.error.flatten() };
  }
  
  // Crear usuario...
}
```

## 🧪 Testing Patterns

### Component Testing
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

**Importante**: Estas reglas son **obligatorias** para mantener la consistencia y calidad del código en Frontium Videos. Cualquier PR que no siga estas convenciones será rechazado. 