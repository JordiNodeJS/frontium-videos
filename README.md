# Academia Online Full Stack

Aplicación web full-stack para gestionar y consumir contenido formativo.  
Construida con Next.js 14, TypeScript y Prisma; ejecutada con **Bun** (runtime + gestor de paquetes).

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

- **Bun v1** – Runtime JS/TS ultrarrápido y gestor de paquetes  
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
bun install

# Variables de entorno
cp example.env .env.local
# ▸ Rellena las claves de Better Auth, Stripe y la URL/credenciales de tu BBDD

# Migraciones iniciales
bunx prisma migrate dev

# Seed opcional
bunx prisma db seed

# Entorno de desarrollo
bun run dev   # o simplemente: bun dev