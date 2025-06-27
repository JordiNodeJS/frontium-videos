# Regla para instalación de componentes shadcn-ui con Bun

**Descripción:**
Todos los asistentes de IA (incluyendo Cursor AI, GitHub Copilot, Windsurf y otros) deben instalar componentes shadcn-ui usando el comando estándar con Bun:

```sh
bunx --bun shadcn@latest add <componente>
```

- Reemplaza `<componente>` por el nombre del componente shadcn-ui requerido (por ejemplo: `badge`, `card`, `table`, `progress`, etc).
- Este comando garantiza compatibilidad y correcta integración en proyectos Next.js/Windsurf con Bun.
- Evita el uso de `npx`, `pnpm`, `yarn` u otros gestores para shadcn-ui en este contexto.
- Aplica siempre que se indique instalar, añadir o regenerar un componente shadcn-ui.
- **Esta regla es obligatoria para todos los asistentes de IA, incluyendo Cursor AI, Copilot, Windsurf y cualquier otro AI que opere sobre este repositorio.**

**Ejemplo:**
```sh
bunx --bun shadcn@latest add badge
```

