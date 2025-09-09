// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.

// DEFINICIÓN DEL COMPONENTE
export function SectionDivider() {
  return (
    <div className = "flex justify-center items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 my-10">
      
      {/* Línea izquierda animada. */}
      <motion.div 
        className = "divider-line-right"
        initial = {{ scaleX: 0, originX: 1 }}
        whileInView = {{ scaleX: 1 }}
        viewport = {{ once: true, amount: 0.5 }}
        transition = {{ duration: 0.7, ease: "easeOut" }}
      />
      
      {/* Círculo central animado. */}
      <motion.div
        className = "flex-shrink-0 w-5 h-5 rounded-full bg-accent pulsing-glow mx-4"
        initial = {{ opacity: 0, scale: 0.5 }}
        whileInView = {{ opacity: 1, scale: 1 }}
        viewport = {{ once: true, amount: 0.5 }}
        transition = {{ duration: 0.4, delay: 0.5 }}
      />

      {/* Línea derecha animada. */}
      <motion.div 
        className = "divider-line-left"
        initial = {{ scaleX: 0, originX: 0 }}
        whileInView = {{ scaleX: 1 }}
        viewport = {{ once: true, amount: 0.5 }}
        transition = {{ duration: 0.7, ease: "easeOut" }}
      />

    </div>
  );
}