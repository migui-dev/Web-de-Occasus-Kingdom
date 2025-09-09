// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.

// DEFINICIÓN DE TIPOS
type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
};

// DEFINICIÓN DEL COMPONENTE
export function Section({ id, children, className = '' }: Props) {
  return (
    <motion.section
      id = {id}
      className = {`py-20 sm:py-28 ${className}`}
      initial = {{ opacity: 0, y: 50 }}
      whileInView = {{ opacity: 1, y: 0 }}
      viewport = {{ once: true, amount: 0.2 }}
      transition = {{ duration: 0.8 }}
    >
      <div className = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> {children} </div>
    </motion.section>
  );
}