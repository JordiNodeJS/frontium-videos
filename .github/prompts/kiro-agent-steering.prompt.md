---
description: "Prompt para generar archivos de steering completos para Kiro AI"
mode: agent
---

# Generador de Archivos de Steering para Kiro AI

Analiza este repositorio y crea archivos de steering completos para guiar futuros desarrollos con IA. Necesito tres archivos en `.kiro/steering/`:

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

## Instrucciones de Análisis:

1. **Examina estos archivos clave**:
   - `package.json` - Dependencies y scripts
   - `README.md` - Descripción del proyecto
   - `tsconfig.json` - Configuración TypeScript
   - `next.config.js/ts` - Configuración Next.js
   - Archivos de configuración (ESLint, Tailwind, etc.)

2. **Analiza la estructura de carpetas**:
   - Directorios principales en `src/`
   - Patrones de organización
   - Convenciones de naming

3. **Identifica el stack tecnológico**:
   - Framework principal y versión
   - Librerías de UI y styling
   - State management
   - Database y ORM
   - Herramientas de desarrollo

4. **Extrae información del negocio**:
   - Propósito de la aplicación del README
   - Características mencionadas
   - Target audience implícito

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

**Nota**: Estos archivos de steering se incluirán automáticamente en el contexto de futuras interacciones con IA, asegurando consistencia en el desarrollo.