# Guía de Configuración y Reglas del Proyecto: Frontium Videos

Este documento describe la configuración, las herramientas y las reglas de codificación para el proyecto **Frontium Videos**. Es de **lectura obligatoria** para todos los desarrolladores y asistentes de IA que trabajen en este repositorio.

## 1. Resumen del Proyecto

- **Proyecto:** Frontium Videos, una plataforma de cursos en línea con sistema de autenticación completo.
- **Stack Principal:** Next.js 15 (App Router), React 18, TypeScript, Clerk Auth.
- **UI:** ShadCN/UI, Tailwind CSS, Heroicons.
- **Puerto de desarrollo:** Por defecto de Next.js (`3000`).
- **Autenticación:** Clerk con páginas personalizadas y componentes reutilizables.
- **Documentación:** Sistema web integrado con demos interactivos.

## 2. Context7 - Consulta Obligatoria ANTES de Instalar Paquetes

**REGLA CRÍTICA:** Antes de instalar cualquier paquete o dependencia, SIEMPRE usar Context7 para obtener información actualizada.

### Proceso Obligatorio:
1. **Consultar Context7 PRIMERO:**
   ```
   use context7
   
   Quiero instalar [nombre_del_paquete] para [propósito]. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
   ```

2. **Verificar información actualizada:**
   - Versión más reciente disponible
   - Compatibilidad con Next.js 15
   - Mejores prácticas de instalación
   - Configuración recomendada
   - Breaking changes recientes

3. **Solo después proceder con la instalación:**
   ```bash
   pnpm add [paquete]@[version-verificada]
   ```

**Esta regla es OBLIGATORIA y debe aplicarse en el 100% de las instalaciones.**

## 3. Package Manager Exclusivo: `pnpm`

El proyecto utiliza **`pnpm`** como el único gestor de paquetes. Está **estrictamente prohibido** el uso de `npm`, `yarn` o `bun`.

### ¿Por qué `pnpm`?

- **Consistencia:** Asegura que todos los desarrolladores y sistemas de CI/CD usen las mismas versiones exactas de las dependencias, evitando el problema de "funciona en mi máquina".
- **Eficiencia:** `pnpm` utiliza un sistema de almacenamiento de paquetes compartidos que reduce el espacio en disco y acelera las instalaciones.
- **Estructura predecible:** La estructura de `node_modules` que crea es más estricta, lo que previene problemas de dependencias fantasma.

### Comandos Esenciales

- **Instalar dependencias:**
  ```bash
  pnpm install
  ```
- **Iniciar servidor de desarrollo:**
  ```bash
  pnpm dev
  ```
- **Construir para producción:**
  ```bash
  pnpm build
  ```
- **Ejecutar la build de producción:**
  ```bash
  pnpm start
  ```

## 4. Ejecución de Paquetes con `pnpm dlx`

Para ejecutar paquetes sin instalarlos globalmente (similar a `npx` o `bunx`), se debe usar **`pnpm dlx`**.

### Ejemplo: Añadir componentes ShadCN/UI

La adición de nuevos componentes de ShadCN/UI **debe** hacerse con el siguiente comando:

```bash
# CORRECTO
pnpm dlx shadcn-ui@latest add <nombre-del-componente>

# INCORRECTO
npx shadcn-ui@latest add ...
bunx shadcn-ui@latest add ...
```

**Motivación:** `pnpm dlx` utiliza el ecosistema y el lockfile de `pnpm`, garantizando que los scripts se ejecuten en un entorno consistente con las dependencias del proyecto y evitando conflictos de versiones que `npx` podría introducir.

## 5. Despliegue y Entorno de Producción (Vercel)

Para mantener la consistencia entre el desarrollo local y la producción, es vital entender cómo se gestiona el despliegue.

### Detección Automática de Package Manager

Vercel detecta automáticamente el gestor de paquetes a utilizar basándose en la presencia de un archivo de bloqueo (`lock file`) en la raíz del proyecto. El orden de prioridad es:

1.  `pnpm-lock.yaml` → **Usa `pnpm`**
2.  `yarn.lock` → Usa `yarn`
3.  `package-lock.json` → Usa `npm`
4.  `bun.lockb` → Usa `bun`

Dado que nuestro proyecto incluye un archivo `pnpm-lock.yaml`, **Vercel utilizará `pnpm` para instalar las dependencias y construir el proyecto**. Esto garantiza que el entorno de producción sea una réplica fiel de nuestro entorno de desarrollo, utilizando las mismas versiones de paquetes definidas en nuestro lockfile.

## 6. Reglas Clave de Codificación y Estructura

- **App Router:** El proyecto utiliza exclusivamente el App Router de Next.js 15.
- **Server Components por defecto:** Todos los componentes deben ser Server Components a menos que la interactividad del cliente sea indispensable. En ese caso, se usará la directiva `'use client'`.
- **Importaciones:** Las importaciones deben seguir un orden estricto y React debe ser importado explícitamente donde se use JSX.
- **Validación y Seguridad:** Las Server Actions deben validar los datos de entrada (preferiblemente con Zod) y las variables de entorno sensibles nunca deben exponerse en el cliente.
- **Commits:** Los mensajes de commit deben estar en inglés y seguir la especificación de [Conventional Commits](https://www.conventionalcommits.org/).

## 7. Sistema de Autenticación (Clerk)

El proyecto implementa un sistema completo de autenticación usando Clerk:

### Componentes Implementados:
- **AuthGuard**: Protección de rutas (`src/components/auth/auth-guard.tsx`)
- **UserButton**: Botón de usuario adaptativo (`src/components/auth/user-button.tsx`)
- **LogoutButton**: Botón de logout personalizable (`src/components/auth/logout-button.tsx`)

### Páginas de Autenticación:
- `/sign-in` - Página de inicio de sesión
- `/sign-up` - Página de registro
- `/dashboard` - Ejemplo de página protegida

### Demo y Documentación:
- `/demo/auth` - Demo interactivo completo
- `/docs/auth` - Documentación web detallada

### Variables de Entorno Requeridas:
```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## 8. Sistema de Documentación Web

El proyecto incluye un sistema completo de documentación accesible vía web:

### Estructura de Documentación:
- `/docs/auth` - Guía de autenticación con Clerk
- `/docs/context7` - Reglas de uso de Context7
- `/docs/components` - Documentación de componentes
- `/docs/deployment` - Guía de despliegue

### Características:
- Layout responsivo con navegación lateral
- Demos interactivos integrados
- Ejemplos de código con syntax highlighting
- Enlaces cruzados entre secciones

## 9. React Context (Implementaciones Actuales)

El proyecto utiliza React Context para gestión de estado:

### CourseContext:
- **Ubicación:** `src/app/courses/[courseSlug]/context/`
- **Hook:** `useCourse()`
- **Propósito:** Compartir datos del curso entre componentes

### ProfileContext:
- **Ubicación:** `src/app/profile/[userId]/context/`
- **Hook:** `useProfile()`
- **Funcionalidades:** `toggleFavoriteCourse()`, `updateProfile()`

### Tutorial Interactivo:
- **URL:** `/tutorial/context`
- **Contenido:** Ejemplo práctico con 4 componentes demostrativos

## 10. Comunicación

- **Idioma:** Todas las comunicaciones y comentarios en el código deben ser en **español**, con la excepción de los mensajes de commit.