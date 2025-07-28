# 📖 Guías de Desarrollo - Frontium Videos

Esta carpeta contiene todas las guías técnicas y de desarrollo para el proyecto Frontium Videos. Estas guías son **obligatorias** para todos los desarrolladores y asistentes de IA que trabajen en el proyecto.

## 🎯 Guías Principales

### 📋 [Reglas del Proyecto](project-guidelines.md)
**📌 LECTURA OBLIGATORIA**
- Configuración del proyecto y stack tecnológico
- Reglas críticas de Context7 (consulta obligatoria)
- Package manager exclusivo (pnpm)
- Sistema de autenticación con Clerk
- Arquitectura y patrones de desarrollo

### 🔐 [Guía de Autenticación con Clerk](clerk-authentication-guide.md)
- Implementación completa del sistema de autenticación
- Componentes reutilizables (AuthGuard, UserButton, LogoutButton)
- Configuración de middleware y rutas protegidas
- Variables de entorno y personalización
- Ejemplos de código y mejores prácticas

### 🔍 [Reglas de Context7](context7-usage-rules.md)
**⚠️ REGLA CRÍTICA**
- Proceso obligatorio antes de instalar paquetes
- Plantillas de consulta específicas
- Ejemplos prácticos del proyecto
- Checklist de verificación
- Casos especiales y troubleshooting

### ⚛️ [Guía de React Context](react-context-guide.md)
- Patrones de Context implementados en el proyecto
- CourseContext y ProfileContext
- Custom hooks y validación
- Mejores prácticas y errores comunes
- Tutorial interactivo disponible

## 🚀 Estado de Implementación

### ✅ Completado
- **Sistema de Autenticación**: Clerk completamente integrado
- **Documentación Web**: Sistema accesible vía navegador
- **React Context**: Implementaciones funcionales
- **Context7**: Reglas definidas y documentadas
- **Infraestructura**: Next.js 15, TypeScript, ShadCN/UI

### 🚧 En Progreso
- **Catálogo de Cursos**: Estructura base definida
- **Sistema de Contenidos**: Planificación en curso

### ⏳ Pendiente
- **CMS Avanzado**: Gestión completa de contenidos
- **Deployment Avanzado**: CI/CD y monitoreo

## 🔗 Enlaces Rápidos

### Aplicación en Desarrollo
- **Aplicación Principal**: http://localhost:3000
- **Demo de Autenticación**: http://localhost:3000/demo/auth
- **Documentación Web**: http://localhost:3000/docs/auth
- **Tutorial React Context**: http://localhost:3000/tutorial/context

### Comandos Esenciales
```bash
# Iniciar desarrollo (SOLO pnpm)
pnpm dev

# Instalar dependencias
pnpm install

# Agregar componente ShadCN/UI
pnpm dlx shadcn@latest add <componente>

# Build para producción
pnpm build
```

### Variables de Entorno Críticas
```bash
# .env.local (REQUERIDO)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

## ⚠️ Reglas Críticas

### 1. Context7 - Consulta Obligatoria
**ANTES de instalar cualquier paquete:**
```
use context7

Quiero instalar [paquete] para [propósito]. ¿Cuál es la versión más reciente, cómo se instala con pnpm, y cuáles son las mejores prácticas para Next.js 15?
```

### 2. Package Manager
- **SOLO pnpm** - Prohibido npm, yarn, bun
- **Verificar Context7** antes de cualquier instalación
- **Seguir versiones recomendadas**

### 3. Arquitectura Next.js 15
- **App Router** obligatorio
- **Server Components** por defecto
- **Client Components** solo cuando sea necesario
- **TypeScript** tipado completo

### 4. Autenticación
- **Clerk** como sistema principal
- **Middleware** para protección de rutas
- **Componentes reutilizables** para UI
- **Variables de entorno** configuradas correctamente

## 📚 Recursos Adicionales

### Documentación Oficial
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Clerk Authentication](https://clerk.com/docs)
- [ShadCN/UI Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Documentación Interna
- **Reglas de Codificación**: `.github/prompts/nextjs15-coding.prompt.md`
- **Reglas de Windsurf**: `.windsurf/rules/windsurf-rules.md`
- **Documentación de Producto**: `../product/`

---

**📝 Importante**: Estas guías se actualizan constantemente. Siempre consulta la versión más reciente antes de comenzar el desarrollo.

**🔄 Última actualización**: 2025-07-28