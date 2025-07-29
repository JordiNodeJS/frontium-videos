"use client";

import { useTutorial } from "../context/TutorialContext";

/**
 * 🎯 TUTORIAL CONTROLS COMPONENT
 * 
 * Demuestra cómo un componente puede modificar el estado del Context
 * usando las funciones proporcionadas por el Provider.
 * 
 * Este componente usa:
 * - nextStep, prevStep (para navegación)
 * - isFirstStep, isLastStep (para deshabilitar botones)
 * - currentStep, tutorial.totalSteps (para mostrar información)
 */
export function TutorialControls() {
  // 🎯 PUNTO CLAVE: Acceso a funciones que modifican el estado
  const { 
    nextStep, 
    prevStep, 
    isFirstStep, 
    isLastStep, 
    currentStep, 
    tutorial 
  } = useTutorial();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between">
        {/* Botón Anterior */}
        <button
          onClick={prevStep}
          disabled={isFirstStep}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${isFirstStep 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          <span>←</span>
          <span>Anterior</span>
        </button>
        
        {/* Información central */}
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">
            Navegación del Tutorial
          </div>
          <div className="text-lg font-semibold text-gray-700">
            {currentStep} de {tutorial.totalSteps}
          </div>
          
          {/* Indicadores de puntos */}
          <div className="flex items-center justify-center space-x-1 mt-2">
            {Array.from({ length: tutorial.totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              
              return (
                <div
                  key={stepNumber}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-200
                    ${isActive ? 'bg-blue-500 w-8' : 'bg-gray-300'}
                  `}
                />
              );
            })}
          </div>
        </div>
        
        {/* Botón Siguiente */}
        <button
          onClick={nextStep}
          disabled={isLastStep}
          className={`
            flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${isLastStep 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }
          `}
        >
          <span>Siguiente</span>
          <span>→</span>
        </button>
      </div>
      
      {/* Mensajes contextuales */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        {isFirstStep && (
          <div className="text-center text-gray-600">
            <span className="text-2xl">🚀</span>
            <p className="mt-2 text-sm">
              ¡Bienvenido al tutorial! Usa el botón <strong>&quot;Siguiente&quot;</strong> para comenzar tu viaje con React Context.
            </p>
          </div>
        )}
        
        {isLastStep && (
          <div className="text-center text-gray-600">
            <span className="text-2xl">🎉</span>
            <p className="mt-2 text-sm">
              ¡Felicitaciones! Has completado el tutorial de React Context. 
              Ahora tienes las herramientas para usar Context como un profesional.
            </p>
          </div>
        )}
        
        {!isFirstStep && !isLastStep && (
          <div className="text-center text-gray-600">
            <span className="text-2xl">📚</span>
            <p className="mt-2 text-sm">
              Estás progresando bien. Usa los botones de navegación o el menú lateral 
              para moverte entre los pasos del tutorial.
            </p>
          </div>
        )}
      </div>
      
      {/* Información técnica sobre el componente */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          🔧 ¿Cómo funciona este componente?
        </h4>
        <div className="text-xs text-blue-700 space-y-1">
          <p>• Usa <code className="bg-blue-100 px-1 rounded">useTutorial()</code> para acceder al Context</p>
          <p>• Las funciones <code className="bg-blue-100 px-1 rounded">nextStep()</code> y <code className="bg-blue-100 px-1 rounded">prevStep()</code> modifican el estado global</p>
          <p>• Los valores <code className="bg-blue-100 px-1 rounded">isFirstStep</code> e <code className="bg-blue-100 px-1 rounded">isLastStep</code> son calculados automáticamente</p>
          <p>• Cuando el estado cambia, TODOS los componentes que usan el Context se actualizan</p>
        </div>
      </div>
      
      {/* 
        💡 NOTA EDUCATIVA:
        Este componente es un excelente ejemplo de cómo Context
        facilita la comunicación entre componentes:
        
        1. MODIFICACIÓN DE ESTADO: nextStep() y prevStep() cambian
           el estado en el Provider, no en este componente
        
        2. REACTIVIDAD AUTOMÁTICA: Cuando el estado cambia aquí,
           TutorialHeader, TutorialSidebar y TutorialContent
           se actualizan automáticamente
        
        3. DATOS DERIVADOS: isFirstStep e isLastStep son calculados
           en el Provider basándose en el estado actual
        
        4. SEPARACIÓN DE RESPONSABILIDADES: Este componente solo
           se encarga de la navegación, no de gestionar los datos
        
        Sin Context, necesitaríamos:
        - Props para las funciones de navegación
        - Props para el estado actual
        - Callback functions para comunicar cambios al padre
        - Gestión manual del estado en múltiples lugares
        
        Con Context, todo esto se maneja automáticamente. ¡Magia! ✨
      */}
    </div>
  );
}