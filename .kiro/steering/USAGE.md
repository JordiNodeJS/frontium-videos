# 📋 Guía de Uso - Sistema de Steering Rules

## ¿Qué son los Steering Rules?

Los **Steering Rules** son archivos que guían automáticamente a cualquier IA trabajando en este proyecto, proporcionando contexto sobre:
- **Producto**: Qué construir y para quién
- **Tecnología**: Cómo construirlo y con qué herramientas  
- **Estructura**: Dónde ubicar archivos y cómo organizarlos

## 📁 Archivos del Sistema

```
.kiro/steering/
├── product.md          # Información del producto y negocio
├── tech.md            # Stack tecnológico y comandos
├── structure.md       # Organización del proyecto
└── USAGE.md          # Esta guía

.github/prompts/
└── kiro-agent-steering.prompt.md    # Prompt para generar/actualizar

.kiro/hooks/
└── update-steering.json             # Hook automático de Kiro

.github/scripts/
└── check-steering-updates.mjs       # Script de verificación
```

## 🚀 Comandos Principales

### Verificar Estado
```bash
# Comprobar si los steering files necesitan actualización
bun run check-steering
```

**Salidas posibles:**
- ✅ `Exit code 0`: Todo actualizado
- ⚠️ `Exit code 1`: Necesita actualización

### Actualizar Steering Files

#### En Kiro AI:
```
/kiro-agent-steering
```

#### Manualmente (si no tienes Kiro):
1. Analiza cambios en `package.json`, `README.md`, etc.
2. Actualiza los archivos correspondientes en `.kiro/steering/`
3. Añade comentario con fecha: `<!-- Actualizado: [FECHA] -->`

## 🔄 Funcionamiento Automático

### Hook de Kiro (Recomendado)
El sistema detecta automáticamente cambios en:
- `package.json` - Nuevas dependencias
- `README.md` - Nuevas características
- `tsconfig.json` - Configuración TypeScript
- `next.config.*` - Configuración Next.js
- `tailwind.config.*` - Configuración de estilos
- `eslint.config.*` - Reglas de linting
- `components.json` - Configuración shadcn/ui

**Cuando detecta cambios:**
1. 🔔 Te notifica: "¿Actualizar steering rules?"
2. ✅ Si aceptas: Ejecuta `/kiro-agent-steering`
3. 📝 Actualiza solo las secciones que cambiaron

### Limitaciones del Hook
- **Máximo**: 1 vez por día
- **Cooldown**: 2 horas entre ejecuciones
- **Aprobación**: Siempre requiere confirmación

## 📅 Cuándo Usar

### Uso Automático (Recomendado)
- ✅ **Después de instalar dependencias**: `bun add nueva-libreria`
- ✅ **Al cambiar configuración**: Modificar `next.config.ts`
- ✅ **Nuevas features**: Actualizar `README.md`
- ✅ **Reestructuración**: Cambios en `src/`

### Uso Manual
- 📅 **Revisión mensual**: Para mantener consistencia
- 👥 **Onboarding**: Antes de que nuevos devs se unan
- 🚀 **Pre-deployment**: Asegurar documentación actualizada
- 🔍 **Auditoría**: Verificar que todo esté sincronizado

## 🛡️ Características Avanzadas

### Preservación de Contenido Manual
```markdown
<!-- MANUAL: No actualizar automáticamente -->
Esta sección fue escrita manualmente y no se sobrescribirá.
<!-- /MANUAL -->
```

### Versionado Automático
Cada actualización añade:
```markdown
<!-- Última actualización: 15/7/2025 - Nuevas dependencias Redux -->
```

### Detección Inteligente
- ✅ **Solo actualiza** lo que realmente cambió
- ✅ **Preserva** secciones manuales
- ✅ **Mantiene** historial de cambios
- ✅ **Evita** actualizaciones innecesarias

## 🎯 Mejores Prácticas

### Para Desarrolladores
1. **Ejecuta `bun run check-steering`** después de cambios importantes
2. **Revisa las actualizaciones** antes de aprobarlas
3. **Marca secciones manuales** con comentarios `<!-- MANUAL -->`
4. **Mantén el README actualizado** para reflejar nuevas features

### Para Equipos
1. **Incluye en el workflow** de PR reviews
2. **Ejecuta antes de releases** para documentación actualizada
3. **Forma a nuevos miembros** sobre el sistema
4. **Revisa mensualmente** la consistencia

## 🔧 Troubleshooting

### El script no funciona
```bash
# Verificar que el archivo existe
ls -la .github/scripts/check-steering-updates.mjs

# Ejecutar directamente
node .github/scripts/check-steering-updates.mjs
```

### Hook de Kiro no se activa
1. Verifica que el archivo `.kiro/hooks/update-steering.json` existe
2. Reinicia Kiro si es necesario
3. Comprueba que los patrones de archivos coinciden

### Steering files desactualizados
```bash
# Forzar verificación
bun run check-steering

# Si sale código 1, ejecutar en Kiro:
/kiro-agent-steering
```

## 📞 Soporte

Si tienes problemas:
1. 🔍 Ejecuta `bun run check-steering` para diagnóstico
2. 📖 Revisa esta guía
3. 🔄 Reinicia Kiro IDE si es necesario
4. 💬 Consulta con el equipo de desarrollo

---

**💡 Tip**: Este sistema te ahorra tiempo manteniendo la documentación siempre actualizada automáticamente.