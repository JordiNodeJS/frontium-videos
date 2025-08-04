"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * 🎓 TUTORIAL CONTEXT - Ejemplo Educativo
 * 
 * Este Context demuestra el patrón completo usado en Frontium Videos:
 * 1. Definición de tipos TypeScript
 * 2. Context con validación
 * 3. Provider con estado local
 * 4. Custom Hook con validación
 */

// Tipos para el tutorial
export interface TutorialStep {
  id: number;
  title: string;
  content: string;
  codeExample: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  steps: TutorialStep[];
}

// Paso 1: Definir el tipo del Context
interface TutorialContextType {
  tutorial: Tutorial;
  currentStep: number;
  currentStepData: TutorialStep;
  isFirstStep: boolean;
  isLastStep: boolean;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (stepId: number) => void;
  progress: number; // Porcentaje de progreso (0-100)
}

// Paso 2: Crear el Context con undefined para detectar uso fuera del Provider
const TutorialContext = createContext<TutorialContextType | undefined>(undefined);

// Paso 3: Props del Provider
interface TutorialProviderProps {
  tutorial: Tutorial;
  children: ReactNode;
}

/**
 * 🏭 TUTORIAL PROVIDER
 * 
 * Responsabilidades:
 * - Gestionar el estado del paso actual
 * - Proporcionar funciones de navegación
 * - Calcular datos derivados (progreso, step actual, etc.)
 * - Mantener la lógica de negocio centralizada
 */
export function TutorialProvider({ tutorial, children }: TutorialProviderProps) {
  // Estado local: paso actual del tutorial
  const [currentStep, setCurrentStep] = useState(tutorial.currentStep);

  // Funciones de navegación
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, tutorial.totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (stepId: number) => {
    if (stepId >= 1 && stepId <= tutorial.totalSteps) {
      setCurrentStep(stepId);
    }
  };

  // Datos derivados (calculados a partir del estado)
  const currentStepData = tutorial.steps.find(step => step.id === currentStep) || tutorial.steps[0];
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === tutorial.totalSteps;
  const progress = Math.round((currentStep / tutorial.totalSteps) * 100);

  // Valor que se compartirá con todos los componentes hijos
  const contextValue: TutorialContextType = {
    tutorial,
    currentStep,
    currentStepData,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
    goToStep,
    progress,
  };

  return (
    <TutorialContext.Provider value={contextValue}>
      {children}
    </TutorialContext.Provider>
  );
}

/**
 * 🎯 CUSTOM HOOK - useTutorial
 * 
 * Ventajas del hook personalizado:
 * 1. ✅ Validación automática del Provider
 * 2. ✅ TypeScript sabe que los datos nunca serán undefined
 * 3. ✅ Un solo lugar para importar
 * 4. ✅ Mejor experiencia de desarrollo (IntelliSense)
 * 
 * @returns Datos y funciones del tutorial garantizados
 * @throws Error si se usa fuera del TutorialProvider
 */
export function useTutorial(): TutorialContextType {
  const context = useContext(TutorialContext);

  // Validación: asegurar que se usa dentro del Provider
  if (context === undefined) {
    throw new Error(
      "🚨 useTutorial must be used within a TutorialProvider. " +
        "Make sure to wrap your component tree with <TutorialProvider>."
    );
  }

  return context;
}

/**
 * 📖 EJEMPLO DE USO:
 * 
 * // En el componente padre (página):
 * <TutorialProvider tutorial={tutorialData}>
 *   <TutorialHeader />
 *   <TutorialContent />
 *   <TutorialControls />
 * </TutorialProvider>
 * 
 * // En cualquier componente hijo:
 * function TutorialHeader() {
 *   const { tutorial, currentStep, progress } = useTutorial();
 *   
 *   return (
 *     <header>
 *       <h1>{tutorial.title}</h1>
 *       <div>Paso {currentStep} de {tutorial.totalSteps}</div>
 *       <div>Progreso: {progress}%</div>
 *     </header>
 *   );
 * }
 * 
 * function TutorialControls() {
 *   const { nextStep, prevStep, isFirstStep, isLastStep } = useTutorial();
 *   
 *   return (
 *     <div>
 *       <button onClick={prevStep} disabled={isFirstStep}>
 *         Anterior
 *       </button>
 *       <button onClick={nextStep} disabled={isLastStep}>
 *         Siguiente
 *       </button>
 *     </div>
 *   );
 * }
 */
