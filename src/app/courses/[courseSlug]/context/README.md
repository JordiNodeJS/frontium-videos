# 🎓 React Context: Guía Educativa y Mejores Prácticas

## 🤔 **1. ¿Qué Problema Resuelve? El Fin del "Prop Drilling"**

El problema principal que React Context soluciona es el **"prop drilling"** (perforación de props). Esto sucede cuando tienes que pasar datos (props) a través de varios niveles de componentes anidados, incluso si los componentes intermedios no necesitan esos datos para nada.

- **❌ Antes (con prop drilling):**
  `Page -> CourseInfo -> SomeChild -> GrandChild`
  En este escenario, `CourseInfo` y `SomeChild` tendrían que recibir y pasar la prop `course` solo para que `GrandChild` pueda usarla.

- **✅ Ahora (con Context):**
  `Page` provee los datos, y `GrandChild` los consume directamente. Los componentes intermedios no se enteran, resultando en un código más limpio y desacoplado.

## 📋 **2. Lo que acabamos de implementar**

Hemos refactorizado el código para usar React Context siguiendo las mejores prácticas de la industria. Aquí tienes todo lo que necesitas saber:

## 🏗️ **3. Arquitectura: Las 3 Piezas Clave**

Nuestra implementación se basa en un patrón robusto y moderno que consta de tres partes, todas centralizadas en `CourseContext.tsx`:

1.  **El Contexto (`CourseContext`)**: Es el "vehículo" que transporta los datos. Se crea una sola vez con `createContext`.
2.  **El Proveedor (`CourseProvider`)**: Es un componente que "envuelve" a otros. Su misión es **proveer** o hacer que los datos estén disponibles para todo el árbol de componentes que envuelve.
3.  **El Consumidor (Hook `useCourse`)**: Es la forma en que los componentes hijos **acceden** a los datos. Usar un hook personalizado como `useCourse` es la mejor práctica.

```
CourseContext.tsx (Context + Hook)
├── CourseProvider (Provider Component)
├── useCourse (Custom Hook)
└── CourseContextType (TypeScript Interface)
```

## 🌊 **4. Flujo de Datos en Nuestra App**

Así es como viajan los datos del curso en la aplicación:

### **Paso 1: Proveer los Datos (`page.tsx`)**

En la página del curso, obtenemos los datos y los "proveemos" envolviendo solo a los componentes que los necesitan con el `CourseProvider`.

```tsx
// src/app/courses/[courseSlug]/page.tsx
import { CourseProvider } from "./context/CourseContext";
import CourseInfo from "./components/CourseInfo";
import CourseContent from "./components/CourseContent";

export default async function CourseDetailPage({ params }) {
  const course = await getCourseDetails(params.courseSlug);

  return (
    <CourseProvider course={course}>
      <CourseInfo />
      <CourseContent />
    </CourseProvider>
  );
}
```

### **Paso 2: Consumir los Datos (`CourseInfo.tsx`)**

Dentro de cualquier componente hijo del `Provider`, usamos nuestro hook `useCourse()` para acceder a los datos de forma directa, segura y sin props.

```tsx
// src/app/courses/[courseSlug]/components/CourseInfo.tsx
import { useCourse } from "../context/CourseContext";

export default function CourseInfo() {
  // ✅ Acceso directo y seguro a los datos del curso
  const { course } = useCourse();

  return <h1>{course.title}</h1>;
}
```

## 🎯 **5. Best Practices Implementadas**

### 1. **Hook Personalizado (Custom Hook)**

```tsx
// ✅ BUENA PRÁCTICA
export function useCourse() {
  const context = useContext(CourseContext);

  if (context === undefined) {
    throw new Error("useCourse must be used within CourseProvider");
  }

  return context;
}

// ❌ MALA PRÁCTICA - usar useContext directamente
const context = useContext(CourseContext); // No valida el Provider
```

**¿Por qué usar Custom Hook?**

- ✅ Validación automática del Provider
- ✅ Mejor DX (Developer Experience)
- ✅ TypeScript safety mejorada
- ✅ Un solo punto de importación

### 2. **Provider Scope Limitado**

```tsx
// ✅ BUENA PRÁCTICA - Scope limitado
<CourseProvider course={course}>
  <CourseInfo />      {/* Solo los que necesitan los datos */}
  <CourseContent />
</CourseProvider>
<RelatedCourses />    {/* Fuera del Provider si no los necesita */}

// ❌ MALA PRÁCTICA - Scope muy amplio
<CourseProvider course={course}>
  <div className="entire-page">  {/* Todo el árbol de componentes */}
    <Header />
    <Navigation />
    <CourseInfo />
    <Footer />
  </div>
</CourseProvider>
```

