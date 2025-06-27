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

- **Package Manager:** SIEMPRE usar `bun` y `bunx`. NUNCA `npm`, `yarn` o `pnpm`.
- **Puerto de desarrollo:** `4000`.
- **Stack tecnológico:** Next.js 15 (App Router), TypeScript, bun, ESLint (flat config), Prettier.

### 2.2. Estructura de Directorios (Resumen de `cursor-rules.md`)
```
frontium-videos/
├── .github/
│   └── prompts/
├── src/
│   ├── app/
│   │   ├── (rutas)/         # Páginas organizadas
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── ui/              # Componentes de ShadCN/UI
│   ├── lib/
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── public/
├── package.json
├── next.config.ts
├── tsconfig.json
└── eslint.config.mjs
```

### 2.3. Arquitectura y Componentes (Next.js 15)

- **App Router:** OBLIGATORIO. NUNCA Pages Router.
- **Server Components por defecto:** No usar `'use client'` a menos que sea estrictamente necesario para interactividad (hooks, event listeners).
- **Client Components:** Usar `'use client'` al inicio del archivo. Mantenerlos lo más pequeños posible y en las hojas del árbol de componentes.
- **Convenciones de archivos de ruta:** `layout.tsx`, `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`.

### 2.4. Naming Conventions

- **Componentes:** `PascalCase` (ej. `UserProfile.tsx`)
- **Páginas (directorio):** `kebab-case` (ej. `user-profile/page.tsx`)
- **Hooks:** `camelCase` con prefijo `use` (ej. `useAuth`)
- **Server Actions:** `camelCase` (ej. `updateUsername`)
- **Tipos e Interfaces:** `PascalCase` (ej. `type UserProfile`)

### 2.5. Reglas de Importación (Orden)

1.  Imports de React (`import { useState } from 'react';`)
2.  Imports de Next.js (`import Link from 'next/link';`)
3.  Imports de librerías externas (`import { clsx } from 'clsx';`)
4.  Imports internos con alias (`import { Button } from '@/components/ui/button';`)
5.  Imports relativos (`import './styles.css';`)

### 2.6. TypeScript

- **Tipado estricto:** SIEMPRE tipar props y variables. NUNCA usar `any`.
- **Interfaces para objetos complejos:** Usar `interface` para definir la forma de los objetos.

### 2.7. Git y Commits

- **Formato de Commit (Inglés):** Seguir el estándar de Conventional Commits.
  ```
  feat: add user authentication
  fix: resolve hydration issue
  docs: update setup guide
  style: format with prettier
  refactor: extract auth logic
  test: add user tests
  chore: update dependencies
  ```

### 2.8. Seguridad y Performance

- **Server Actions:** Validar entradas (ej. con Zod) y verificar autorización.
- **Variables de Entorno:** Usar variables de entorno para claves secretas. NUNCA exponerlas en el cliente.
- **Imágenes:** Usar el componente `<Image>` de Next.js.
- **Carga de Datos:** Priorizar el fetching de datos en Server Components.

---

**Estas reglas deben ser seguidas por la IA y por cualquier desarrollador o asistente en el proyecto.**

Para detalles ampliados, consultar los archivos de reglas en `.github/prompts/`.
