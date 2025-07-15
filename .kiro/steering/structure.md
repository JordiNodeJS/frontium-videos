# Project Structure

## Root Directory Organization
```
├── src/                    # Source code
├── public/                 # Static assets
├── prisma/                 # Database schema and migrations
├── tests/                  # Test files
├── ai-tasks/              # AI assistant task documentation
├── .kiro/                 # Kiro configuration and steering
└── node_modules/          # Dependencies
```

## Source Code Structure (`src/`)

### App Router (`src/app/`)
- **Next.js 15 App Router** structure
- Route groups: `(auth)/`, `(root)/`, `courses/`, `profile/`
- `layout.tsx` - Root layout with font configuration
- `globals.css` - Global styles and Tailwind imports

### Components (`src/components/`)
- `ui/` - shadcn/ui components (reusable UI primitives)
- `root/` - Application-specific components
- `StoreProvider.tsx` - Redux store provider wrapper

### State Management (`src/store/`)
- `store.ts` - Redux store configuration
- `slices/` - Redux Toolkit slices for state management
- Follow slice-based architecture pattern

### Utilities (`src/lib/`)
- `utils.ts` - Common utility functions (includes `cn` for className merging)
- Shared helper functions and configurations

### Mock Data (`src/mocks/`)
- `data/` - Mock data for development and testing
- Use for prototyping before database integration

## Configuration Files

### TypeScript
- Path aliases configured: `@/*` maps to `./src/*`
- Strict mode enabled
- Next.js plugin integration

### Styling
- `components.json` - shadcn/ui configuration (New York style)
- Tailwind CSS v4 with PostCSS integration
- CSS variables for theming

### Development
- ESLint with Next.js and TypeScript rules
- Bun as package manager and runtime

## Naming Conventions
- **Files**: PascalCase for components, camelCase for utilities
- **Directories**: lowercase with hyphens for routes, camelCase for others
- **Components**: PascalCase with descriptive names
- **Hooks**: camelCase starting with "use"
- **Types**: PascalCase with "Type" or "Interface" suffix

## Import Patterns
- Use path aliases (`@/components`, `@/lib`, etc.)
- Group imports: external libraries first, then internal modules
- Prefer named exports over default exports for utilities