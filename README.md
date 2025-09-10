# 🏰 | Occasus Kingdom - Web Oficial
Página web promocional para el evento de feria medieval "Occasus Kingdom". Desarrollada como una aplicación de página única (SPA) moderna, totalmente responsive y con soporte multi-idioma, construida con React y Vite.

**Visita la web en vivo: [Occasus Kingdom]** *(https://occasuskingdom.netlify.app/)*

## ✨ | Características Principales
-   **Diseño 100% Responsive:** Totalmente funcional y estético en dispositivos de escritorio, tablets y móviles.
-   **Sistema de Rutas:** Navegación entre la página principal (`/`) y la página del Dossier (`/dossier`) usando React Router.
-   **Soporte Multi-idioma:** Contenido disponible y alternable entre Español e Inglés.
-   **Selector de Tema:** Funcionalidad para cambiar entre Modo Claro y Modo Oscuro, con persistencia en el navegador.
-   **Animaciones dinámicas:** Transiciones suaves y efectos de aparición en todas las secciones gracias a Framer Motion.
-   **Componentes interactivos:**
    -   Carruseles deslizables en móvil para el Programa y los Invitados.
    -   Acordeones para las secciones de Actividades y Preguntas Frecuentes (FAQ).
-   **Efectos visuales temáticos:**
    -   Partículas de chispas que caen en las secciones principales.
    -   Efecto de brillo pulsante en los títulos.
    -   Divisores de sección animados.
    -   Scrollbar personalizado.

## 🛠️ | Tecnologías Utilizadas
-   **Framework:** React (con Vite y TypeScript)
-   **Estilos:** Tailwind CSS
-   **Animaciones:** Framer Motion
-   **Routing:** React Router DOM
-   **Carruseles:** Embla Carousel React

## 🚀 | Cómo Empezar (Instalación Local)
Sigue estos pasos para ejecutar el proyecto en tu propio ordenador.

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/migui-dev/Web-de-Occasus-Kingdom.git
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd tu-repositorio
    ```

3.  **Instala las dependencias:**
    ```bash
    npm install
    ```

4.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:5173`.

## 📦 | Compilación y Despliegue

-   **Para compilar la versión de producción:**
    ```bash
    npm run build
    ```
    Esto generará una carpeta `dist` con todos los archivos estáticos listos para ser desplegados.

-   **Despliegue:**
    El proyecto está configurado para un despliegue automático en **Netlify** a través de GitHub. Cualquier `push` a la rama `main` iniciará un nuevo despliegue.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
