---
title: Uso de Redux y ClientProviders en Next.js 15 App Router
author: Frontium Videos Team
category: coding
language: es
---

# REGLA: Uso de Redux y ClientProviders en Next.js 15 (App Router)

## Contexto
Esta regla define las mejores prácticas para el uso de Redux Toolkit y el componente ClientProviders en proyectos Next.js 15 con App Router, siguiendo las recomendaciones oficiales de Redux Toolkit ([Redux Toolkit Setup with Next.js](https://redux.js.org/usage/nextjs)) y las convenciones del proyecto Frontium Videos.

## Principios clave
- **Redux solo en componentes cliente**: Solo los componentes marcados con 'use client' pueden interactuar con la store de Redux (hooks, contextos, etc.).
- **Scope mínimo para ClientProviders**: Envuelve únicamente los componentes cliente que realmente necesitan acceso a la store de Redux. No envuelvas layouts, páginas completas ni Server Components salvo que sea imprescindible.
- **Store global y mutable**: Usa Redux solo para datos globales y mutables (ej: favoritos, autenticación). Para datos de página o fetch, usa Server Components y React Context.
- **Evita singletons globales en SSR**: Si necesitas hidratar datos de Redux en SSR, implementa una función `makeStore` para crear la store por request. Para uso solo en cliente, la store singleton es aceptable.
- **Importación centralizada de la store**: Importa siempre la store desde un único archivo (ej: `@/store/store`) para garantizar un estado global y consistente.

## Ejemplo correcto
```tsx
// Server Component
<div>
  <ServerComponent />
  <ClientProviders>
    <FavoriteButton courseId={course.id} />
  </ClientProviders>
</div>
```

## Ejemplo incorrecto
```tsx
// Scope demasiado amplio
<ClientProviders>
  <ServerComponent />
  <FavoriteButton courseId={course.id} />
</ClientProviders>
```

## Checklist para la IA
- [ ] ¿Solo los componentes cliente usan Redux?
- [ ] ¿ClientProviders envuelve solo lo necesario?
- [ ] ¿La store se importa siempre desde el mismo archivo?
- [ ] ¿Redux solo gestiona datos globales y mutables?
- [ ] ¿Se evita el uso de singletons globales en SSR?

## Referencias
- [Redux Toolkit Setup with Next.js](https://redux.js.org/usage/nextjs)
- [nextjs15-coding.prompt.md]
- [redux-favorites.prompt.md] 