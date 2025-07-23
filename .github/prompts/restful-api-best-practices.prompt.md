---
description: "Mejores prácticas para diseño de APIs RESTful - Frontium Videos"
mode: agent
---

# RESTful API Design Best Practices - Frontium Videos

## 🎯 Principios Fundamentales REST

### Arquitectura RESTful
- **Platform Independence**: APIs independientes de la implementación interna
- **Loose Coupling**: Cliente y servicio evolucionan independientemente
- **Stateless**: Cada request es independiente y atómico
- **Uniform Interface**: Uso de métodos HTTP estándar
- **Resource-Based**: APIs organizadas alrededor de recursos (sustantivos)

## 🏗️ Diseño de URIs y Recursos

### Convenciones de Naming
```typescript
// ✅ CORRECTO - Usar sustantivos para recursos
GET /api/courses
GET /api/courses/123
GET /api/users/456/courses

// ❌ INCORRECTO - Evitar verbos en URIs
GET /api/getCourses
POST /api/createCourse
DELETE /api/deleteCourse
```

### Jerarquía de Recursos
```typescript
// ✅ Colecciones y elementos individuales
GET /api/courses                    // Colección de cursos
GET /api/courses/123               // Curso específico
GET /api/courses/123/lessons       // Lecciones del curso
GET /api/courses/123/lessons/456   // Lección específica

// ✅ Relaciones simples y flexibles
GET /api/users/789/enrollments     // Inscripciones del usuario
GET /api/courses/123/students      // Estudiantes del curso
```

### Reglas de URI
- **Usar sustantivos plurales** para colecciones: `/courses`, `/users`
- **Mantener jerarquías simples**: Máximo `collection/item/collection`
- **Evitar URIs complejas**: No más de 3 niveles de anidación
- **Usar kebab-case**: `/user-profiles` en lugar de `/userProfiles`

## 🔧 Métodos HTTP y Operaciones

### CRUD Operations
```typescript
// ✅ Mapeo correcto de métodos HTTP
GET    /api/courses           // Obtener lista de cursos
GET    /api/courses/123       // Obtener curso específico
POST   /api/courses           // Crear nuevo curso
PUT    /api/courses/123       // Actualizar curso completo
PATCH  /api/courses/123       // Actualización parcial
DELETE /api/courses/123       // Eliminar curso
```

### Operaciones Especiales
```typescript
// ✅ Acciones específicas como sub-recursos
POST /api/courses/123/enroll      // Inscribirse en curso
POST /api/courses/123/unenroll    // Desinscribirse
POST /api/users/456/activate      // Activar usuario
POST /api/orders/789/cancel       // Cancelar orden
```

## 📊 Códigos de Estado HTTP

### Respuestas Exitosas
```typescript
// 200 OK - Operación exitosa con contenido
GET /api/courses/123 → 200 + course data

// 201 Created - Recurso creado exitosamente
POST /api/courses → 201 + new course data + Location header

// 204 No Content - Operación exitosa sin contenido
DELETE /api/courses/123 → 204
PUT /api/courses/123 → 204
```

### Errores del Cliente (4xx)
```typescript
// 400 Bad Request - Request malformado
POST /api/courses + invalid JSON → 400

// 401 Unauthorized - No autenticado
GET /api/private-courses → 401

// 403 Forbidden - Autenticado pero sin permisos
DELETE /api/courses/123 → 403

// 404 Not Found - Recurso no existe
GET /api/courses/999 → 404

// 409 Conflict - Estado conflictivo
POST /api/courses + duplicate slug → 409

// 422 Unprocessable Entity - Validación fallida
POST /api/courses + invalid data → 422
```

### Errores del Servidor (5xx)
```typescript
// 500 Internal Server Error - Error interno
GET /api/courses → 500 + error details

// 503 Service Unavailable - Servicio temporalmente no disponible
GET /api/courses → 503 + retry-after header
```

## 📝 Formato de Respuestas

### Estructura Consistente
```typescript
// ✅ Respuesta exitosa
{
  "data": {
    "id": 123,
    "title": "Next.js Fundamentals",
    "slug": "nextjs-fundamentals",
    "description": "Learn Next.js from scratch",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-20T14:45:00Z"
  },
  "meta": {
    "timestamp": "2024-01-20T15:00:00Z",
    "version": "1.0"
  }
}

// ✅ Respuesta de error
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid course data provided",
    "details": [
      {
        "field": "title",
        "message": "Title is required"
      },
      {
        "field": "slug",
        "message": "Slug must be unique"
      }
    ]
  },
  "meta": {
    "timestamp": "2024-01-20T15:00:00Z",
    "requestId": "req_123456789"
  }
}
```

