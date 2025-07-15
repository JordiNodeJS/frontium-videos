---
description: "Prompt para generar y actualizar archivos de steering completos para Kiro AI"
mode: agent
---

# Generador y Actualizador de Archivos de Steering para Kiro AI

Analiza este repositorio y crea/actualiza archivos de steering completos para guiar futuros desarrollos con IA. 

## Modo de Operación

### Creación Inicial
Si no existen archivos de steering, créalos desde cero en `.kiro/steering/`.

### Actualización Incremental
Si ya existen archivos de steering:
1. **Compara** el contenido actual con el estado del repositorio
2. **Identifica cambios** en dependencies, estructura, o configuración
3. **Actualiza solo las secciones** que han cambiado
4. **Preserva** información manual añadida por desarrolladores
5. **Añade comentarios** indicando qué se actualizó y cuándo

## Archivos a Generar/Actualizar:

## 1. `product.md` - Documenta:
- **Propósito y visión del producto**: Descripción clara de qué hace la aplicación
- **Características principales**: Features core y funcionalidades clave
- **Usuarios objetivo**: Quién usa la aplicación y para qué
- **Modelo de negocio**: Cómo se monetiza o genera valor
- **Casos de uso principales**: Flujos de usuario más importantes

## 2. `tech.md` - Documenta:
- **Stack tecnológico completo**: Frameworks, librerías y versiones específicas
- **Runtime y herramientas**: Package managers, bundlers, etc.
- **Configuración de desarrollo**: Setup local y comandos comunes
- **Patrones de arquitectura**: Estructura de código y mejores prácticas
- **Comandos frecuentes**: Scripts de desarrollo, build, testing, database
- **Integraciones externas**: APIs, servicios de terceros, autenticación

## 3. `structure.md` - Documenta:
- **Organización de directorios**: Estructura completa del proyecto
- **Convenciones de nomenclatura**: Archivos, componentes, variables
- **Patrones de importación**: Path aliases, organización de imports
- **Estructura de componentes**: UI, layouts, páginas
- **Configuraciones**: TypeScript, ESLint, styling, etc.
- **Flujos de datos**: State management, data fetching patterns

## Detección de Cambios

Antes de actualizar, verifica si han ocurrido cambios significativos:

### Triggers de Actualización
- **Nuevas dependencias** en `package.json`
- **Cambios en configuración** (tsconfig, next.config, etc.)
- **Nueva estructura de carpetas** en `src/`
- **Actualización del README** con nuevas features
- **Nuevos archivos de configuración** (ESLint, Tailwind, etc.)
- **Cambios en scripts** de package.json

### Versionado de Steering
- Añade al final de cada archivo: `<!-- Última actualización: [FECHA] - [CAMBIOS] -->`
- Mantén un historial de cambios en comentarios
- Preserva secciones marcadas con `<!-- MANUAL: No actualizar automáticamente -->`

## Instrucciones de Análisis:

### 1. Análisis de Configuración
- `package.json` - Dependencies, scripts, y metadatos
- `README.md` - Descripción, setup, y características
- `tsconfig.json` - Configuración TypeScript y path aliases
- `next.config.js/ts` - Configuración Next.js
- `tailwind.config.js` - Configuración de styling
- `eslint.config.*` - Reglas de linting
- `.env.example` - Variables de entorno requeridas

### 2. Análisis de Estructura
- Directorios en `src/` y su propósito
- Patrones de organización de componentes
- Convenciones de naming observadas
- Estructura de rutas (App Router vs Pages Router)

### 3. Análisis de Stack Tecnológico
- Framework principal y versión exacta
- Librerías de UI (shadcn/ui, Material-UI, etc.)
- State management (Redux, Zustand, Context)
- Database y ORM (Prisma, Drizzle, etc.)
- Autenticación (NextAuth, Clerk, etc.)
- Styling (Tailwind, CSS Modules, etc.)

### 4. Análisis de Negocio
- Propósito principal de la aplicación
- Features implementadas vs planificadas
- Target audience identificado
- Modelo de monetización (si aplica)

## Formato de Salida:

- **Archivos Markdown** con estructura clara
- **Secciones bien organizadas** con headers apropiados
- **Información concisa pero completa**
- **Ejemplos de comandos** en bloques de código
- **Referencias específicas** a archivos y configuraciones

## Objetivo:

Los archivos resultantes deben servir como **guía definitiva** para cualquier IA que trabaje en este proyecto, proporcionando contexto completo sobre:
- Qué construir (product)
- Cómo construirlo (tech)  
- Dónde ubicar las cosas (structure)

## Automatización y Uso

### Cuándo Ejecutar Este Prompt

#### Ejecución Manual
- **Después de cambios mayores** en dependencies o configuración
- **Al añadir nuevas features** significativas al proyecto
- **Antes de onboarding** de nuevos desarrolladores
- **Revisión mensual** para mantener documentación actualizada

#### Triggers Automáticos (Recomendados)
- **Post-commit hook** cuando cambia `package.json`
- **GitHub Action** en PRs que modifican configuración
- **Scheduled job** semanal para verificar consistencia
- **Pre-deployment** para asegurar documentación actualizada

### Comandos de Uso

#### Para Crear Steering Files Iniciales
```bash
# Usar este prompt en Kiro AI
/kiro-agent-steering
```

#### Para Actualizar Steering Files Existentes
```bash
# Verificar cambios primero
git diff HEAD~10 --name-only | grep -E "(package\.json|README\.md|tsconfig\.json|next\.config)"

# Ejecutar actualización si hay cambios relevantes
/kiro-agent-steering
```

### Integración con Hooks de Kiro

Puedes crear un hook automático en Kiro que ejecute este prompt:

1. **Trigger**: Cuando se modifiquen archivos de configuración
2. **Acción**: Ejecutar este prompt automáticamente
3. **Resultado**: Steering files actualizados sin intervención manual

### Validación Post-Actualización

Después de ejecutar el prompt, verifica:
- [ ] Los tres archivos existen en `.kiro/steering/`
- [ ] Información técnica coincide con `package.json`
- [ ] Estructura documentada refleja `src/` actual
- [ ] Comandos listados funcionan correctamente
- [ ] Fechas de actualización están presentes

**Nota**: Estos archivos de steering se incluirán automáticamente en el contexto de futuras interacciones con IA, asegurando consistencia en el desarrollo.