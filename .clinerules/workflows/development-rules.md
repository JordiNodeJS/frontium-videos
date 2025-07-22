# 📋 Reglas de Desarrollo para Cline - Frontium Videos

Este archivo consolida todas las reglas de desarrollo del proyecto Frontium Videos, integrando las reglas existentes en `.github/`, `.windsurf/`, `.cursorrules` y otros archivos de configuración.

## 🚀 Configuración Inicial Obligatoria

### Prerequisitos

- Node.js 18+
- **pnpm** (package manager obligatorio)
- Git configurado

### Stack Tecnológico Obligatorio

- ✅ **Next.js 15** - App Router únicamente
- ✅ **TypeScript** - Configuración estricta
- ✅ **pnpm** - Package manager
- ✅ **React 18** - Server Components por defecto
- ✅ **ESLint** - Flat config con reglas de Next.js
- ✅ **Prettier** - Formateo automático
- ✅ **Tailwind CSS** - Framework CSS
- ✅ **ShadCN/UI** - Biblioteca de componentes

### Comandos y Package Manager

```bash
# ✅ SIEMPRE usar pnpm
pnpm install                   # Instalar dependencias
pnpm dev                      # Servidor desarrollo (puerto 3000)
pnpm build                    # Build de producción
pnpm start                    # Servidor producción

# ✅ Para ejecutables
pnpm dlx <package>            # Ejecutar paquetes

# ✅ Para ShadCN/UI
pnpm dlx shadcn@latest add <componente>

# ❌ NUNCA usar
npm install / npm run
yarn install / yarn dev
bun install / bunx --bun
```

## 📁 Estructura de Proyecto Obligatoria

```
frontium-videos/
├── .github/
│   ├── prompts/                    # Reglas específicas de IA
│   └── DEVELOPMENT_RULES.md        # Reglas principales
├── .windsurf/
│   └── rules/                      # Reglas de Windsurf
├── .clinerules/
│   └── workflows/                  # Reglas de Cline
├── src/
│   └── app/                        # App Router (OBLIGATORIO)
│       ├── layout.tsx              # Root layout (REQUERIDO)
│       ├── page.tsx                # Página principal
│       ├── globals.css             # Estilos globales
│       ├── (auth)/                 # Grupos de rutas
│       ├── components/             # Componentes reutilizables
│       │   ├── ui/                 # Componentes ShadCN
│       │   ├── shared/             # Componentes compartidos
│       │   └── auth/               # Componentes de auth
│       ├── lib/                    # Utilidades
│       │   └── utils.ts
│       └── api/                    # API routes
├── public/                         # Assets estáticos
├── .cursorrules                    # Reglas automáticas
├── next.config.ts                  # Configuración Next.js
├── tsconfig.json                   # Configuración TypeScript
├── eslint.config.mjs              # Configuración ESLint
├── components.json                 # Configuración ShadCN
└── package.json
```

## 🏗️ Patrones de Código Obligatorios

### 1. Server Components (Por Defecto - SIEMPRE)

```tsx
// ✅ CORRECTO - Server Component (comportamiento por defecto)
export default async function PostsPage() {
  // ✅ Fetch directo en Server Component
  const posts = await fetch("https://api.example.com/posts", {
    cache: "force-cache", // o 'no-store' para datos dinámicos
  });

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <article key={post.id}>{post.title}</article>
      ))}
    </div>
  );
}
```

### 2. Client Components (Solo Cuando Estrictamente Necesario)

```tsx
// ✅ CORRECTO - Client Component para interactividad
"use client";

import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;
}
```

### 3. Composición Optimizada - Límites Mínimos de Client

```tsx
// ✅ CORRECTO - Límites de 'use client' optimizados
// app/dashboard/page.tsx (Server Component)
import { InteractiveWidget } from "./interactive-widget";

export default async function Dashboard() {
  const data = await fetchDashboardData(); // Server-side

  return (
    <div>
      <h1>Dashboard</h1>
      <StaticContent data={data} /> {/* Server Component */}
      <InteractiveWidget data={data} /> {/* Solo este es Client */}
    </div>
  );
}

// app/dashboard/interactive-widget.tsx
("use client");

export function InteractiveWidget({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? "Cerrar" : "Abrir"}
    </button>
  );
}
```

## 🛣️ Convenciones de Routing (App Router)

### Archivos Especiales de Next.js 15

