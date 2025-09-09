// IMPORTACIONES
import React from 'react';

// Hook para hacer el scroll suave al hacer click en un enlace
export function useManejaScroll() {
  const manejarScrollSuave = (evento: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    evento.preventDefault();
    const elemento = document.querySelector(href);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return { manejarScrollSuave };
}
