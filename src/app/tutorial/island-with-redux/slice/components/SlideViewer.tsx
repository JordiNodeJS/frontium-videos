'use client'

import { useState } from 'react';
import Link from 'next/link';

interface Slide {
  id: number;
  title: string;
  icon: string;
  color: string;
  content: React.ReactNode;
}

interface SlideViewerProps {
  slides: Slide[];
}

export default function SlideViewer({ slides }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Manejar teclas de navegación
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape') {
      setIsFullscreen(false);
    }
  };

  if (isFullscreen) {
    return (
      <div 
        className="fixed inset-0 bg-gray-900 z-50 flex flex-col"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Header de navegación en pantalla completa */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleFullscreen}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
            >
              ← Salir
            </button>
            <span className="text-sm text-gray-300">
              Diapositiva {currentSlide + 1} de {slides.length}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </div>

        {/* Contenido de la diapositiva */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <div className="max-w-6xl w-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Indicadores de progreso */}
        <div className="bg-gray-800 px-6 py-3">
          <div className="flex items-center justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-blue-500' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Controles de vista */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 Presentación Interactiva
          </h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <span>🖥️</span>
              <span>Modo Presentación</span>
            </button>
            <Link 
              href="/tutorial/island-with-redux"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              ← Volver al Tutorial
            </Link>
          </div>
        </div>

        {/* Vista general de diapositivas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:shadow-md ${
                index === currentSlide
                  ? `border-${slide.color}-500 bg-${slide.color}-50 dark:bg-${slide.color}-900/20`
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{slide.icon}</span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Diapositiva {index + 1}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {slide.title}
              </h3>
            </button>
          ))}
        </div>

        {/* Navegación */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              Siguiente →
            </button>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentSlide + 1} de {slides.length} diapositivas
          </div>
        </div>
      </div>

      {/* Diapositiva actual */}
      <div className="transition-all duration-300">
        {slides[currentSlide].content}
      </div>
    </div>
  );
} 