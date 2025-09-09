// IMPORTACIONES
import React from 'react'; // La librería principal de React, necesaria en todos los archivos.
import ReactDOM from 'react-dom/client'; // Herramienta para "dibujar" la aplicación en el navegador.
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Herramientas para manejar las diferentes páginas/rutas de la web.
import App, { HomePage } from './App'; // La plantilla principal de la App y el componente de la página de inicio.
import { DossierPage } from './components/DossierPage'; // El componente de la página del dossier.
import './index.css'; // Los estilos principales de la web.

// DEFINICIÓN DEL ROUTER
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dossier",
        element: <DossierPage />,
      },
    ],
  },
]);

// RENDERIZADO DE LA APLICACIÓN
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router = {router} /> 
  </React.StrictMode>,
);