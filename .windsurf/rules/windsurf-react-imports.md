# Reglas de Importaciones React para Windsurf - Frontium Videos

## Importación Explícita de React (OBLIGATORIO)

### Descripción
En el proyecto Frontium Videos que utiliza Next.js 15 y React 18, se debe seguir **SIEMPRE** el patrón de importación explícita para todos los elementos de React (hooks, tipos, componentes, etc), en lugar de usar el namespace `React`.

### Implementación

#### ✅ CORRECTO - Importación explícita
```tsx
import { 
  useState, 
  useEffect, 
  useRef,
  FormEvent,
  ChangeEvent,
  FC,
  ReactNode 
} from 'react';

export default function MyComponent() {
  const [state, setState] = useState<string>('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Lógica...
  };
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
}
```

#### ❌ INCORRECTO - Namespace React
```tsx
import React from 'react';

export default function MyComponent() {
  const [state, setState] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica...
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
}
```

## Beneficios

1. **Tree-shaking optimizado**: Solo se incluye en el bundle final el código que realmente se utiliza
2. **Mejor legibilidad**: Código más limpio y menos verboso
3. **Autocompletado mejorado**: Los IDEs pueden sugerir importaciones específicas más fácilmente
4. **Consistencia**: Mantiene un patrón coherente en toda la base de código
5. **Mantenibilidad**: Facilita la identificación de las dependencias exactas de cada componente
6. **Compatibilidad con Next.js 15**: Optimiza el rendimiento con Server Components

## Aplicación Obligatoria

Esta regla se aplica a **TODOS** los archivos del proyecto:

- **Server Components** (por defecto en Next.js 15)
- **Client Components** (con `'use client'`)
- **Hooks personalizados** (`useAuth`, `useLocalStorage`, etc.)
- **Utilidades** que utilizan elementos de React
- **Componentes de UI** (ShadCN/UI y personalizados)

## Orden de Importaciones

Seguir este orden específico:

```tsx
// 1. Imports de React
import { useState, useEffect, FormEvent } from 'react';

// 2. Imports de Next.js
import Link from 'next/link';
import Image from 'next/image';

// 3. Imports de librerías externas
import { clsx } from 'clsx';
import { z } from 'zod';

// 4. Imports internos con alias
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

// 5. Imports relativos
import './styles.css';
```

## Configuración ESLint

Para mantener esta consistencia automáticamente:

```js
// eslint.config.mjs
import reactPlugin from 'eslint-plugin-react';

export default [
  {
    plugins: {
      react: reactPlugin
    },
    rules: {
      // Evitar el uso de React.createElement
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // Recomendar importaciones explícitas
      'react/destructuring-assignment': ['error', 'always'],
      // Orden de importaciones
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always'
        }
      ]
    }
  }
]
```

## Excepciones

La única excepción permitida es cuando se necesita acceder a elementos que no se pueden importar explícitamente, como algunas API experimentales o tipos específicos no exportados directamente.

---

**IMPORTANTE**: Esta regla es **obligatoria** y debe ser seguida estrictamente por Windsurf y cualquier desarrollador en el proyecto Frontium Videos. Cualquier código que no siga esta convención debe ser corregido.