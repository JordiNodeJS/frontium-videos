# 🎓 Tutorial Interactivo: React Context

## 📋 Descripción

Este tutorial interactivo demuestra cómo usar React Context en Frontium Videos con un ejemplo práctico paso a paso. Es un ejemplo educativo completo que muestra el patrón **Context + Custom Hook** en acción.

## 🎯 Objetivos de Aprendizaje

Al completar este tutorial, entenderás:

1. **¿Qué problema resuelve Context?** - El fin del prop drilling
2. **Cómo crear un Context** - Definición de tipos y estructura
3. **Cómo implementar un Provider** - Gestión de estado centralizada
4. **Cómo crear Custom Hooks** - Acceso seguro y validado
5. **Cómo usar Context en componentes** - Consumo de datos y funciones

## 🏗️ Arquitectura del Tutorial

### Estructura de Archivos

```
src/app/tutorial/context/
├── page.tsx                    # Página principal del tutorial
├── context/
│   └── TutorialContext.tsx     # Context + Custom Hook
├── components/
│   ├── TutorialHeader.tsx      # Header con progreso
│   ├── TutorialSidebar.tsx     # Navegación lateral
│   ├── TutorialContent.tsx     # Contenido del paso actual
│   └── TutorialControls.tsx    # Controles de navegación
└── README.md                   # Esta documentación
```

### Flujo de Datos

```
TutorialProvider (page.tsx)
├── Datos: tutorial, currentStep, progress
├── Funciones: nextStep(), prevStep(), goToStep()
└── Componentes que consumen:
    ├── TutorialHeader → useTutorial() → { tutorial, currentStep, progress }
    ├── TutorialSidebar → useTutorial() → { tutorial.steps, currentStep, goToStep }
    ├── TutorialContent → useTutorial() → { currentStepData, currentStep }
    └── TutorialControls → useTutorial() → { nextStep, prevStep, isFirstStep, isLastStep }
```

## 🎯 Conceptos Demostrados

### 1. **Context + Custom Hook Pattern**

El tutorial implementa el patrón completo usado en Frontium Videos:

```typescript
// ✅ Patrón completo implementado
const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

export function TutorialProvider({ tutorial, children }: TutorialProviderProps) {
  // Estado local y lógica de negocio
}

export function useTutorial(): TutorialContextType {
  // Validación y acceso seguro
}
```

### 2. **Estado Derivado**

El Context calcula automáticamente datos derivados:

```typescript
const currentStepData = tutorial.steps.find(step => step.id === currentStep);
const isFirstStep = currentStep === 1;
const isLastStep = currentStep === tutorial.totalSteps;
const progress = Math.round((currentStep / tutorial.totalSteps) * 100);
```

### 3. **Separación de Responsabilidades**

Cada componente tiene una responsabilidad específica:

- **TutorialHeader**: Mostrar información general y progreso
- **TutorialSidebar**: Navegación y lista de pasos
- **TutorialContent**: Contenido educativo del paso actual
- **TutorialControls**: Navegación secuencial

### 4. **Comunicación Reactiva**

Cuando un componente cambia el estado (ej. `nextStep()`), todos los demás componentes se actualizan automáticamente.

## 🚀 Cómo Usar el Tutorial

### Acceso

Navega a: `http://localhost:4000/tutorial/context`

### Navegación

1. **Botones Anterior/Siguiente**: Navegación secuencial
2. **Sidebar**: Salto directo a cualquier paso
3. **Indicadores visuales**: Progreso y estado de cada paso

### Características Interactivas

- ✅ **Progreso visual**: Barra de progreso y indicadores
- ✅ **Navegación inteligente**: Botones deshabilitados en extremos
- ✅ **Estados visuales**: Pasos completados, actual y pendientes
- ✅ **Código copiable**: Ejemplos de código con botón de copia
- ✅ **Explicaciones contextuales**: Insights específicos por paso

## 💡 Puntos Clave Educativos

### Sin Context (Prop Drilling)
```typescript
// ❌ Prop drilling - datos pasan por todos los niveles
<TutorialPage tutorial={tutorial}>
  <TutorialHeader tutorial={tutorial} currentStep={currentStep} />
  <TutorialContent tutorial={tutorial} currentStep={currentStep} />
  <TutorialControls tutorial={tutorial} currentStep={currentStep} onStepChange={setCurrentStep} />
</TutorialPage>
```

### Con Context
```typescript
// ✅ Context - acceso directo donde se necesita
<TutorialProvider tutorial={tutorial}>
  <TutorialHeader />  {/* useTutorial() internamente */}
  <TutorialContent /> {/* useTutorial() internamente */}
  <TutorialControls /> {/* useTutorial() internamente */}
</TutorialProvider>
```

## 🔧 Implementación Técnica

### Características del Context

1. **Tipado estricto**: TypeScript interfaces para todo
2. **Validación automática**: Error si se usa fuera del Provider
3. **Estado local**: Provider gestiona su propio estado
4. **Funciones de control**: nextStep, prevStep, goToStep
5. **Datos derivados**: Calculados automáticamente

### Performance

- **Optimización**: Solo re-renderiza cuando cambia el estado relevante
- **Scope limitado**: Provider solo envuelve componentes que lo necesitan
- **Cálculos eficientes**: Datos derivados calculados una vez por render

## 📚 Relación con el Proyecto

Este tutorial demuestra los mismos patrones usados en:

- **CourseContext** (`/courses/[courseSlug]`): Datos del curso
- **ProfileContext** (`/profile/[userId]`): Estado del perfil

### Similitudes

1. **Mismo patrón**: Context + Custom Hook
2. **Misma validación**: Error handling consistente
3. **Misma estructura**: Provider → Hook → Componentes
4. **Mismas convenciones**: Naming y organización

## 🎯 Próximos Pasos

Después de completar este tutorial:

1. **Explora los contextos reales**: CourseContext y ProfileContext
2. **Practica**: Crea tu propio Context siguiendo el patrón
3. **Consulta la documentación**: `docs/guides/react-context-guide.md`
4. **Revisa las reglas**: `.windsurf/rules/windsurf-rules.md`

## 🔗 Enlaces Útiles

- **Documentación completa**: `/docs/guides/react-context-guide.md`
- **Reglas del proyecto**: `/.windsurf/rules/windsurf-rules.md`
- **Ejemplos reales**: 
  - `/src/app/courses/[courseSlug]/context/`
  - `/src/app/profile/[userId]/context/`

---

**¡Disfruta aprendiendo React Context! 🚀**