### Paginación
```typescript
// ✅ Paginación con metadata
GET /api/courses?page=2&limit=10

{
  "data": [...courses],
  "pagination": {
    "page": 2,
    "limit": 10,
    "total": 150,
    "totalPages": 15,
    "hasNext": true,
    "hasPrev": true
  },
  "links": {
    "self": "/api/courses?page=2&limit=10",
    "first": "/api/courses?page=1&limit=10",
    "prev": "/api/courses?page=1&limit=10",
    "next": "/api/courses?page=3&limit=10",
    "last": "/api/courses?page=15&limit=10"
  }
}
```

## 🔍 Filtrado, Ordenamiento y Búsqueda

### Query Parameters
```typescript
// ✅ Filtrado
GET /api/courses?category=programming&level=beginner
GET /api/courses?published=true&author=john-doe

// ✅ Ordenamiento
GET /api/courses?sort=title&order=asc
GET /api/courses?sort=-createdAt  // Descendente con prefijo -

// ✅ Búsqueda
GET /api/courses?search=nextjs
GET /api/courses?q=react+hooks

// ✅ Campos específicos
GET /api/courses?fields=id,title,slug,description
```

## 🔐 Versionado de API

### Estrategias de Versionado
```typescript
// ✅ Versionado por URI (Recomendado)
GET /api/v1/courses
GET /api/v2/courses

// ✅ Versionado por Header
GET /api/courses
Headers: { "API-Version": "v2" }

// ✅ Versionado por Media Type
GET /api/courses
Headers: { "Accept": "application/vnd.frontium.v2+json" }
```

## 🔗 HATEOAS (Hypermedia)

### Links en Respuestas
```typescript
{
  "data": {
    "id": 123,
    "title": "Next.js Course",
    "status": "published"
  },
  "links": {
    "self": "/api/courses/123",
    "lessons": "/api/courses/123/lessons",
    "enroll": "/api/courses/123/enroll",
    "reviews": "/api/courses/123/reviews"
  },
  "actions": [
    {
      "name": "enroll",
      "method": "POST",
      "href": "/api/courses/123/enroll",
      "type": "application/json"
    },
    {
      "name": "update",
      "method": "PUT",
      "href": "/api/courses/123",
      "type": "application/json"
    }
  ]
}
```

## 🏢 Multitenancy

### Estrategias de Aislamiento
```typescript
// ✅ Subdomain-based
GET https://acme-corp.api.frontium.com/courses

// ✅ Header-based
GET /api/courses
Headers: { "X-Tenant-ID": "acme-corp" }

// ✅ Path-based
GET /api/tenants/acme-corp/courses

// ✅ JWT Claims
GET /api/courses
Authorization: Bearer <jwt-with-tenant-claim>
```

## 📊 Observabilidad y Trazabilidad

### Headers de Correlación
```typescript
// ✅ Request tracing
GET /api/courses
Headers: {
  "Correlation-ID": "req_123456789",
  "X-Request-ID": "uuid-here",
  "X-Trace-ID": "trace-uuid"
}

// ✅ Response con mismo ID
HTTP/1.1 200 OK
Correlation-ID: req_123456789
X-Request-ID: uuid-here
```

## 🛡️ Seguridad

### Autenticación y Autorización
```typescript
// ✅ Bearer Token
Authorization: Bearer <jwt-token>

// ✅ API Key
X-API-Key: your-api-key

// ✅ Validación en Server Actions
export async function createCourse(formData: FormData) {
  const session = await getServerSession();
  if (!session?.user) {
    throw new Error('Unauthorized');
  }
  
  const validatedData = courseSchema.parse({
    title: formData.get('title'),
    description: formData.get('description')
  });
  
  // Create course logic
}
```

### Rate Limiting
```typescript
// ✅ Headers de rate limit
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## 📚 Documentación

### OpenAPI/Swagger
```yaml
# ✅ Especificación OpenAPI
openapi: 3.0.0
info:
  title: Frontium Videos API
  version: 1.0.0
  description: API for managing courses and users

paths:
  /api/courses:
    get:
      summary: Get all courses
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
      responses:
        '200':
          description: List of courses
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CoursesResponse'
```

## 🎯 Modelo de Madurez Richardson

### Niveles de Madurez
- **Nivel 0**: Un URI, todas las operaciones POST
- **Nivel 1**: URIs separados para recursos individuales
- **Nivel 2**: Métodos HTTP para operaciones (La mayoría de APIs)
- **Nivel 3**: Hypermedia (HATEOAS) - Verdaderamente RESTful

### Objetivo: Nivel 2-3
```typescript
// Nivel 2: HTTP Methods + Status Codes
GET /api/courses → 200 OK
POST /api/courses → 201 Created
PUT /api/courses/123 → 200 OK
DELETE /api/courses/123 → 204 No Content

// Nivel 3: + HATEOAS
{
  "data": {...},
  "links": {...},
  "actions": [...]
}
```

---

**IMPORTANTE**: Aplicar estas mejores prácticas consistentemente en todas las APIs del proyecto Frontium Videos para garantizar diseños RESTful profesionales, mantenibles y escalables. 