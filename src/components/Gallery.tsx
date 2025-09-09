// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import useEmblaCarousel from 'embla-carousel-react'; // La herramienta principal para crear el carrusel.
import Autoplay from 'embla-carousel-autoplay'; // Un extra para que el carrusel se mueva solo.
import { useAppContext } from '../App'; // Para usar el traductor.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Título de una sección.
import { CONFIG } from '../config'; // Archivo con datos fijos, como la lista de imágenes.

// DEFINICIÓN DEL COMPONENTE
export function Gallery() {
  const { t } = useAppContext();
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  return (
    <Section id = "galeria" className = "gradient-bg-2">
      <SectionHeader title = {t('gallery.title')} />
      <motion.div 
        className = "overflow-hidden max-w-6xl mx-auto" 
        ref = {emblaRef}
        initial = {{ opacity: 0, y: 50 }}
        whileInView = {{ opacity: 1, y: 0 }}
        viewport = {{ once: true, amount: 0.2 }}
        transition = {{ duration: 0.8 }}
      >
        <div className = "flex">
          {CONFIG.galleryImages.map((src, i) => (
            <div className = "flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 p-2" key = {i}>
              <div className = "aspect-square overflow-hidden rounded-md shadow-lg group block">
                <img
                  src = {src}
                  alt = {`Galería de Occasus Kingdom ${i + 1}`}
                  loading = "lazy"
                  className = "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}