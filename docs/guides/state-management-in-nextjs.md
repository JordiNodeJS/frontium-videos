# Guía Definitiva de Componentes y Estado en Next.js (App Router)

Este documento resume los conceptos clave y las mejores prácticas para manejar la composición de componentes (RSC/RCC) y el estado del lado del cliente en una aplicación Next.js que utiliza el App Router.

## Principios Fundamentales de los Componentes

### 1. Los Providers son Client Components (RCC)

Cualquier componente que utilice React Context y/o hooks (`useState`, `useEffect`, `useContext`) para proveer un estado a sus hijos, **debe ser un Client Component**.

Esto se logra añadiendo la directiva `"use client"` al principio del archivo.

### 2. Los Providers no "Convierten" a sus Hijos

Envolver un Server Component (RSC) con un Client Component (RCC) **no convierte al hijo en un Client Component**.

-   **El Padre (Provider RCC):** Actúa como un contenedor cuyo código se ejecuta en el cliente.
-   **El Hijo (Children RSC):** Se renderiza completamente en el servidor, generando HTML estático. Este HTML se pasa como una prop (`children`) y se inserta en el "hueco" que el padre ha definido.

### 3. Componentes que Leen/Escriben Estado DEBEN ser Client Components

Cualquier componente que necesite interactuar directamente con un estado del lado del cliente (Redux, Clerk) **debe ser un Client Component**.
La razón es que necesitan usar **hooks** (`useSelector`, `useUser`, etc.), y los hooks solo funcionan en RCC.

### 4. Reglas de Composición y Paso de Props

Esta es una de las partes más importantes de la arquitectura de Next.js. El flujo de renderizado es unidireccional (Servidor -> Cliente).

-   **RSC puede renderizar a RSC (✅ SÍ):** Escenario estándar. Un padre RSC pasa props a un hijo RSC. Todo ocurre en el servidor.

-   **RSC puede renderizar a RCC (✅ SÍ):** Un padre RSC puede importar un RCC y pasarle props serializables (strings, números, objetos simples). El RSC se renderiza en el servidor y le pasa las props al RCC para que se hidrate en el cliente.

-   **RCC NO puede renderizar a RSC (❌ NO):** Un Client Component no puede importar y renderizar directamente un Server Component. El código del RSC no existe en el navegador. Sería como intentar llamar a una función de backend desde el frontend directamente.

-   **El Patrón del "Slot" (`children`):** La forma correcta de anidar un RSC dentro de un RCC es que un **componente ancestro (RSC)** renderice ambos y pase el RSC como `children` al RCC.

    ```tsx
    // Abuelo (RSC)
    import ClientWrapper from './ClientWrapper'; // RCC
    import ServerInfo from './ServerInfo';     // RSC

    export default function Page() {
      return (
        // El RCC (ClientWrapper) recibe al RSC (ServerInfo) a través de props.
        // No lo está importando ni renderizando él mismo.
        <ClientWrapper>
          <ServerInfo />
        </ClientWrapper>
      );
    }
    ```

## Patrón Recomendado: Aislar la Lógica de Cliente

Para maximizar el uso de Server Components, sigue este patrón:

1.  **Mantén las páginas como RSC siempre que sea posible.** Se encargan de la estructura y de obtener datos del servidor.
2.  **Crea componentes RCC específicos para la interactividad.** Estos componentes contendrán la lógica de estado (hooks).
3.  **Pasa datos como props.** Un RSC padre puede obtener datos y pasarlos como props a un RCC hijo. A su vez, un RCC puede leer de una store y pasar esos datos como props a un componente de UI "tonto" que no necesita saber de dónde vienen los datos.

### Flujo de Datos y Componentes

```mermaid
graph TD
    A[layout.tsx (RSC)] --> B(StoreProvider (RCC));
    B --> C(ClerkProvider (RCC));
    C --> D{children (Slot)};

    D --> E[page.tsx (RSC)];
    E --> F[UserProfile (RCC)];
    F -- Lee de Redux y pasa props --> G[UserDisplay (Componente de UI)];

    subgraph Servidor
        A
        E
    end

    subgraph Cliente
        B
        C
        F
        G
    end
```

Este enfoque híbrido te permite tener lo mejor de ambos mundos: el rendimiento y la seguridad de los Server Components para la mayor parte de tu aplicación, y la interactividad y gestión de estado de los Client Components justo donde los necesitas.
