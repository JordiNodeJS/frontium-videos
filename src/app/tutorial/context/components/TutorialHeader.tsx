"use client";

import { useTutorial } from "../context/TutorialContext";

/**
 * 🎯 TUTORIAL HEADER COMPONENT
 * 
 * Demuestra cómo un componente accede a los datos del Context
 * sin necesidad de recibir props del componente padre.
 * 
 * ANTES (con props):
 * function TutorialHeader({ tutorial, currentStep, progress }) { ... }
 * 
 * DESPUÉS (con Context):
 * function TutorialHeader() {
 *   const { tutorial, currentStep, progress } = useTutorial();
 *   ...
 * }
 */
export function TutorialHeader() {
  // 🎯 PUNTO CLAVE: Acceso directo a los datos sin props
  const { tutorial, currentStep, progress } = useTutorial();

  return (
    <header className="bg-white rounded-lg shadow-lg p-8 mb-8">
      <div className="text-center">
        {/* Título del tutorial */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {tutorial.title}
        </h1>
        
        {/* Descripción */}
        <p className="text-xl text-gray-600 mb-6">
          {tutorial.description}
        </p>
        
        {/* Información del paso actual */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {currentStep}
            </div>
            <div className="text-sm text-gray-500">
              Paso Actual
            </div>
          </div>
          
          <div className="text-gray-400">
            /
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-400">
              {tutorial.totalSteps}
            </div>
            <div className="text-sm text-gray-500">
              Total de Pasos
            </div>
          </div>
        </div>
        
        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Porcentaje de progreso */}
        <div className="text-sm text-gray-600">
          Progreso: <span className="font-semibold text-blue-600">{progress}%</span>
        </div>
      </div>
      
      {/* 
        💡 NOTA EDUCATIVA: 
        Este componente NO recibe ninguna prop relacionada con el tutorial.
        Todos los datos (tutorial, currentStep, progress) vienen del Context
        a través del hook useTutorial().
        
        Esto significa que:
        1. El componente padre no necesita pasar props
        2. Si agregamos nuevos datos al Context, este componente puede usarlos inmediatamente
        3. El componente es más independiente y reutilizable
      */}
    </header>
  );
}