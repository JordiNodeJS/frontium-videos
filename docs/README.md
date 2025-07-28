# 📚 Documentación de Frontium Videos

Bienvenido al sistema de documentación completo de **Frontium Videos**, una plataforma de cursos en línea construida con Next.js 15, TypeScript y Clerk Auth.

## 🚀 Acceso Rápido

### 🌐 Documentación Web Interactiva
- **[Autenticación con Clerk](/docs/auth)** - Guía completa de implementación
- **[Uso de Context7](/docs/context7)** - Reglas obligatorias para consultas
- **[Componentes del Sistema](/docs/components)** - Documentación de componentes
- **[Guía de Deployment](/docs/deployment)** - Despliegue en producción

### 🎮 Demos Interactivos
- **[Demo de Autenticación](/demo/auth)** - Prueba el sistema completo
- **[Tutorial de React Context](/tutorial/context)** - Aprende con ejemplos prácticos

### 📋 Guías de Desarrollo
- **[Reglas del Proyecto](guides/project-guidelines.md)** - Configuración y reglas obligatorias
- **[Guía de Clerk](guides/clerk-authentication-guide.md)** - Implementación detallada
- **[React Context](guides/react-context-guide.md)** - Patrones y mejores prácticas
- **[Context7 Rules](guides/context7-usage-rules.md)** - Reglas de consulta obligatoria

## 🏗️ Estructura del Proyecto

```
frontium-videos-auth/
├── 📁 docs/                    # Documentación del proyecto
│   ├── 📁 guides/              # Guías de desarrollo
│   ├── 📁 product/             # Documentación de producto
│   └── 📄 README.md            # Este archivo
├── 📁 src/
│   ├── 📁 app/                 # Next.js 15 App Router
│   │   ├── 📁 (auth)/          # Páginas de autenticación
│   │   ├── 📁 demo/            # Demos interactivos
│   │   ├── 📁 docs/            # Sistema de documentación web
│   │   └── 📁 tutorial/        # Tutoriales interactivos
│   └── 📁 components/
│       └── 📁 auth/            # Componentes de autenticación
├── 📁 .github/
│   └── 📁 prompts/             # Reglas de codificación
└── 📁 .windsurf/
    └── 📁 rules/               # Reglas de Windsurf
```

## 🎯 Stack Tecnológico

### Core
- **Next.js 15** (App Router) - Framework React
- **TypeScript** - Tipado estático
- **React 18** - Biblioteca de UI
- **pnpm** - Gestor de paquetes (OBLIGATORIO)

### Autenticación
- **Clerk** - Sistema de autenticación completo
- **Middleware** - Protección de rutas
- **Server Components** - Autenticación del lado del servidor

### UI/UX
- **ShadCN/UI** - Componentes de UI
- **Tailwind CSS** - Framework de estilos
- **Heroicons** - Iconografía

### Herramientas de Desarrollo
- **Context7** - Consulta obligatoria de documentación
- **Windsurf** - Asistente de IA con reglas específicas
- **ESLint + Prettier** - Linting y formateo

## 📖 Guías de Inicio Rápido

### 1. Configuración Inicial
```bash
# Clonar el repositorio
git clone <repository-url>
cd frontium-videos-auth

# Instalar dependencias (SOLO pnpm)
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus claves de Clerk
```

### 2. Desarrollo
```bash
# Iniciar servidor de desarrollo
pnpm dev

# Visitar la aplicación
http://localhost:3000
```

### 3. Explorar la Documentación
- **Documentación Web:** http://localhost:3000/docs/auth
- **Demo Interactivo:** http://localhost:3000/demo/auth
- **Tutorial Context:** http://localhost:3000/tutorial/context

## 🔧 Reglas Críticas

### ⚠️ Context7 - Consulta Obligatoria
**ANTES de instalar cualquier paquete, SIEMPRE usar:**
```
use context7

Quiero instalar [paquete] para [propósito]. ¿Cuál es la versión más reciente, cómo se instala con pnpm, y cuáles son las mejores prácticas para Next.js 15?
```

### 📦 Package Manager
- **SOLO pnpm** - Prohibido npm, yarn, bun
- **Comandos:** `pnpm install`, `pnpm dev`, `pnpm build`
- **ShadCN/UI:** `pnpm dlx shadcn@latest add <componente>`

### 🏗️ Arquitectura
- **App Router** - Obligatorio en Next.js 15
- **Server Components** - Por defecto
- **Client Components** - Solo cuando sea necesario (`'use client'`)
- **TypeScript** - Tipado completo obligatorio

## 🚀 URLs Importantes

### Aplicación
- **Inicio:** http://localhost:3000
- **Sign In:** http://localhost:3000/sign-in
- **Sign Up:** http://localhost:3000/sign-up
- **Dashboard:** http://localhost:3000/dashboard (protegida)

### Documentación
- **Docs Principal:** http://localhost:3000/docs/auth
- **Demo Auth:** http://localhost:3000/demo/auth
- **Tutorial Context:** http://localhost:3000/tutorial/context

### Desarrollo
- **Puerto:** 3000 (por defecto Next.js)
- **Comando:** `pnpm dev`
- **Build:** `pnpm build && pnpm start`

## 📞 Soporte y Recursos

### Documentación Oficial
- [Next.js 15](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [ShadCN/UI](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Documentación Interna
- **Reglas del Proyecto:** `docs/guides/project-guidelines.md`
- **Implementación Clerk:** `docs/guides/clerk-authentication-guide.md`
- **React Context:** `docs/guides/react-context-guide.md`
- **Context7 Rules:** `docs/guides/context7-usage-rules.md`

---

**📝 Nota:** Esta documentación se actualiza constantemente. Para la información más reciente, consulta los archivos en la carpeta `docs/` y las páginas web del sistema de documentación.

**🔄 Última actualización:** 2025-07-28