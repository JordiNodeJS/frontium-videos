---
trigger: always_on
---

# Reglas de IA y Codificación para Windsurf y Frontium Videos

## Regla de acceso a rutas en Windows (Windsurf)

Usa siempre la ruta exactamente como está autorizada, respetando mayúsculas/minúsculas en la letra de la unidad y el resto del path.

Siempre utiliza la letra de la unidad en mayúsculas al especificar rutas de archivos o carpetas en Windows.

Ejemplo correcto:
G:\DEV\academia\frontium-videos
Ejemplo incorrecto:
g:\DEV\academia\frontium-videos

---

## Reglas de IA y desarrollo (Frontium Videos)

- SIEMPRE usar `bun` y `bunx` como package manager y ejecutor de scripts.
- Puerto de desarrollo: **4000**.
- Comandos Git: SIEMPRE en inglés.
- Respuestas del asistente: SIEMPRE en español (excepto commits).
- Tecnologías obligatorias: Next.js 15 (App Router), TypeScript, bun, ESLint flat config, Prettier.
- NUNCA usar Pages Router ni npm/yarn/pnpm.
- Estructura de archivos y carpetas según los estándares definidos en `.github/prompts/nextjs15-coding-rules.md` y `.github/prompts/cursor-rules.md`.
- Naming conventions estrictas para componentes, páginas, hooks, server actions y tipos.
- Formato de commits en inglés y siguiendo el workflow git propuesto.
- Convenciones de importación y separación clara entre Server y Client Components.
- NO usar 'use client' innecesariamente.

---

**Estas reglas deben ser seguidas por la IA y por cualquier desarrollador o asistente en el proyecto.**

Para detalles ampliados, consulta los archivos de reglas en `.github/prompts/`.
