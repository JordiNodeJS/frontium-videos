import type { Metadata } from 'next'
import './animations.css'

export const metadata: Metadata = {
  title: 'Autenticación - Frontium Videos',
  description: 'Inicia sesión o regístrate en Frontium Videos',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 relative overflow-hidden">
      {/* Animated gradient background with particles */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        
        {/* Particle system */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`,
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
          
          {/* Larger particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`large-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full animate-float-reverse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${20 + Math.random() * 15}s`,
              }}
            />
          ))}
          
          {/* Orbiting particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-orbit"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateX(${100 + i * 50}px) rotate(-1turn)`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${20 + i * 2}s`,
              }}
            />
          ))}
        </div>
        
        {/* Animated floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow animation-delay-4000"></div>
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid-slate-700/20 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
      </div>

        {/* Content container - centrado perfecto */}
        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Frontium Videos
          </h1>
          <p className="mt-3 text-base text-gray-400">
            Tu plataforma de aprendizaje en línea
          </p>
        </div>

        {/* Glass morphism card - perfectamente centrada */}
        <div className="relative w-full max-w-lg mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            <div className="relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
