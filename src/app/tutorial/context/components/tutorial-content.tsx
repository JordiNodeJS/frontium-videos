"use client";

import { useTutorial } from "../context/tutorial-context";

/**
 * 🎯 TUTORIAL CONTENT COMPONENT
 * 
 * Demuestra cómo un componente puede acceder a datos derivados
 * (calculados) del Context, como currentStepData.
 * 
 * Este componente muestra el contenido del paso actual,
 * incluyendo texto explicativo y ejemplos de código.
 */
export function TutorialContent() {
  // 🎯 PUNTO CLAVE: Acceso a datos derivados del Context
  const { currentStepData, currentStep, tutorial } = useTutorial();

  return (
    <main className="bg-white rounded-lg shadow-lg p-8 mb-8">
      {/* Header del paso actual */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            {currentStep}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {currentStepData.title}
          </h2>
        </div>
      </div>
      
      {/* Contenido del paso */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Explicación textual */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              📖 Explicación
            </h3>
            <div className="prose prose-lg text-gray-700">
              <p>{currentStepData.content}</p>
            </div>
          </div>
          
          {/* Información contextual */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              💡 ¿Por qué es importante?
            </h4>
            <p className="text-blue-700 text-sm">
              {getStepInsight(currentStep)}
            </p>
          </div>
          
          {/* Progreso visual */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3">
              🎯 Tu progreso en este tutorial
            </h4>
            <div className="flex items-center space-x-2">
              {Array.from({ length: tutorial.totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isCurrent = stepNumber === currentStep;
                
                return (
                  <div
                    key={stepNumber}
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                      ${isCurrent 
                        ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                        : isCompleted 
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }
                    `}
                  >
                    {isCompleted ? '✓' : stepNumber}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Ejemplo de código */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            💻 Ejemplo de Código
          </h3>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
              {currentStepData.codeExample}
            </pre>
          </div>
          
          {/* Botón para copiar código */}
          <button
            onClick={() => navigator.clipboard.writeText(currentStepData.codeExample)}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
          >
            📋 Copiar código
          </button>
        </div>
      </div>
      
      {/* 
        💡 NOTA EDUCATIVA:
        Este componente demuestra varios conceptos importantes:
        
        1. DATOS DERIVADOS: currentStepData es calculado en el Context
           basado en currentStep y tutorial.steps
        
        2. REACTIVIDAD: Cuando currentStep cambia (desde otro componente),
           este componente se re-renderiza automáticamente con el nuevo contenido
        
        3. SEPARACIÓN DE RESPONSABILIDADES: Este componente solo se encarga
           de mostrar contenido, no de gestionar el estado
        
        4. ACCESO DIRECTO: No necesita props para acceder a los datos
           del tutorial, todo viene del Context
      */}
    </main>
  );
}

/**
 * Función auxiliar que proporciona insights específicos para cada paso
 */
function getStepInsight(step: number): string {
  const insights = {
    1: "Entender el problema del prop drilling es fundamental para apreciar las ventajas de Context.",
    2: "El Context es el 'contenedor' que transporta los datos. Definir tipos claros previene errores.",
    3: "El Provider es donde vive el estado. Es el 'cerebro' que gestiona los datos y la lógica.",
    4: "Los custom hooks son una best practice que mejora la experiencia de desarrollo y previene errores.",
    5: "Una vez configurado, usar Context es tan simple como llamar a un hook. ¡Magia! ✨"
  };
  
  return insights[step as keyof typeof insights] || "Cada paso te acerca más a dominar React Context.";
}
