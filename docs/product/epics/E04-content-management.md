# Epic E04: Gestión de Contenido (CMS)

**Propietario:** Equipo de Producto
**Estado:** Pendiente

---

## 🎯 Objetivo

Permitir a los creadores de contenido y administradores gestionar los cursos, lecciones y recursos de la plataforma de forma eficiente, sin necesidad de tocar el código.

## 👤 Historias de Usuario

| ID    | Como... (rol)              | Quiero... (acción)                                      | Para... (beneficio)                                    |
| :---- | :------------------------- | :------------------------------------------------------ | :----------------------------------------------------- |
| **US13** | un creador de contenido    | poder crear, editar y publicar un nuevo curso.          | añadir nuevo material a la plataforma.                 |
| **US14** | un creador de contenido    | poder subir videos y materiales para cada lección.      | enriquecer el contenido de los cursos.                 |
| **US15** | un administrador           | poder gestionar los roles y permisos de los usuarios.   | mantener la seguridad y la organización del sistema.  |

## ✅ Checklist de Tareas Técnicas

- [ ] **Selección de Headless CMS:** Investigar y elegir una solución de CMS (Strapi, Sanity, etc.).
- [ ] **Definición de Modelos de Contenido:** Crear los esquemas para Cursos, Lecciones, Módulos, etc.
- [ ] **Integración del CMS con el Frontend:** Conectar la aplicación Next.js con la API del CMS.
- [ ] **Panel de Administración:** Configurar el dashboard para los creadores de contenido.
- [ ] **Sistema de Subida de Archivos:** Implementar la subida de videos y otros recursos.
