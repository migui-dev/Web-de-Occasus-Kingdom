// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor y el idioma actual.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import es from '../locales/es'; // El archivo de idioma español.
import en from '../locales/en'; // El archivo de idioma inglés.
import useEmblaCarousel from 'embla-carousel-react'; // La herramienta para crear el carrusel en móviles.

// DEFINICIÓN DE OBJETOS
const translations = { es, en };

// DEFINICIÓN DEL COMPONENTE
export function Guests() {
  const { t, lang } = useAppContext();
  const guestsConfig = translations[lang].guests;
  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  return (
    <Section id = "invitados" className = "gradient-bg-2">
      <SectionHeader title = {t('guests.title')} />
      <div className = "lg:grid lg:grid-cols-3 lg:gap-8">
        <div className = "overflow-hidden lg:contents" ref = {emblaRef}>
          <div className = "flex lg:contents items-start">
            {guestsConfig.list.map((guest, i) => (
              <motion.div 
                key = {i}
                className = "flex-[0_0_70%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-auto ml-4 lg:ml-0 group"
                initial = {{ opacity: 0, scale: 0.9 }}
                whileInView = {{ opacity: 1, scale: 1 }}
                viewport = {{ once: true, amount: 0.4 }}
                transition = {{ duration: 0.5, delay: i * 0.15 }}
                whileHover = {{ y: -10 }}
              >
                <div className = "text-center p-4">
                  <div className = "aspect-[1/1] overflow-hidden rounded-full mb-4 border-4 border-accent/20 group-hover:border-accent transition-colors duration-300">
                    <motion.img 
                      src = {guest.image} 
                      alt = {guest.name} 
                      loading = "lazy" 
                      className = "w-full h-full object-cover" 
                      whileHover = {{ scale: 1.1, rotate: 2 }}
                      transition = {{ type: 'spring', stiffness: 300 }} 
                    />
                  </div>
                  <h3 className = "text-xl font-display"> {guest.name} </h3>
                  <p className = "font-body text-accent"> {guest.title} </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}