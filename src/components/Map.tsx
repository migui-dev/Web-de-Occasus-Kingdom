// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor y saber si está el modo oscuro.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import { CONFIG } from '../config'; // Archivo con datos fijos, como el enlace del mapa.

// DEFINICIÓN DEL COMPONENTE
export function Map() {
  const { t, isDark } = useAppContext();
  return (
    <Section id = "mapa" className = "gradient-bg-1">
      <SectionHeader title = {t('map.title')} subtitle = {t('map.subtitle')} />
      <motion.div
        className = "overflow-hidden rounded-xl border-2 border-accent/20 shadow-2xl aspect-video max-w-6xl mx-auto"
        initial = {{ opacity: 0, scale: 0.9 }}
        whileInView = {{ opacity: 1, scale: 1 }}
        viewport = {{ once: true, amount: 0.5 }}
        transition = {{ duration: 0.7, delay: 0.3 }}
      >
        <iframe 
          src = {CONFIG.map.googleMapsEmbedUrl}
          className = {`w-full h-full ${isDark ? 'dark-map-filter' : ''}`}
          style = {{ border: 0 }}
          loading = "lazy"
          referrerPolicy = "no-referrer-when-downgrade"
          title = "Mapa del evento en Parque del Alamillo"
        ></iframe>
      </motion.div>
    </Section>
  );
}