- `layout.tsx` - Layout compartido (OBLIGATORIO en app/)
- `page.tsx` - Página de ruta
- `loading.tsx` - UI de carga con Suspense
- `error.tsx` - Manejo de errores con Error Boundary
- `not-found.tsx` - Página 404
- `route.ts` - API endpoint

### Estructura de Rutas Recomendada

```
app/
├── layout.tsx                  # Root layout (OBLIGATORIO)
├── page.tsx                   # Home (/)
├── globals.css                # Estilos globales
├── (auth)/                    # Route group para auth
│   ├── sign-in/
│   │   └── page.tsx           # /sign-in
│   └── sign-up/
│       └── page.tsx           # /sign-up
├── (root)/                    # Route group principal
│   ├── dashboard/
│   │   ├── layout.tsx         # Layout del dashboard
│   │   ├── page.tsx           # /dashboard
│   │   └── settings/
│   │       └── page.tsx       # /dashboard/settings
│   └── courses/
│       ├── page.tsx           # /courses
│       └── [courseSlug]/
│           └── page.tsx       # /courses/[courseSlug]
└── api/
    ├── auth/
    │   └── route.ts           # API endpoint /api/auth
    └── courses/
        └── route.ts           # API endpoint /api/courses
```

## 📡 Data Fetching Obligatorio

### Server-Side Fetching (Recomendado por Defecto)

```tsx
// ✅ CORRECTO - Fetch en Server Component
async function getData() {
  const res = await fetch("https://api.example.com/data", {
    // Estrategias de cache:
    cache: "force-cache", // SSG - cachea indefinidamente
    // cache: 'no-store',        // SSR - no cachea
    // next: { revalidate: 60 }  // ISR - revalida cada 60s
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
```

### Parallel Fetching (Optimización de Performance)

```tsx
// ✅ CORRECTO - Fetch paralelo para evitar waterfalls
export default async function Page() {
  const [userData, postsData] = await Promise.all([
    fetch("/api/user"),
    fetch("/api/posts"),
  ]);

  const [user, posts] = await Promise.all([userData.json(), postsData.json()]);

  return (
    <div>
      <UserProfile user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

### Client-Side Fetching (Solo Cuando Necesario)

```tsx
"use client";

import { useEffect, useState } from "react";

// ✅ Solo para datos dinámicos que cambian frecuentemente
export default function ClientData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/dynamic-data")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div>{data ? JSON.stringify(data) : "Cargando..."}</div>;
}
```

## 🎯 Server Actions y Forms

### Server Action Básico

```tsx
// app/actions/posts.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  // ✅ Validación obligatoria
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error("Invalid input");
  }

  // ✅ Verificación de autorización obligatoria
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // ✅ Operación segura
  await savePost(result.data);

  // ✅ Revalidar cache
  revalidatePath("/posts");
}
```

### Form con Server Action

```tsx
// app/posts/create/page.tsx
import { createPost } from "@/app/actions/posts";

export default function CreatePost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Título" required />
      <textarea name="content" placeholder="Contenido" required />
      <button type="submit">Crear Post</button>
    </form>
  );
}
```

## 📝 Convenciones de Código Obligatorias

### Naming Conventions (Estrictas)

- **Componentes**: `PascalCase` (`UserProfile.tsx`)
- **Páginas (directorios)**: `kebab-case` (`user-profile/page.tsx`)
- **Hooks personalizados**: `camelCase` con prefijo `use` (`useAuthState`)
- **Server Actions**: `camelCase` (`createPost`, `updateUser`)
- **Tipos e Interfaces**: `PascalCase` (`UserProfile`, `ApiResponse`)
- **Constantes**: `UPPER_SNAKE_CASE` (`API_BASE_URL`)
- **Variables y funciones**: `camelCase` (`userName`, `handleSubmit`)

### Import Organization (Orden Obligatorio)

```tsx
// 1. React imports (NUNCA usar React.tipo, SIEMPRE destructuring)
import { useState, useEffect, FormEvent, ChangeEvent } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. External libraries
import { clsx } from "clsx";
import { z } from "zod";

// 4. Internal imports (absolute paths con @/)
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types";

// 5. Relative imports
import "./styles.css";
import { helper } from "../utils/helper";
```

### Reglas de Importación React (CRÍTICAS)

```tsx
// ✅ CORRECTO - Importación explícita
import { useState, FormEvent, ChangeEvent } from "react";

