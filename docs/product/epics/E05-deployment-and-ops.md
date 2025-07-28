# Epic E05: Despliegue y Operaciones (DevOps)

**Propietario:** Equipo de Desarrollo
**Estado:** En Progreso

---

## 🎯 Objetivo

Asegurar que la plataforma se pueda desplegar, monitorizar y escalar de manera fiable y automatizada, para garantizar una alta disponibilidad y un rendimiento óptimo.

## 👤 Historias de Usuario

| ID    | Como... (rol)              | Quiero... (acción)                                      | Para... (beneficio)                                    |
| :---- | :------------------------- | :------------------------------------------------------ | :----------------------------------------------------- |
| **US16** | un desarrollador           | que cada `push` a la rama `main` despliegue automáticamente a producción. | agilizar la entrega de nuevas funcionalidades.         |
| **US17** | un desarrollador           | tener un entorno de `staging` para probar los cambios.  | validar las funcionalidades antes de lanzarlas.        |
| **US18** | el equipo de operaciones   | recibir alertas si la aplicación se cae o tiene errores. | poder reaccionar rápidamente a los problemas.          |

## ✅ Checklist de Tareas Técnicas

- [x] **Configuración de Vercel/Netlify:** Conectar el repositorio para despliegues automáticos.
- [x] **Variables de Entorno:** Configurar las variables de entorno para producción.
- [ ] **Pipeline de CI/CD:** Crear un workflow de GitHub Actions para tests y builds.
- [ ] **Entorno de Staging:** Configurar una rama y un entorno para pre-producción.
- [ ] **Sistema de Monitorización y Logging:** Integrar una herramienta como Sentry o Logtail.
- [ ] **Optimización de Rendimiento:** Analizar y mejorar las Core Web Vitals.
