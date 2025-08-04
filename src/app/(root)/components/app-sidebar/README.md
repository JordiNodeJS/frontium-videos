# AppSidebar - Componente Modular

Este directorio contiene el componente `AppSidebar` completamente refactorizado y modularizado para mejorar la mantenibilidad, reutilización y rendimiento.

## 📁 Estructura de Archivos

```
app-sidebar/
├── README.md                    # Documentación
├── index.ts                     # Exportaciones principales
├── types.ts                     # Tipos TypeScript
├── navigation-data.ts           # Datos de navegación
├── app-sidebar.tsx             # Componente principal
├── sidebar-group.tsx           # Componente de grupo
├── sidebar-menu-item.tsx       # Componente de item
└── hooks/
    └── use-navigation.ts       # Hook personalizado
```

## 🧩 Componentes

### `AppSidebar`
Componente principal que orquesta toda la navegación del sidebar.

### `OptimizedSidebarGroup`
Componente memoizado que renderiza un grupo de navegación con su etiqueta e items.

### `OptimizedSidebarMenuItem`
Componente memoizado que renderiza un item individual del menú con su icono y enlace.

## 🎣 Hooks

### `useNavigation`
Hook personalizado que maneja la lógica de navegación:
- Detecta la ruta actual
- Proporciona función `isActive` optimizada

## 📊 Tipos

### `NavigationItem`
```typescript
interface NavigationItem {
  title: string;
  url: string;
  icon: LucideIcon;
}
```

### `NavigationGroup`
```typescript
interface NavigationGroup {
  label: string;
  items: NavigationItem[];
}
```

### `NavigationData`
```typescript
type NavigationData = NavigationGroup[];
```

## 🚀 Optimizaciones

1. **Memoización**: Componentes optimizados con `React.memo`
2. **Hooks personalizados**: Lógica reutilizable separada
3. **Separación de responsabilidades**: Cada archivo tiene un propósito específico
4. **TypeScript**: Tipado fuerte para mejor DX

## 🔧 Uso

```tsx
import { AppSidebar } from '@/app/(root)/components/app-sidebar';

// En tu layout o componente padre
<AppSidebar />
```

## 🎨 Personalización

Para añadir nuevos items o grupos, modifica `navigation-data.ts`:

```typescript
export const navigationData: NavigationData = [
  {
    label: "Nuevo Grupo",
    items: [
      { title: "Nueva Página", url: "/nueva", icon: NewIcon },
    ],
  },
  // ... otros grupos
];
```

## 🧪 Testing

Los componentes están diseñados para ser fácilmente testeable:
- Componentes puros con props bien definidas
- Hooks separados para testing de lógica
- Mocks simples para navegación

## 📈 Rendimiento

- **Re-renders mínimos**: Solo cuando cambia la ruta
- **Memorización inteligente**: Componentes y funciones optimizadas
- **Bundle size**: Importaciones específicas para reducir el tamaño