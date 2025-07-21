import SlideViewer from './components/SlideViewer';
import Slide1 from './components/slides/Slide1';
import Slide2 from './components/slides/Slide2';
import Slide3 from './components/slides/Slide3';
import Slide4 from './components/slides/Slide4';
import Slide5 from './components/slides/Slide5';
import Slide6 from './components/slides/Slide6';
import Slide7 from './components/slides/Slide7';
import Slide8 from './components/slides/Slide8';

export default function ReduxIslandsSliceDocumentation() {
  const slides = [
    {
      id: 1,
      title: "¿Qué son las Redux Islands?",
      icon: "🏝️",
      color: "blue",
      content: <Slide1 />
    },
    {
      id: 2,
      title: "Arquitectura del Sistema",
      icon: "🏗️",
      color: "purple",
      content: <Slide2 />
    },
    {
      id: 3,
      title: "Implementación SSR",
      icon: "⚙️",
      color: "green",
      content: <Slide3 />
    },
    {
      id: 4,
      title: "Gestión de Estado",
      icon: "📊",
      color: "yellow",
      content: <Slide4 />
    },
    {
      id: 5,
      title: "Hidratación Granular",
      icon: "💧",
      color: "red",
      content: <Slide5 />
    },
    {
      id: 6,
      title: "Casos de Uso Ideales",
      icon: "🎯",
      color: "indigo",
      content: <Slide6 />
    },
    {
      id: 7,
      title: "Mejores Prácticas",
      icon: "💡",
      color: "emerald",
      content: <Slide7 />
    },
    {
      id: 8,
      title: "¡Domina Redux Islands!",
      icon: "🎉",
      color: "gradient",
      content: <Slide8 />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                📊 Redux Islands - Documentación Técnica
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Análisis profundo de la arquitectura e implementación
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <SlideViewer slides={slides} />
      </div>
    </div>
  );
} 