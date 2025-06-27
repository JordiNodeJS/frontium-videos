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
  // Ejecutar en paralelo
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

## 🎨 Layouts y Navegación

### Root Layout (OBLIGATORIO)
```tsx
// app/layout.tsx - DEBE existir
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <nav>{/* Navegación global */}</nav>
        <main>{children}</main>
        <footer>{/* Footer global */}</footer>
      </body>
    </html>
  );
}
```

### Nested Layouts
```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <aside>{/* Sidebar del dashboard */}</aside>
      <section>{children}</section>
    </div>
  );
}
```

### Navegación con Link
```tsx
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav>
      {/* ✅ Client-side navigation */}
      <Link href="/dashboard" prefetch={true}>
        Dashboard
      </Link>
      
      {/* ✅ Con replace para reemplazar historial */}
      <Link href="/login" replace>
        Login
      </Link>
    </nav>
  );
}
```

## 🔄 Loading y Error Handling

### Loading States
```tsx
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Cargando dashboard...</p>
    </div>
  );
}
```

### Error Boundaries
```tsx
// app/dashboard/error.tsx
'use client'

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
      <button onClick={reset}>
        Intentar de nuevo
      </button>
    </div>
  );
}
```

### Suspense para Streaming
```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* ✅ Streaming con Suspense */}
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

## 🛣️ Routing Avanzado

### Dynamic Routes
```tsx
// app/posts/[id]/page.tsx
export default function Post({ params }: { params: { id: string } }) {
  return <div>Post ID: {params.id}</div>;
}
```

### Catch-all Routes
```tsx
// app/blog/[...slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string[] } }) {
  return <div>Slug: {params.slug.join('/')}</div>;
}
```

### Route Groups
```tsx
// Estructura:
// app/(marketing)/about/page.tsx
// app/(marketing)/contact/page.tsx
// app/(dashboard)/settings/page.tsx

// Los paréntesis NO afectan la URL
```

### Parallel Routes
```tsx
// app/dashboard/@analytics/page.tsx
// app/dashboard/@team/page.tsx
// app/dashboard/layout.tsx

export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="parallel-content">
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

## 🌐 API Routes

### Basic Route Handler
```ts
// app/api/posts/route.ts
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  
  // Lógica de fetch
  const posts = await fetchPosts(query);
  
  return Response.json({ posts });
}

export async function POST(request: NextRequest) {
  const data = await request.json();
  
  // Crear post
  const newPost = await createPost(data);
  
  return Response.json(newPost, { status: 201 });
}
```

### Dynamic API Routes
```ts
// app/api/posts/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const post = await fetchPost(params.id);
  
  if (!post) {
    return new Response('Post not found', { status: 404 });
  }
  
  return Response.json(post);
}
```

## 🎯 Server Actions

### Basic Server Action
```tsx
// app/actions/posts.ts
'use server'

import { revalidatePath } from 'next/cache';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  
  // Validación
  if (!title || !content) {
    throw new Error('Title and content are required');
  }
  
  // Crear post
  await savePost({ title, content });
  
  // Revalidar cache
  revalidatePath('/posts');
}
```

### Form con Server Action
```tsx
// app/posts/create/page.tsx
import { createPost } from '@/app/actions/posts';

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

## 📦 TypeScript

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
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

### Tipos para Server Components
```tsx
// ✅ Tipos explícitos para props
interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return <div>Post {params.id}</div>;
}
```

### Tipos para API Routes
```ts
// app/api/types.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}
```

## 🔧 ESLint y Prettier

### ESLint Flat Config
```js
// eslint.config.mjs
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'prettier'
    ],
  }),
  {
    rules: {
      // Reglas personalizadas para el proyecto
      '@typescript-eslint/no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
];

export default eslintConfig;
```

### Prettier Config
```js
// prettier.config.mjs
export default {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
};
```

## 🚀 Performance y Optimización

### Image Optimization
```tsx
import Image from 'next/image';

export default function Hero() {
  return (
    <div>
      {/* ✅ Optimización automática */}
      <Image
        src="/hero-image.jpg"
        alt="Hero"
        width={800}
        height={600}
        priority // Para LCP
        placeholder="blur"
        blurDataURL="data:image/..."
      />
    </div>
  );
}
```

### Font Optimization
```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
```

### Metadata para SEO
```tsx
// app/layout.tsx o app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frontium Videos - Aprende Desarrollo Web',
  description: 'Contenido educativo para desarrolladores',
  openGraph: {
    title: 'Frontium Videos',
    description: 'Aprende desarrollo web moderno',
    url: 'https://frontium-videos.com',
    siteName: 'Frontium Videos',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontium Videos',
    description: 'Aprende desarrollo web moderno',
    images: ['/og-image.jpg'],
  },
};
```

### Dynamic Metadata
```tsx
// app/posts/[id]/page.tsx
import type { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await fetchPost(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}
```

## 🔒 Mejores Prácticas de Seguridad

### Validación en Server Actions
```tsx
'use server'

import { z } from 'zod';

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  // ✅ Validación antes de procesar
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });
  
  if (!result.success) {
    throw new Error('Invalid input');
  }
  
  // ✅ Verificar autorización
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  // Procesar...
}
```

### Environment Variables
```tsx
// next.config.ts
const nextConfig = {
  env: {
    // ❌ NO exponer secrets
    // DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    // Configuraciones experimentales
  },
};