export function Component() {
  const handleSubmit = (e: FormEvent) => {
    // código...
  };
}

// ❌ INCORRECTO - Namespace React
import React from "react";

export function Component() {
  const handleSubmit = (e: React.FormEvent) => {
    // código...
  };
}
```

## 🎨 Estilos y UI

### ShadCN/UI Installation (Obligatorio)

```bash
# ✅ SIEMPRE usar este comando para ShadCN
pnpm dlx shadcn@latest add <componente>

# Ejemplos:
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add form
```

### Uso de Componentes ShadCN

```tsx
// ✅ CORRECTO - Importar desde @/components/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Título</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

### Tailwind CSS

```tsx
// ✅ CORRECTO - Usar clases de Tailwind
import { cn } from "@/lib/utils";

export function Component({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      Content
    </div>
  );
}
```

## 🔧 TypeScript Obligatorio

### Configuración tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Tipos Obligatorios

```tsx
// ✅ SIEMPRE tipar props explícitamente
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Post {params.id}</div>;
}

// ✅ Interfaces para objetos complejos
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ❌ NUNCA usar 'any'
// const user: any = fetchUser(); // ❌ PROHIBIDO
```

## 🚀 Performance y Optimización

### Image Optimization (Obligatorio)

```tsx
import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority // Para LCP crítico
      placeholder="blur"
      blurDataURL="data:image/..."
    />
  );
}
```

### Loading States (Obligatorio)

```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
    </div>
  );
}
```

### Error Boundaries (Obligatorio)

```tsx
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>¡Algo salió mal!</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  );
}
```

### Suspense para Streaming

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Suspense fallback={<p>Cargando feed...</p>}>
        <PostFeed />
      </Suspense>

      <Suspense fallback={<p>Cargando weather...</p>}>
        <Weather />
      </Suspense>
    </div>
  );
}
```

## 🔒 Security Best Practices

### Validación de Server Actions (Obligatorio)

```tsx
"use server";

import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  // ✅ SIEMPRE validar entrada
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error("Invalid input");
  }

  // ✅ SIEMPRE verificar autorización
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Procesar...
}
```

### Environment Variables

```tsx
// ✅ CORRECTO - Variables del servidor
const DATABASE_URL = process.env.DATABASE_URL; // Server only

// ❌ INCORRECTO - NO exponer secrets en cliente
// next.config.ts
const nextConfig = {
  env: {
    // DATABASE_URL: process.env.DATABASE_URL, // ❌ NO hacer esto
  },
};
```

## 🔄 Git Workflow y Commits

### Formato de Commits (INGLÉS OBLIGATORIO)

```bash
# ✅ Tipos de commit (Conventional Commits)
feat: add user authentication with NextAuth
fix: resolve hydration mismatch in profile page
docs: update README with setup instructions
style: format code with prettier
refactor: extract auth logic to custom hook
test: add unit tests for user actions
chore: update dependencies to latest versions
perf: optimize image loading performance

# ✅ Estructura del mensaje
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Branch Naming (INGLÉS)

- `feat/user-authentication`
- `fix/hydration-error`
- `docs/setup-guide`
- `refactor/auth-logic`
- `test/user-actions`
- `chore/dependency-update`

### Proceso de Desarrollo

1. Crear branch desde `main`
2. Desarrollar feature siguiendo estas reglas
3. Commits frecuentes con mensajes descriptivos
4. Push y crear Pull Request
5. Code review obligatorio
6. Merge a `main` después de aprobación

## ⚠️ Errores Comunes PROHIBIDOS

### ❌ NUNCA hacer esto:

#### 1. Hooks en Server Components

```tsx
// ❌ ERROR CRÍTICO
export default function ServerComponent() {
  const [state, setState] = useState(); // ❌ PROHIBIDO!
  useEffect(() => {}, []); // ❌ PROHIBIDO!

  return <div>...</div>;
}
```

#### 2. Fetch a API propia desde Server Component

```tsx
// ❌ INEFICIENTE
export default async function ServerComponent() {
  const data = await fetch("/api/posts"); // ❌ Roundtrip innecesario
  return <div>...</div>;
}

// ✅ CORRECTO
export default async function ServerComponent() {
  const data = await fetchPostsFromDB(); // ✅ Directo a DB
  return <div>...</div>;
}
```

#### 3. 'use client' innecesario

