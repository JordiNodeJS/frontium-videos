# Academia Online Full Stack

Aplicación web full-stack para gestionar y consumir contenido formativo.  
Construida con Next.js 15, TypeScript; ejecutada con **pnpm** como gestor de paquetes.

## 🗂️ Estructura principal

| Path | Descripción |
|------|-------------|
| `app/` | Rutas y páginas (Next.js App Router) |
| `components/` | Componentes reutilizables de UI |
| `actions/` | Acciones del servidor (mutaciones y lógica de negocio) |
| `prisma/` | Esquema, migraciones y seed de la base de datos |
| `lib/`, `utils/`, `hooks/` | Helpers, utilidades y hooks personalizados |
| `public/` | Activos estáticos (imágenes, fuentes, íconos) |

## 🛠️ Tecnologías clave

- **pnpm** – Gestor de paquetes rápido y eficiente con workspace support  
- **Next.js 14** – SSR/SSG/ISR y API Routes  
- **React 18 + TypeScript** – Front-end tipado y reactivo  
- **Prisma ORM** – Acceso a base de datos SQL (PostgreSQL por defecto)  
- **Tailwind CSS + shadcn/ui** – Estilos utilitarios y componentes accesibles  
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

# Migraciones iniciales
pnpm dlx prisma migrate dev

# Seed opcional
pnpm dlx prisma db seed

# Entorno de desarrollo
pnpm dev