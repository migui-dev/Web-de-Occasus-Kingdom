// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import { CONFIG } from '../config'; // Archivo con datos fijos, como el enlace del vídeo.

// DEFINICIÓN DEL COMPONENTE
export function VideoSection() {
  const { t } = useAppContext();
  
  return (
    <Section id = "video" className = "gradient-bg-1">
      <SectionHeader title = {t('video.title')} />
      // Contenedor del vídeo.
      <motion.div
        className = "aspect-video max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-2 border-accent/20"
        initial = {{ opacity: 0, scale: 0.9 }}
        whileInView = {{ opacity: 1, scale: 1 }}
        viewport = {{ once: true, amount: 0.5 }}
        transition = {{ duration: 0.7 }}
      >
        <iframe 
          className = "w-full h-full"
          src = {CONFIG.videoEmbedUrl}
          title = "YouTube video player"
          frameBorder = "0"
          allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </motion.div>
    </Section>
  );
}