```tsx
// ❌ MAL - Todo se ejecuta en cliente
"use client";
export default function StaticPage() {
  return <div>Static content</div>; // ❌ No necesita cliente
}

// ✅ BIEN - Solo lo interactivo en cliente
export default function StaticPage() {
  return (
    <div>
      <StaticContent /> {/* Server Component */}
      <InteractiveButton /> {/* Client Component */}
    </div>
  );
}
```

#### 4. Usar package managers incorrectos

```bash
# ❌ NUNCA usar
npm install
npm run dev
yarn install
yarn dev
pnpm install
pnpm dev

# ✅ SIEMPRE usar
bun install
bun dev
bunx shadcn@latest add button
```

#### 5. Namespace React incorrecto

```tsx
// ❌ PROHIBIDO
import React from "react";
const handleClick = (e: React.MouseEvent) => {};

// ✅ CORRECTO
import { MouseEvent } from "react";
const handleClick = (e: MouseEvent) => {};
```

## 🌐 Configuraciones Específicas del Sistema

### Windows Path Rules (Desde .windsurf/rules/)

- **Rutas SIEMPRE** con letra de unidad en mayúsculas
- **Ejemplo correcto:** `G:\DEV\academia\frontium-videos`
- **Ejemplo incorrecto:** `g:\DEV\academia\frontium-videos`

### Puerto de Desarrollo

- **SIEMPRE** usar puerto 4000 para desarrollo
- Configurar en `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 4000",
    "start": "next start -p 4000"
  }
}
```

## 🗣️ Comunicación y Idiomas

### Respuestas de Cline

- **SIEMPRE** en español (excepto código y commits)
- Explicaciones técnicas en español
- Documentación en español

### Código y Commits

- **Código**: Inglés (variables, funciones, comentarios)
- **Commits**: OBLIGATORIO en inglés
- **Documentación técnica**: Español

### Ejemplo de Comunicación Correcta

```
// ✅ Respuesta de Cline en español:
"He actualizado el componente UserProfile para usar Server Components
y he añadido la validación con zod en el Server Action."

// ✅ Commit en inglés:
feat: add server-side validation to user profile component

// ✅ Código en inglés:
export async function updateUserProfile(formData: FormData) {
  // validation logic...
}
```

## 📚 Archivos de Configuración Obligatorios

### ESLint Flat Config

```js
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
  }),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
  },
];

export default eslintConfig;
```

### Next.js Config

```ts
// next.config.ts
const nextConfig = {
  typescript: {
    // ✅ Fallar el build en errores de TypeScript
    ignoreBuildErrors: false,
  },
  eslint: {
    // ✅ Fallar el build en errores de ESLint
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Configuraciones experimentales de Next.js 15
  },
};

export default nextConfig;
```

### Components.json para ShadCN

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 📞 Soporte y Referencias

### Documentación Oficial

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [ShadCN/UI Documentation](https://ui.shadcn.com)
- [Bun Documentation](https://bun.sh/docs)

### Archivos de Referencia en el Proyecto

- `.github/DEVELOPMENT_RULES.md` - Reglas principales
- `.github/prompts/` - Reglas específicas de IA
- `.windsurf/rules/` - Reglas de Windsurf
- `.cursorrules` - Reglas automáticas

---

## 🎯 RESUMEN CRÍTICO PARA CLINE

### OBLIGATORIO SIEMPRE:

1. **Package Manager**: Solo `pnpm` y `pnpm dlx`
2. **Next.js**: Solo App Router, nunca Pages Router
3. **Components**: Server Components por defecto, Client solo cuando necesario
4. **TypeScript**: Tipado estricto, nunca `any`
5. **Imports**: Orden específico, destructuring de React
6. **ShadCN**: `pnpm dlx shadcn@latest add <component>`
7. **Commits**: Inglés con Conventional Commits
8. **Comunicación**: Español para respuestas, inglés para código
9. **Validación**: Zod en Server Actions
10. **Security**: Autorización en todas las acciones

### PROHIBIDO COMPLETAMENTE:

1. ❌ npm, yarn, pnpm
2. ❌ Pages Router
3. ❌ 'use client' innecesario
4. ❌ Namespace React (React.tipo)
5. ❌ any type en TypeScript
6. ❌ Fetch a API propia desde Server Components
7. ❌ Commits en español
8. ❌ Secrets en client-side

---

**Estas reglas son OBLIGATORIAS y deben seguirse estrictamente en todo el desarrollo del proyecto Frontium Videos con Cline.**