export default nextConfig;
```

## 📝 Convenciones de Código

### Naming Conventions
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Archivos de página**: snake_case (`user-profile.tsx`)
- **Hooks personalizados**: camelCase con prefijo `use` (`useAuthState`)
- **Server Actions**: camelCase (`createPost`, `updateUser`)
- **Tipos**: PascalCase (`UserProfile`, `ApiResponse`)

### File Organization
```
src/
├── app/
│   ├── (auth)/           # Route group
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── @sidebar/     # Parallel route
│   │   ├── settings/
│   │   └── layout.tsx
│   ├── api/
│   │   └── posts/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/           # Componentes reutilizables
│   ├── ui/              # Componentes básicos
│   └── forms/           # Componentes de formularios
├── lib/                 # Utilidades
├── types/               # Definiciones de tipos
└── actions/             # Server Actions
```

### Import Organization
```tsx
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Next.js imports
import Link from 'next/link';
import Image from 'next/image';

// 3. External libraries
import { clsx } from 'clsx';

// 4. Internal imports (absolute paths)
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types';

// 5. Relative imports
import './styles.css';
```

## ⚠️ Errores Comunes a Evitar

### ❌ NO usar hooks en Server Components
```tsx
// ❌ MAL
export default function ServerComponent() {
  const [state, setState] = useState(); // ERROR!
  useEffect(() => {}, []); // ERROR!
  
  return <div>...</div>;
}

// ✅ BIEN
'use client'
export default function ClientComponent() {
  const [state, setState] = useState(); // ✅ OK
  useEffect(() => {}, []); // ✅ OK
  
  return <div>...</div>;
}
```

### ❌ NO llamar Route Handlers desde Server Components
```tsx
// ❌ MAL
export default async function ServerComponent() {
  // NO hacer fetch a tu propia API desde server component
  const data = await fetch('/api/posts'); // ❌ Ineficiente
  
  return <div>...</div>;
}

// ✅ BIEN
export default async function ServerComponent() {
  // Llamar directamente a la función de base de datos
  const data = await fetchPostsFromDB(); // ✅ Eficiente
  
  return <div>...</div>;
}
```

### ❌ NO usar 'use client' innecesariamente
```tsx
// ❌ MAL - Todo se ejecuta en cliente
'use client'
export default function Page() {
  return (
    <div>
      <StaticContent /> {/* No necesita cliente */}
      <InteractiveButton /> {/* Sí necesita cliente */}
    </div>
  );
}

// ✅ BIEN - Solo lo necesario en cliente
export default function Page() {
  return (
    <div>
      <StaticContent /> {/* Server Component */}
      <InteractiveButton /> {/* Client Component */}
    </div>
  );
}
```

## 🔄 Commits y Git

### Formato de Commits (en inglés)
```
feat: add user authentication with NextAuth
fix: resolve hydration mismatch in user profile
docs: update README with setup instructions
style: format code with prettier
refactor: extract auth logic to custom hook
test: add unit tests for user actions
chore: update dependencies to latest versions
```

### Git Workflow
1. `feat/` - Nuevas características
2. `fix/` - Corrección de bugs
3. `docs/` - Documentación
4. `refactor/` - Refactorización
5. `test/` - Tests
6. `chore/` - Mantenimiento

---

## 📚 Recursos Adicionales

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [App Router Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
- [TypeScript with Next.js](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

---

**Estas reglas DEBEN seguirse en todos los commits y desarrollo del proyecto Frontium Videos.**

## 🚀 Instalación y Uso de bun

### Instalación de bun

```bash
curl -fsSL https://bun.sh/install | bash
```

### Instalación de dependencias

```bash
bun install
```

### Ejecución del servidor de desarrollo

```bash
bun dev
```

### Ejecución de scripts

- Para ejecutar scripts definidos en `package.json`:
  ```bash
  bun run <script>
  # Ejemplo:
  bun run build
  ```
- Para ejecutar paquetes binarios (como shadcn/ui, tailwind, etc):
  ```bash
  bunx <paquete>
  # Ejemplo:
  bunx shadcn-ui@latest init
  ```

### Advertencias
- ❌ **Nunca** uses `npm`, `yarn` o `pnpm` para instalar dependencias o ejecutar scripts.
- ❌ No mezcles lockfiles (`bun.lockb`, `package-lock.json`, `yarn.lock`, etc). Usa solo `bun.lockb`.
- ✅ El servidor de desarrollo debe ejecutarse SIEMPRE en el puerto 4000 (configura si es necesario).

### Ejemplo de scripts en package.json

```json
{
  "scripts": {
    "dev": "next dev -p 4000",
    "build": "next build",
    "start": "next start -p 4000",
    "lint": "next lint"
  }
}
```