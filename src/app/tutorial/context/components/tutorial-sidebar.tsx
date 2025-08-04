"use client";

import { useTutorial } from "../context/tutorial-context";

/**
 * 🎯 TUTORIAL SIDEBAR COMPONENT
 * 
 * Demuestra cómo múltiples componentes pueden acceder al mismo Context
 * y usar diferentes partes de los datos según sus necesidades.
 * 
 * Este componente usa:
 * - tutorial.steps (para mostrar la lista)
 * - currentStep (para resaltar el paso actual)
 * - goToStep (para navegación directa)
 */
export function TutorialSidebar() {
  // 🎯 PUNTO CLAVE: Mismo Context, diferentes datos utilizados
  const { tutorial, currentStep, goToStep } = useTutorial();

  return (
    <aside className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        📚 Contenido del Tutorial
      </h2>
      
      <nav>
        <ul className="space-y-2">
          {tutorial.steps.map((step) => {
            const isCurrentStep = step.id === currentStep;
            const isCompletedStep = step.id < currentStep;
            
            return (
              <li key={step.id}>
                <button
                  onClick={() => goToStep(step.id)}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-200
                    ${isCurrentStep 
                      ? 'bg-blue-100 border-2 border-blue-500 text-blue-900' 
                      : isCompletedStep
                        ? 'bg-green-50 border border-green-200 text-green-800 hover:bg-green-100'
                        : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    {/* Indicador visual del estado */}
                    <div className={`
                      w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                      ${isCurrentStep 
                        ? 'bg-blue-500 text-white' 
                        : isCompletedStep
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }
                    `}>
                      {isCompletedStep ? '✓' : step.id}
                    </div>
                    
                    {/* Título del paso */}
                    <div className="flex-1">
                      <div className={`
                        font-medium
                        ${isCurrentStep ? 'text-blue-900' : isCompletedStep ? 'text-green-800' : 'text-gray-700'}
                      `}>
                        {step.title}
                      </div>
                      
                      {/* Indicador de paso actual */}
                      {isCurrentStep && (
                        <div className="text-xs text-blue-600 mt-1">
                          👈 Estás aquí
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      
      {/* Información adicional */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          💡 ¿Qué está pasando aquí?
        </h3>
        <div className="text-xs text-gray-600 space-y-1">
          <p>• Este componente accede al Context usando <code className="bg-gray-200 px-1 rounded">useTutorial()</code></p>
          <p>• No recibe props del componente padre</p>
          <p>• Puede navegar directamente usando <code className="bg-gray-200 px-1 rounded">goToStep()</code></p>
          <p>• Se actualiza automáticamente cuando cambia el paso</p>
        </div>
      </div>
      
      {/* 
        💡 NOTA EDUCATIVA:
        Observa cómo este componente:
        
        1. NO recibe props relacionadas con los pasos del tutorial
        2. Accede directamente a tutorial.steps desde el Context
        3. Usa goToStep() para cambiar el estado global
        4. Se re-renderiza automáticamente cuando currentStep cambia
        
        Sin Context, el componente padre tendría que:
        - Pasar tutorial.steps como prop
        - Pasar currentStep como prop  
        - Pasar una función onStepChange como prop
        - Gestionar el estado en el nivel superior
        
        Con Context, todo esto se maneja automáticamente.
      */}
    </aside>
  );
}
