# Reglas de Importaciones React para Windsurf

## Importación Explícita de React (Obligatorio)

### Descripción
En proyectos Windsurf que utilizan Next.js 15 y React, se debe seguir el patrón de importación explícita para todos los elementos de React (hooks, tipos, componentes, etc).

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

export function MyComponent() {
  const [state, setState] = useState<string>('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Lógica...
  };
}
```

#### ❌ INCORRECTO - Namespace React
```tsx
import React from 'react';

export function MyComponent() {
  const [state, setState] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica...
  };
}
```

## Beneficios

1. **Tree-shaking optimizado**: Solo se incluye en el bundle final el código que realmente se utiliza
2. **Mejor legibilidad**: Código más limpio y directo
3. **Autocompletado mejorado**: Los IDEs pueden sugerir importaciones específicas
4. **Consistencia**: Mantiene un patrón coherente en toda la base de código
5. **Mantenibilidad**: Facilita la identificación de las dependencias exactas de cada componente

## Aplicación

Esta regla se aplica a:

- **Todos los componentes** del proyecto (Server y Client Components)
- **Todas las utilidades** que utilizan elementos de React
- **Todos los hooks** personalizados

## Herramientas

Para mantener esta consistencia, se recomienda utilizar reglas de ESLint específicas:

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
      'react/destructuring-assignment': ['error', 'always']
    }
  }
]
```

---

Esta regla es compatible con la configuración moderna de React y Next.js 15, que no requiere la importación de `React` en el ámbito superior para JSX gracias a la transformación automática de JSX.