# Context7 - Reglas de Consulta Obligatoria

## 🎯 Objetivo
Garantizar que siempre tengas la información más actualizada antes de instalar cualquier paquete o dependencia en el proyecto.

## 📋 Regla Principal

**ANTES de instalar cualquier paquete, SIEMPRE usar Context7 para consultar:**
- ✅ Versión más reciente disponible
- ✅ Compatibilidad con tu stack tecnológico
- ✅ Mejores prácticas de instalación
- ✅ Configuración recomendada
- ✅ Breaking changes recientes
- ✅ Alternativas si es necesario

## 🔄 Proceso Obligatorio

### 1. Consulta Context7 PRIMERO
```
use context7

Quiero instalar [nombre_del_paquete] para [propósito]. ¿Cuál es la versión más reciente, cómo se instala correctamente con pnpm, y cuáles son las mejores prácticas de configuración para Next.js 15?
```

### 2. Analiza la Respuesta
- Verifica la versión recomendada
- Lee sobre posibles breaking changes
- Entiende la configuración necesaria
- Revisa ejemplos de código actualizados

### 3. Instala con Información Actualizada
```bash
pnpm add [paquete]@[version-verificada]
```

### 4. Configura Según las Mejores Prácticas
Aplica la configuración recomendada por Context7

## 📚 Plantillas de Consulta

### Para Librerías de UI/Componentes
```
use context7

Necesito instalar [librería] para crear componentes UI en Next.js 15 con TypeScript. ¿Cuál es la versión más reciente, cómo se integra con App Router, y cuáles son los componentes más utilizados?
```

### Para Herramientas de Desarrollo
```
use context7

Quiero agregar [herramienta] para [propósito] en mi proyecto Next.js 15. ¿Cuál es la configuración más actualizada y cómo se integra con pnpm?
```

### Para Librerías de Estado/Datos
```
use context7

Necesito [librería] para manejo de estado/datos en Next.js 15 con App Router. ¿Cuáles son las mejores prácticas actuales y cómo se configura con Server Components?
```

### Para Autenticación
```
use context7

Quiero implementar autenticación con [servicio/librería] en Next.js 15. ¿Cuál es la configuración más reciente y cómo se integra con App Router y middleware?
```

### Para Styling/CSS
```
use context7

Necesito configurar [framework CSS] en Next.js 15. ¿Cuál es la instalación más actualizada y cómo se optimiza para producción?
```

## ✅ Ejemplos Específicos del Proyecto

### Clerk (Autenticación)
```
use context7

Quiero instalar @clerk/nextjs para autenticación en Next.js 15 con App Router. ¿Cuál es la versión más reciente, cómo se configura el middleware, y cuáles son las mejores prácticas para Server Components?
```

### Tailwind CSS
```
use context7

Necesito instalar tailwindcss en Next.js 15. ¿Cuál es la configuración más actualizada para App Router y cómo se optimiza el bundle?
```

### Heroicons
```
use context7

Quiero usar @heroicons/react para iconos en Next.js 15. ¿Cuál es la versión más reciente y cómo se importan correctamente para evitar problemas de bundle?
```

### Prisma (Base de Datos)
```
use context7

Necesito configurar Prisma en Next.js 15 con App Router. ¿Cuál es la configuración más actualizada y cómo se integra con Server Components?
```

## 🚫 Qué NO Hacer

❌ **NUNCA instalar directamente sin consultar Context7:**
```bash
# ❌ MAL
pnpm add some-package
```

❌ **NUNCA asumir que la documentación que conoces está actualizada**

❌ **NUNCA instalar versiones específicas sin verificar si hay actualizaciones importantes**

## 🎯 Beneficios de Seguir Esta Regla

1. **Evitar problemas de compatibilidad**
2. **Usar siempre las mejores prácticas actuales**
3. **Conocer breaking changes antes de instalar**
4. **Optimizar la configuración desde el inicio**
5. **Reducir tiempo de debugging**
6. **Mantener el proyecto actualizado y seguro**

## 📊 Checklist de Verificación

Antes de cada instalación, verifica:

- [ ] ¿Consulté Context7 sobre este paquete?
- [ ] ¿Verifiqué la versión más reciente?
- [ ] ¿Entiendo la configuración necesaria?
- [ ] ¿Revisé posibles breaking changes?
- [ ] ¿Conozco las mejores prácticas actuales?
- [ ] ¿Tengo ejemplos de código actualizados?

## 🔄 Casos Especiales

### Actualizaciones de Paquetes Existentes
```
use context7

Tengo [paquete] versión [X] instalado. ¿Cuál es la versión más reciente, qué cambios importantes hay, y cómo actualizo de forma segura?
```

### Problemas con Paquetes
```
use context7

Tengo un problema con [paquete]: [descripción del problema]. ¿Cuál es la solución más actualizada y hay versiones que resuelvan este issue?
```

### Alternativas a Paquetes
```
use context7

Estoy usando [paquete actual] pero tengo [problema/limitación]. ¿Cuáles son las mejores alternativas actuales y cómo migrar?
```

---

**Recuerda: Esta regla es OBLIGATORIA y debe aplicarse en el 100% de las instalaciones de paquetes. Context7 es tu primera línea de defensa contra información desactualizada y problemas de compatibilidad.**