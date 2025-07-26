# 📋 Reglas de Desarrollo - Frontium Videos

## 🚀 Configuración Inicial

### Prerequisitos

- Node.js 18+
- pnpm (package manager)

### Setup del Proyecto

```bash
# Clonar repositorio
git clone https://github.com/usuario/frontium-videos.git
cd frontium-videos

# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev
```

## 🎯 Stack Tecnológico Obligatorio

### Core Technologies

- ✅ **Next.js 15** - App Router únicamente
- ✅ **TypeScript** - Configuración estricta
- ✅ **pnpm** - Package manager exclusivo
- ✅ **React 18** - Server Components por defecto

### Configuración

- ✅ **ESLint** - Flat config con reglas de Next.js
- ✅ **Prettier** - Formateo automático
- ✅ **Tailwind CSS** - Framework CSS (opcional)

## 📁 Estructura de Proyecto Requerida

```
frontium-videos/
├── .github/
│   ├── prompts/                    # Reglas de Cursor
│   └── DEVELOPMENT_RULES.md        # Este archivo
├── src/
│   └── app/                        # App Router (OBLIGATORIO)
│       ├── layout.tsx              # Root layout (REQUERIDO)
│       ├── page.tsx                # Página principal
│       ├── globals.css             # Estilos globales
│       ├── (routes)/               # Grupos de rutas
│       ├── components/             # Componentes reutilizables
│       └── api/                    # API routes
├── public/                         # Assets estáticos
├── .cursorrules                    # Reglas automáticas de Cursor
├── next.config.ts                  # Configuración Next.js
├── tsconfig.json                   # Configuración TypeScript
├── eslint.config.mjs              # Configuración ESLint
└── package.json
```

## 🏗️ Patrones de Código Obligatorios

### 1. Server Components (Por Defecto)

```tsx
// ✅ CORRECTO - Server Component
export default async function PostsPage() {
  // Fetch directo en Server Component
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

### 2. Client Components (Solo Cuando Necesario)

```tsx
// ✅ CORRECTO - Client Component para interactividad
"use client";

import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Clicks: {count}</button>;
}
```

### 3. Composición Optimizada

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
      <InteractiveWidget data={data} /> {/* Client Component */}
    </div>
  );
}
```

## 🛣️ Convenciones de Routing

### Estructura de Rutas

```
app/
├── layout.tsx                  # Root layout
├── page.tsx                   # Home (/)
├── about/
│   └── page.tsx              # About (/about)
├── blog/
│   ├── layout.tsx            # Blog layout
│   ├── page.tsx              # Blog listing (/blog)
│   └── [slug]/
│       └── page.tsx          # Blog post (/blog/[slug])
├── (marketing)/              # Route group
│   ├── contact/
│   └── pricing/
└── api/
    └── posts/
        └── route.ts          # API endpoint (/api/posts)
```

### Tipos de Archivos Especiales

- `layout.tsx` - Layout compartido
- `page.tsx` - Página de ruta
- `loading.tsx` - UI de carga
- `error.tsx` - Manejo de errores
- `not-found.tsx` - Página 404
- `route.ts` - API endpoint

## 📡 Data Fetching Patterns

### Server-Side (Recomendado)

```tsx
// Fetch en Server Component
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

### Parallel Fetching

```tsx
export default async function Page() {
  // ✅ CORRECTO - Fetch paralelo
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

## 🎨 Styling Guidelines

### CSS Modules (Recomendado)

```tsx
// components/Button/Button.module.css
.button {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}

.primary {
  background-color: blue;
  color: white;
}

// components/Button/Button.tsx
import styles from './Button.module.css';

export function Button({ variant = 'primary', children }) {
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}
```

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
:root {
  --primary-color: #0070f3;
  --secondary-color: #7928ca;
}

body {
  font-family: "Inter", sans-serif;
}
```

## 🔧 Configuraciones Requeridas

### tsconfig.json

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

## 📝 Convenciones de Código

### Naming Conventions

- **Componentes**: `PascalCase` (`UserProfile.tsx`)
- **Páginas**: `kebab-case` (`user-profile/page.tsx`)
- **Hooks**: `camelCase` con prefijo `use` (`useAuthState`)
- **Server Actions**: `camelCase` (`createPost`, `updateUser`)
- **Tipos**: `PascalCase` (`UserProfile`, `ApiResponse`)
- **Constantes**: `UPPER_SNAKE_CASE` (`API_BASE_URL`)

### Import Organization

```tsx
// 1. React imports
import { useState, useEffect } from "react";

// 2. Next.js imports
import Link from "next/link";
import Image from "next/image";

// 3. External libraries
import { clsx } from "clsx";
import { z } from "zod";

// 4. Internal imports (absolute paths)
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types";

// 5. Relative imports
import "./styles.css";
import { helper } from "../utils/helper";
```

## 🔒 Security Best Practices

### Server Actions

```tsx
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(10),
});

