---
description: "Regla de importaciones explícitas de React en lugar de namespace React"
mode: agent
---

# Regla para importaciones React en Next.js 15

## Importación explícita de tipos y hooks

**Descripción:**
Al trabajar con React y TypeScript en proyectos Next.js 15, se debe utilizar siempre la técnica de importación explícita de tipos, hooks y otros elementos de React, en lugar de acceder a ellos a través del namespace `React`.

### ✅ CORRECTO:
```tsx
import { useState, useEffect, FormEvent, ChangeEvent, FC, ReactNode } from 'react';

export default function Component() {
  const [state, setState] = useState(null);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // código...
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // código...
  };
}
```

### ❌ INCORRECTO:
```tsx
import React from 'react';

export default function Component() {
  const [state, setState] = React.useState(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // código...
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // código...
  };
}
```

## Motivación

1. **Mejor legibilidad**: El código es más limpio y menos verboso
2. **Tree-shaking optimizado**: Permite que los bundlers eliminen código no utilizado más eficientemente
3. **Autocompletado mejorado**: Los IDEs pueden sugerir importaciones adicionales más fácilmente
4. **Mantenibilidad**: Facilita identificar exactamente qué elementos de React se están utilizando
5. **Consistencia**: Mantiene un estilo coherente en toda la base de código

## Excepciones

La única excepción permitida es cuando se necesita acceder a elementos que no se pueden importar explícitamente, como algunas API experimentales o tipos específicos no exportados directamente.

Esta regla se aplica a **todos los componentes**, tanto Server Components como Client Components, en el proyecto Frontium Videos. 