// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.

// DEFINICIÓN DE TIPOS
type Props = {
  title: string;
  subtitle?: string;
};

// DEFINICIÓN DEL COMPONENTE
export function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className = "text-center mb-16">
      <motion.h2 
        className = "text-4xl sm:text-5xl font-display title-decoration spark-effect" 
        initial = {{ opacity: 0, y: -20 }}
        whileInView = {{ opacity: 1, y: 0 }}
        viewport = {{ once: true }}
        transition = {{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className = "mt-8 text-lg max-w-3xl mx-auto"
          initial = {{ opacity: 0, y: -20 }}
          whileInView = {{ opacity: 1, y: 0 }}
          viewport = {{ once: true }}
          transition = {{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}