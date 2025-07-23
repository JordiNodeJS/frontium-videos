import Link from 'next/link';

export default function DeploymentDocumentationPage() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Guía de Deployment
        </h1>
        <p className="text-xl text-gray-600">
          Cómo desplegar Frontium Videos en producción
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <h2>🚀 Opciones de Deployment</h2>
        
        <h3>Vercel (Recomendado)</h3>
        <p>Vercel es la plataforma oficial recomendada para aplicaciones Next.js.</p>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-3">✅ Ventajas</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• Integración nativa con Next.js</li>
            <li>• Deploy automático desde Git</li>
            <li>• Edge Functions y ISR incluidos</li>
            <li>• CDN global automático</li>
            <li>• SSL gratuito</li>
            <li>• Preview deployments para PRs</li>
          </ul>
        </div>

        <h4>Pasos para Deploy en Vercel</h4>
        <ol>
          <li>Conecta tu repositorio de GitHub a Vercel</li>
          <li>Configura las variables de entorno</li>
          <li>Deploy automático en cada push</li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# Variables de entorno requeridas en Vercel
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard`}
          </pre>
        </div>

        <h3>Netlify</h3>
        <p>Alternativa popular con características similares.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"`}
          </pre>
        </div>

        <h3>Railway</h3>
        <p>Plataforma moderna con soporte para bases de datos.</p>

        <h3>DigitalOcean App Platform</h3>
        <p>Opción con mayor control y precios competitivos.</p>

        <h2>⚙️ Configuración Pre-Deploy</h2>
        
        <h3>Variables de Entorno</h3>
        <p>Asegúrate de configurar todas las variables necesarias:</p>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">🔐 Clerk Authentication</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code></li>
            <li>• <code>CLERK_SECRET_KEY</code></li>
            <li>• <code>NEXT_PUBLIC_CLERK_SIGN_IN_URL</code></li>
            <li>• <code>NEXT_PUBLIC_CLERK_SIGN_UP_URL</code></li>
            <li>• <code>NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL</code></li>
            <li>• <code>NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL</code></li>
          </ul>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg mt-4">
          <h4 className="font-semibold text-purple-900 mb-2">🗄️ Base de Datos (si aplica)</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• <code>DATABASE_URL</code></li>
            <li>• <code>DIRECT_URL</code> (para Prisma con connection pooling)</li>
          </ul>
        </div>

        <h3>Build Optimization</h3>
        <p>Optimizaciones recomendadas para producción:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de imagen
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compresión
  compress: true,
  
  // Análisis de bundle
  experimental: {
    bundlePagesExternals: true,
  },
  
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;`}
          </pre>
        </div>

        <h2>🔍 Monitoreo y Analytics</h2>
        
        <h3>Vercel Analytics</h3>
        <p>Para aplicaciones en Vercel, habilita Analytics para métricas de rendimiento.</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// Instalar Vercel Analytics
pnpm add @vercel/analytics

// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}`}
          </pre>
        </div>

        <h3>Error Monitoring</h3>
        <p>Considera integrar servicios como:</p>
        <ul>
          <li><strong>Sentry</strong> - Error tracking y performance monitoring</li>
          <li><strong>LogRocket</strong> - Session replay y debugging</li>
          <li><strong>Datadog</strong> - APM y logs</li>
        </ul>

        <h2>🛡️ Seguridad en Producción</h2>
        
        <h3>Headers de Seguridad</h3>
        <div className="bg-red-50 p-4 rounded-lg">
          <h4 className="font-semibold text-red-900 mb-2">🔒 Headers Recomendados</h4>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• <code>X-Frame-Options: DENY</code></li>
            <li>• <code>X-Content-Type-Options: nosniff</code></li>
            <li>• <code>Referrer-Policy: strict-origin-when-cross-origin</code></li>
            <li>• <code>Content-Security-Policy</code></li>
          </ul>
        </div>

        <h3>Validación de Variables de Entorno</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  CLERK_SECRET_KEY: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  DATABASE_URL: z.string().url().optional(),
});

export const env = envSchema.parse(process.env);`}
          </pre>
        </div>

        <h2>📊 Performance</h2>
        
        <h3>Core Web Vitals</h3>
        <p>Optimiza para las métricas clave:</p>
        <ul>
          <li><strong>LCP (Largest Contentful Paint):</strong> &lt; 2.5s</li>
          <li><strong>FID (First Input Delay):</strong> &lt; 100ms</li>
          <li><strong>CLS (Cumulative Layout Shift):</strong> &lt; 0.1</li>
        </ul>

        <h3>Optimizaciones</h3>
        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-3">⚡ Técnicas de Optimización</h4>
          <ul className="space-y-2 text-green-800">
            <li>• Lazy loading de componentes con <code>dynamic()</code></li>
            <li>• Optimización de imágenes con <code>next/image</code></li>
            <li>• Code splitting automático</li>
            <li>• Preloading de rutas críticas</li>
            <li>• Compresión de assets</li>
            <li>• CDN para assets estáticos</li>
          </ul>
        </div>

        <h2>🔄 CI/CD Pipeline</h2>
        
        <h3>GitHub Actions</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Build application
        run: pnpm build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.ORG_ID }}
          vercel-project-id: \${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'`}
          </pre>
        </div>

        <h2>🧪 Testing en Producción</h2>
        
        <h3>Smoke Tests</h3>
        <p>Tests básicos para verificar que la aplicación funciona después del deploy:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// tests/smoke.test.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Frontium Videos');
});

test('authentication flow works', async ({ page }) => {
  await page.goto('/sign-in');
  await expect(page.locator('[data-testid="sign-in-form"]')).toBeVisible();
});`}
          </pre>
        </div>

        <h3>Health Checks</h3>
        <p>Endpoint para verificar el estado de la aplicación:</p>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-sm">
{`// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
  });
}`}
          </pre>
        </div>

        <h2>📋 Checklist de Deploy</h2>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-3">✅ Antes del Deploy</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Variables de entorno configuradas</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Tests pasando</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Build exitoso localmente</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Dependencias actualizadas</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Configuración de Clerk en producción</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Headers de seguridad configurados</span>
            </li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-4">
          <h4 className="font-semibold mb-3">🔍 Después del Deploy</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Smoke tests ejecutados</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Autenticación funcionando</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Performance verificada</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>Monitoreo configurado</span>
            </li>
            <li className="flex items-center">
              <input type="checkbox" className="mr-2" disabled />
              <span>DNS y dominios configurados</span>
            </li>
          </ul>
        </div>

        <h2>🔗 Enlaces Útiles</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <ul className="space-y-2 text-blue-600">
            <li><a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Documentación de Vercel ↗</a></li>
            <li><a href="https://nextjs.org/docs/deployment" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Next.js Deployment Guide ↗</a></li>
            <li><a href="https://clerk.com/docs/deployments/overview" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">Clerk Deployment Guide ↗</a></li>
            <li><Link href="/docs/auth" className="hover:text-blue-700">Documentación de Autenticación</Link></li>
            <li><Link href="/docs/context7" className="hover:text-blue-700">Context7 Usage Guide</Link></li>
          </ul>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>💡 Tip:</strong> Siempre prueba tu aplicación en un entorno de staging antes de 
                hacer deploy a producción. Vercel ofrece preview deployments automáticos para cada PR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
