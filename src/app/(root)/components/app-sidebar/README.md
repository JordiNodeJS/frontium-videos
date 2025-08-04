# AppSidebar - Componente Modular

Este directorio contiene el componente `AppSidebar` completamente refactorizado y modularizado para mejorar la mantenibilidad, reutilización y rendimiento.

## 📁 Estructura de Archivos

```
app-sidebar/
├── README.md                    # Documentación
├── index.ts                     # Exportaciones principales
├── types.ts                     # Tipos TypeScript
├── navigation-data.ts           # Datos de navegación (IDs manuales)
├── navigation-config.ts         # Configuración de navegación (IDs automáticos)
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
  id: string;        // ID único descriptivo
  title: string;
  url: string;
  icon: LucideIcon;
}
```

### `NavigationGroup`
```typescript
interface NavigationGroup {
  id: string;        // ID único descriptivo
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

### Opción 1: IDs Manuales (Control Total)
Para control total sobre los IDs, modifica `navigation-data.ts`:

```typescript
export const navigationData: NavigationData = [
  {
    id: "new-group",           // ✅ ID único descriptivo manual
    label: "Nuevo Grupo",
    items: [
      { 
        id: "new-page",        // ✅ ID único descriptivo manual
        title: "Nueva Página", 
        url: "/nueva", 
        icon: NewIcon 
      },
    ],
  },
  // ... otros grupos
];
```

### Opción 2: IDs Automáticos Simples ⭐ **Recomendado**
Para generación automática súper simple, modifica `navigation-config.ts`:

```typescript
// ✨ Solo defines esto (como siempre)
const groups = [
  {
    label: "Nuevo Grupo",     // ✅ Solo necesitas el label
    items: [
      { 
        title: "Nueva Página", // ✅ Solo título, URL e icono
        url: "/nueva", 
        icon: NewIcon 
      },
    ],
  },
];

// ✨ Y automáticamente obtienes IDs:
// - Grupo: "nuevo-grupo"
// - Item: "nueva-pagina"
```

### 🎯 **Función Súper Simple con Hex**

```typescript
/**
 * Genera ID único: "Mi Perfil" → "mi-perfil-8f2a"
 */
function createId(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  const hex = crypto.getRandomValues(new Uint8Array(2))
    .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
  
  return `${base}-${hex}`;
}
```

### ✨ **Ejemplos de IDs generados:**

```typescript
createId("Mi Perfil")        // → "mi-perfil-8f2a"
createId("Buscar Cursos")    // → "buscar-cursos-d4e5"
createId("Panel de Control") // → "panel-de-control-a1b2"
```

### 🚀 **Ventajas del Hex corto:**

- ✅ **Compacto**: Solo 4 caracteres vs 6 del UUID
- ✅ **Único**: 65,536 combinaciones posibles
- ✅ **Rápido**: Menos bytes que procesar
- ✅ **Limpio**: Solo caracteres hexadecimales (0-9, a-f)

## 🧪 Testing

Los componentes están diseñados para ser fácilmente testeable:
- Componentes puros con props bien definidas
- Hooks separados para testing de lógica
- Mocks simples para navegación

## 📈 Rendimiento

- **Re-renders mínimos**: Solo cuando cambia la ruta
- **Memorización inteligente**: Componentes y funciones optimizadas
- **Bundle size**: Importaciones específicas para reducir el tamaño