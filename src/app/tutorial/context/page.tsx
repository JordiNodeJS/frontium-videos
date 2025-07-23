import { Metadata } from "next";
import { TutorialProvider } from "./context/TutorialContext";
import { TutorialHeader } from "./components/TutorialHeader";
import { TutorialContent } from "./components/TutorialContent";
import { TutorialSidebar } from "./components/TutorialSidebar";
import { TutorialControls } from "./components/TutorialControls";

export const metadata: Metadata = {
  title: "Tutorial: React Context | Frontium Videos",
  description: "Aprende cómo usar React Context con un ejemplo práctico paso a paso",
};

/**
 * 🎓 PÁGINA DE TUTORIAL: React Context
 * 
 * Esta página demuestra cómo usar React Context en Frontium Videos
 * con un ejemplo práctico que simula un tutorial interactivo.
 * 
 * ARQUITECTURA:
 * - TutorialProvider: Provee el estado del tutorial a todos los componentes
 * - Múltiples componentes consumen el contexto usando useTutorial()
 * - Demuestra prop drilling vs Context en acción
 */
export default function TutorialContextPage() {
  // Datos del tutorial (normalmente vendrían de una API)
  const tutorialData = {
    id: "react-context-tutorial",
    title: "Dominando React Context",
    description: "Aprende a usar React Context como un profesional",
    currentStep: 1,
    totalSteps: 5,
    steps: [
      {
        id: 1,
        title: "¿Qué es React Context?",
        content: "React Context es una herramienta que permite compartir datos entre componentes sin prop drilling.",
        codeExample: `// Sin Context (Prop Drilling)
Page → Component1 → Component2 → Component3
  ↓        ↓          ↓          ↓
data    data       data       data

// Con Context
Page (Provider) → Component1 → Component2 → Component3
  ↓                                          ↑
data ----------------------------------------→ useContext()`,
      },
      {
        id: 2,
        title: "Creando el Context",
        content: "Primero creamos el Context y definimos su tipo con TypeScript.",
        codeExample: `const TutorialContext = createContext<TutorialContextType | undefined>(undefined);`,
      },
      {
        id: 3,
        title: "El Provider Component",
        content: "El Provider envuelve los componentes que necesitan acceso a los datos.",
        codeExample: `export function TutorialProvider({ children, tutorial }: TutorialProviderProps) {
  const [currentStep, setCurrentStep] = useState(tutorial.currentStep);
  
  const value = {
    tutorial,
    currentStep,
    nextStep: () => setCurrentStep(prev => Math.min(prev + 1, tutorial.totalSteps)),
    prevStep: () => setCurrentStep(prev => Math.max(prev - 1, 1)),
  };
  
  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}`,
      },
      {
        id: 4,
        title: "Custom Hook",
        content: "Creamos un hook personalizado para acceder al contexto de forma segura.",
        codeExample: `export function useTutorial(): TutorialContextType {
  const context = useContext(TutorialContext);
  
  if (context === undefined) {
    throw new Error("useTutorial must be used within TutorialProvider");
  }
  
  return context;
}`,
      },
      {
        id: 5,
        title: "Usando el Context",
        content: "Cualquier componente hijo puede acceder a los datos usando nuestro hook.",
        codeExample: `function TutorialHeader() {
  const { tutorial, currentStep } = useTutorial();
  
  return (
    <header>
      <h1>{tutorial.title}</h1>
      <p>Paso {currentStep} de {tutorial.totalSteps}</p>
    </header>
  );
}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* 
          🎯 PUNTO CLAVE: El TutorialProvider envuelve solo los componentes
          que necesitan acceso a los datos del tutorial.
          
          Sin Context, tendríamos que pasar tutorialData como prop
          a cada uno de estos componentes, y ellos a su vez tendrían
          que pasarlo a sus hijos. ¡Eso es prop drilling!
        */}
        <TutorialProvider tutorial={tutorialData}>
          <div className="max-w-7xl mx-auto">
            {/* Header del tutorial */}
            <TutorialHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              {/* Sidebar con navegación */}
              <div className="lg:col-span-1">
                <TutorialSidebar />
              </div>
              
              {/* Contenido principal */}
              <div className="lg:col-span-3">
                <TutorialContent />
                
                {/* Controles de navegación */}
                <TutorialControls />
              </div>
            </div>
          </div>
        </TutorialProvider>
        
        {/* 
          🔍 OBSERVA: Estos componentes están FUERA del TutorialProvider,
          por lo que NO tienen acceso a los datos del tutorial.
          Esto demuestra el alcance (scope) del Context.
        */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              💡 ¿Qué acabas de ver?
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p>
                En esta página, <strong>4 componentes diferentes</strong> acceden a los mismos datos del tutorial:
              </p>
              <ul>
                <li><code>TutorialHeader</code> - Muestra el título y progreso</li>
                <li><code>TutorialSidebar</code> - Lista todos los pasos</li>
                <li><code>TutorialContent</code> - Muestra el contenido del paso actual</li>
                <li><code>TutorialControls</code> - Botones de navegación</li>
              </ul>
              <p>
                <strong>Sin Context</strong>, habríamos tenido que pasar los datos como props a través de múltiples niveles.
                <strong>Con Context</strong>, cada componente accede directamente a lo que necesita usando <code>useTutorial()</code>.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <p className="text-blue-800">
                  <strong>🎯 Resultado:</strong> Código más limpio, menos prop drilling, y componentes más independientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}