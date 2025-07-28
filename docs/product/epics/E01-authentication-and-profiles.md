# Epic E01: Sistema de Autenticación y Perfiles de Usuario

**Propietario:** Equipo de Desarrollo
**Estado:** En Progreso

---

## 🎯 Objetivo

Permitir que los usuarios se registren, inicien sesión y gestionen su perfil de forma segura y sencilla, para que puedan acceder al contenido exclusivo y personalizar su experiencia en la plataforma.

## 👤 Historias de Usuario

| ID       | Como... (rol)          | Quiero... (acción)                                                                     | Para... (beneficio)                                       |
| :------- | :--------------------- | :------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| **US01** | un nuevo visitante     | poder registrarme en la plataforma usando mi email o una cuenta social (Google/GitHub) | crear una cuenta rápidamente y acceder a los cursos.      |
| **US02** | un usuario registrado  | poder iniciar sesión con mis credenciales                                              | acceder a mi panel de control y continuar mi aprendizaje. |
| **US03** | un usuario autenticado | poder cerrar mi sesión de forma segura                                                 | proteger mi cuenta en dispositivos compartidos.           |
| **US04** | un usuario autenticado | tener un perfil donde pueda ver mi progreso y cursos                                   | llevar un seguimiento de mi aprendizaje.                  |
| **US05** | un usuario autenticado | poder ver un avatar y mi nombre en la interfaz                                         | sentir que la experiencia es personalizada.               |

## ✅ Checklist de Tareas Técnicas

- [x] **Configuración de Clerk:** Integrar el SDK de Clerk para Next.js.
- [x] **Crear Páginas de Autenticación:** Implementar las rutas `sign-in` y `sign-up`.
- [x] **Layout de Autenticación:** Diseñar un layout específico para las páginas de autenticación.
- [x] **Middleware de Protección:** Configurar `middleware.ts` para proteger rutas.
- [x] **Componente `UserButton`:** Crear un componente para mostrar el estado del usuario y permitir el logout.
- [x] **Componente `AuthGuard`:** Implementar un HOC para proteger páginas específicas.
- [x] **Botón de Logout Personalizado:** Añadir un botón de logout explícito con redirección.
- [x] **Demo Interactivo:** Construir una página `/demo/auth` para mostrar las funcionalidades.
- [ ] **Página de Perfil de Usuario:** Desarrollar la interfaz para que el usuario gestione su perfil.
- [ ] **Integración con Base de Datos:** Sincronizar los perfiles de Clerk con una base de datos local si es necesario.
