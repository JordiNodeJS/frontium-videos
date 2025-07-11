---
description: "Reglas para crear rules y prompts de Copilot en VS Code"
mode: agent
---

# Reglas para crear "rules" y prompts para Copilot en VS Code

1. **Ubicación de los archivos de reglas y prompts**
   - Los archivos de instrucciones deben estar en `.github/instructions` (por defecto).
   - Los archivos de prompts deben estar en `.github/prompts` (por defecto).
   - Puedes personalizar la ubicación usando la configuración `chat.promptFilesLocations` o `chat.instructionsFilesLocations` en tu workspace.

2. **Formato de los archivos**
   - Usa archivos Markdown con extensión `.prompt.md` para prompts y `.md` para instrucciones.
   - Los prompts pueden tener un encabezado opcional (Front Matter) con:
     - `mode`: Modo de chat (`ask`, `edit`, `agent`).
     - `model`: Modelo de IA a usar.
     - `tools`: Herramientas permitidas.
     - `description`: Descripción corta del prompt.
   - El cuerpo del archivo debe estar en Markdown, permitiendo instrucciones, contexto y enlaces a otros archivos del workspace.

3. **Buenas prácticas de contenido**
   - Escribe instrucciones claras, concisas y orientadas a tareas.
   - Usa listas, secciones y ejemplos en Markdown para estructurar el contenido.
   - Puedes referenciar otros archivos del workspace usando enlaces relativos.
   - Usa variables como `${workspaceFolder}`, `${file}`, `${input:variableName}` para personalizar el comportamiento del prompt.

4. **Integración y uso**
   - Los prompts e instrucciones pueden ser ejecutados desde el chat de VS Code usando `/nombre-del-prompt` o desde el Command Palette.
   - Puedes sincronizar estos archivos entre dispositivos usando Settings Sync.
   - Se pueden habilitar o deshabilitar centralmente para toda la organización.

5. **Configuración avanzada**
   - Personaliza el comportamiento de Copilot Chat con settings experimentales como:
     - `github.copilot.chat.codeGeneration.useInstructionFiles`
     - `github.copilot.chat.codeGeneration.instructions`
     - `github.copilot.chat.testGeneration.instructions`
     - `github.copilot.chat.commitMessageGeneration.instructions`
     - `github.copilot.chat.pullRequestDescriptionGeneration.instructions`
   - Puedes agrupar instrucciones y prompts por contexto (frontend, backend, etc.) usando carpetas y settings.

---

Fuente: [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization) 