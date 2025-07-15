# Technology Stack

## Runtime & Package Manager
- **Bun v1** - Primary runtime and package manager (ultrafast JS/TS execution)
- Use `bun` commands instead of `npm` or `yarn`

## Core Framework
- **Next.js 15.3.4** with App Router
- **React 19** with TypeScript
- Server-side rendering (SSR) and static generation (SSG)

## State Management
- **Redux Toolkit** with React-Redux
- Store configuration in `src/store/`
- Slice-based architecture for state management

## Styling & UI
- **Tailwind CSS v4** for utility-first styling
- **shadcn/ui** components (New York style variant)
- **Lucide React** for icons
- **Radix UI** primitives for accessible components
- CSS variables enabled for theming

## Database & Backend
- **Prisma ORM** for database operations
- **PostgreSQL** (Neon serverless recommended for production)
- **Better Auth** for authentication (OAuth, magic links)
- **Stripe** for payment processing

## Development Tools
- **TypeScript 5** with strict mode enabled
- **ESLint** with Next.js configuration
- **PostCSS** with Tailwind integration

## Common Commands

### Development
```bash
bun dev              # Start development server with Turbopack
bun build            # Build for production
bun start            # Start production server
bun lint             # Run ESLint
```

### Database
```bash
bunx prisma migrate dev    # Run database migrations
bunx prisma db seed        # Seed database with initial data
bunx prisma studio         # Open Prisma Studio
```

### Package Management
```bash
bun install          # Install dependencies
bun add <package>    # Add new dependency
bun remove <package> # Remove dependency
```