export async function createPost(formData: FormData) {
  // ✅ Validación de entrada
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    throw new Error("Invalid input");
  }

  // ✅ Verificación de autorización
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

## 🚀 Performance Guidelines

### Image Optimization

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

### Loading States

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

## 🔄 Git Workflow

### Commit Messages (INGLÉS)

```bash
# Tipos de commit
feat: add user authentication with NextAuth
fix: resolve hydration mismatch in profile
docs: update README with setup instructions
style: format code with prettier
refactor: extract auth logic to custom hook
test: add unit tests for user actions
chore: update dependencies to latest versions
perf: optimize image loading performance
```

### Branch Naming

- `feat/user-authentication`
- `fix/hydration-error`
- `docs/setup-guide`
- `refactor/auth-logic`

### Proceso de Desarrollo

1. Crear branch desde `main`
2. Desarrollar feature
3. Hacer commits con mensajes descriptivos
4. Push y crear Pull Request
5. Code review
6. Merge a `main`

## 🧪 Testing Strategy

### Unit Tests

```tsx
// components/__tests__/Button.test.tsx
import { render, screen } from "@testing-library/react";
import { Button } from "../Button";

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });
});
```

### Integration Tests

```tsx
// app/__tests__/page.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: "/",
  }),
}));

describe("Home Page", () => {
  it("renders welcome message", () => {
    render(<Home />);
    expect(screen.getByText("Welcome")).toBeInTheDocument();
  });
});
```

## ⚠️ Errores Comunes a Evitar

### ❌ NUNCA hacer esto:

```tsx
// ❌ Hooks en Server Components
export default function ServerComponent() {
  const [state, setState] = useState(); // ERROR!
  return <div>...</div>;
}

// ❌ Fetch a API propia desde Server Component
export default async function ServerComponent() {
  const data = await fetch("/api/posts"); // Ineficiente
  return <div>...</div>;
}

// ❌ 'use client' innecesario
("use client");
export default function StaticComponent() {
  return <div>Static content</div>; // No necesita cliente
}
```

### ✅ SIEMPRE hacer esto:

```tsx
// ✅ Server Component para fetch
export default async function ServerComponent() {
  const data = await fetchFromDB(); // Directo a DB
  return <div>...</div>;
}

// ✅ Client Component solo cuando necesario
("use client");
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <button onClick={() => setState()}>...</button>;
}
```

## � Gestión de Dependencias y Actualizaciones

### ⚠️ REGLA OBLIGATORIA: Consultar Context7 antes de instalar paquetes

**SIEMPRE** antes de instalar, actualizar o configurar cualquier paquete/biblioteca:

1. **Usar Context7 para obtener información actualizada:**

   ```
   @context7 <nombre-del-paquete>
   ```

2. **Verificar la documentación más reciente:**

   - Versiones actuales y compatibilidad
   - Mejores prácticas de instalación
   - Configuración recomendada
   - Breaking changes recientes
   - Alternativas más modernas

3. **Ejemplos de consulta obligatoria:**

   ```
   # Antes de instalar cualquier paquete
   @context7 react-query        # Para gestión de estado
   @context7 framer-motion     # Para animaciones
   @context7 prisma            # Para base de datos
   @context7 tailwindcss       # Para CSS framework
   @context7 clerk             # Para autenticación
   ```

4. **¿Por qué esta regla es crítica?**
   - ✅ Evita usar versiones obsoletas
   - ✅ Previene configuraciones deprecadas
   - ✅ Asegura compatibilidad con Next.js 15
   - ✅ Accede a las mejores prácticas actuales
   - ✅ Evita instalar paquetes que ya no se mantienen

### Proceso de Instalación

```bash
# 1. PRIMERO: Consultar Context7
@context7 nombre-del-paquete

# 2. SEGUNDO: Instalar con pnpm
pnpm add nombre-del-paquete

# 3. TERCERO: Configurar según documentación actual de Context7
```

### ❌ NO hacer:

- Instalar paquetes sin consultar Context7 primero
- Usar tutoriales/guías antiguas sin verificar actualidad
- Copiar configuraciones de versiones anteriores
- Asumir que la configuración "siempre ha funcionado así"

### ✅ SIEMPRE hacer:

- Consultar Context7 para cada nueva dependencia
- Verificar compatibilidad con Next.js 15 + React 18
- Seguir las prácticas más recientes documentadas
- Actualizar configuraciones según las últimas versiones

## �📞 Soporte

Para preguntas sobre estas reglas:

1. Revisar documentación en `.github/prompts/`
2. Consultar [Next.js 15 Documentation](https://nextjs.org/docs)
3. Crear issue en el repositorio

---

**Estas reglas DEBEN seguirse estrictamente en todo el desarrollo del proyecto Frontium Videos.**
