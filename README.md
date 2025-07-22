# Academia Online Full Stack

Aplicación web full-stack para gestionar y consumir contenido formativo.  
Construida con Next.js 15, TypeScript y React 19; gestionada con **pnpm**.

## 🗂️ Estructura principal

| Path                       | Descripción                                            |
| -------------------------- | ------------------------------------------------------ |
| `app/`                     | Rutas y páginas (Next.js App Router)                   |
| `components/`              | Componentes reutilizables de UI                        |
| `actions/`                 | Acciones del servidor (mutaciones y lógica de negocio) |
| `prisma/`                  | Esquema, migraciones y seed de la base de datos        |
| `lib/`, `utils/`, `hooks/` | Helpers, utilidades y hooks personalizados             |
| `public/`                  | Activos estáticos (imágenes, fuentes, íconos)          |

## 🛠️ Tecnologías clave

- **pnpm** – Gestor de paquetes eficiente y rápido
- **Next.js 15** – SSR/SSG/ISR y API Routes con Turbopack
- **React 19 + TypeScript** – Front-end tipado y reactivo
- **Tailwind CSS v4 + shadcn/ui** – Estilos utilitarios y componentes accesibles
- **Prisma ORM** – Acceso a base de datos SQL (PostgreSQL por defecto)
- **Better Auth** – Autenticación de usuarios (OAuth, magic links, etc.)
- **Stripe** – Pasarela de pago para compra de cursos
- **Neon** – PostgreSQL serverless (opcional en producción)

## 🚀 Puesta en marcha

```bash
# Instalación de dependencias
pnpm install

# Variables de entorno
cp example.env .env.local
# ▸ Rellena las claves de Better Auth, Stripe y la URL/credenciales de tu BBDD

# Migraciones iniciales (cuando tengas Prisma configurado)
pnpm dlx prisma migrate dev

# Seed opcional (cuando tengas Prisma configurado)
pnpm dlx prisma db seed

# Entorno de desarrollo
pnpm dev
```

## 📦 Scripts disponibles

```bash
pnpm dev          # Servidor de desarrollo con Turbopack
pnpm build        # Build para producción
pnpm start        # Servidor de producción
pnpm lint         # Análisis de código con ESLint
pnpm clean        # Limpiar caché y archivos temporales
pnpm reinstall    # Reinstalar todas las dependencias
```
