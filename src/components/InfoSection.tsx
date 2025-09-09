// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor.
import { Section } from './Section'; // Plantilla para una sección.

// DEFINICIÓN DEL COMPONENTE
export function InfoSection() {
  const { t } = useAppContext();
  
  return (
    <Section id = "info" className = "gradient-bg-1">
      <motion.div
        className = "text-center max-w-4xl mx-auto"
        initial = {{ opacity: 0, scale: 0.95 }}
        whileInView = {{ opacity: 1, scale: 1 }}
        viewport = {{ once: true }}
        transition = {{ duration: 0.7, delay: 0.3 }}
      >
        <h2 className = "text-3xl font-display mb-4"> {t('eventInfo.title')} </h2>
        <p className = "font-body text-lg leading-relaxed"> {t('eventInfo.description')} </p>
      </motion.div>
    </Section>
  );
}