### 3. **TypeScript Safety**

```tsx
// ✅ BUENA PRÁCTICA - Context tipado
interface CourseContextType {
  course: Course;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// ❌ MALA PRÁCTICA - Context sin tipos
const CourseContext = createContext(null);
```

### 4. **Separación de Responsabilidades**

```tsx
// ✅ BUENA PRÁCTICA - Archivos separados
CourseContext.tsx; // Context y lógica
CourseInfo.tsx; // Componente consumidor
page.tsx; // Provider y orquestación

// ❌ MALA PRÁCTICA - Todo en un archivo
// Context, Provider, y componentes mezclados
```

## 📊 **Comparación: Antes vs Después**

### **ANTES (Props)**

```tsx
// page.tsx
<CourseInfo course={course} />
<CourseContent course={course} />

// CourseInfo.tsx
export default function CourseInfo({ course }: { course: Course }) {
  return <h1>{course.title}</h1>;
}
```

### **DESPUÉS (Context)**

```tsx
// page.tsx
<CourseProvider course={course}>
  <CourseInfo />
  <CourseContent />
</CourseProvider>;

// CourseInfo.tsx
export default function CourseInfo() {
  const { course } = useCourse();
  return <h1>{course.title}</h1>;
}
```

## ⚖️ **Cuándo usar Context vs Props**

### **Usa Context cuando:**

- 🎯 5+ componentes necesitan los mismos datos
- 🏗️ Prop drilling de 3+ niveles de profundidad
- 🔄 Los datos cambian frecuentemente
- 🌍 Estado global o semi-global necesario

### **Usa Props cuando:**

- 🎯 2-3 componentes máximo
- 🏗️ 1-2 niveles de profundidad
- 📊 Datos estáticos o que cambian poco
- 🎨 Componentes reutilizables

## 🚨 **Errores Comunes y Cómo Evitarlos**

### 1. **Context Hell**

```tsx
// ❌ MALO - Demasiados Providers anidados
<UserProvider>
  <ThemeProvider>
    <CourseProvider>
      <NavigationProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </NavigationProvider>
    </CourseProvider>
  </ThemeProvider>
</UserProvider>

// ✅ MEJOR - Combinar contexts relacionados
<AppProvider> {/* Combina múltiples contexts internamente */}
  <App />
</AppProvider>
```

### 2. **Re-renders Innecesarios**

```tsx
// ❌ MALO - Context que cambia frecuentemente
const [courseData, setCourseData] = useState(course);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// Cada cambio en loading o error re-renderiza TODOS los consumidores

// ✅ MEJOR - Separar contexts por frecuencia de cambio
<CourseDataProvider>
  {" "}
  {/* Datos estáticos */}
  <CourseStatusProvider>
    {" "}
    {/* Estados que cambian */}
    <Components />
  </CourseStatusProvider>
</CourseDataProvider>;
```

### 3. **Usar Context para Todo**

```tsx
// ❌ MALO - Context para datos que solo usa 1 componente
<SingleComponentDataProvider>
  <ComponentThatUsesData />
</SingleComponentDataProvider>

// ✅ MEJOR - Props directas
<ComponentThatUsesData data={data} />
```

## 🎓 **Ejercicios de Aprendizaje**

### **Ejercicio 1: Agregar nuevo dato al Context**

Intenta agregar un campo `isEnrolled: boolean` al Context:

1. Actualiza `CourseContextType`
2. Modifica el Provider para recibir este dato
3. Usa el nuevo campo en un componente

### **Ejercicio 2: Context de Estado**

Convierte el Context de solo lectura a uno con estado:

1. Agrega `useState` al Provider
2. Incluye funciones para actualizar el estado
3. Implementa funciones como `enrollInCourse()`, `toggleFavorite()`

### **Ejercicio 3: Multiple Contexts**

Separa las responsabilidades:

1. `CourseDataContext` - Datos inmutables del curso
2. `CourseStatusContext` - Estado del usuario (enrolled, progress, etc.)
3. Practicia combinando ambos contexts

## 🎯 **Conclusión Educativa**

**Context es una herramienta poderosa**, pero como dice el dicho:

> "Con gran poder viene gran responsabilidad"

**Úsalo sabiamente:**

- ✅ Para casos complejos con múltiples niveles
- ✅ Cuando el prop drilling se vuelve problemático
- ✅ Para estado global real

**Evítalo para:**

- ❌ Casos simples que props resuelven mejor
- ❌ Datos que solo 1-2 componentes necesitan
- ❌ Como reemplazo automático de props

**La clave es elegir la herramienta correcta para cada situación.**
