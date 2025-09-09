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
export function Schedule() {
  const { t, lang } = useAppContext();
  const scheduleConfig = translations[lang].schedule;

  const [emblaRef] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });

  return (
    <Section id = "programa" className = "gradient-bg-1">
      <SectionHeader title = {t('schedule.title')} />

      <div className = "lg:grid lg:grid-cols-3 lg:gap-8 lg:items-start">
        <div className = "overflow-hidden lg:contents" ref = {emblaRef}>
          <div className = "flex lg:contents items-start">

            {scheduleConfig.days.map((day, dayIndex) => (

              <motion.div 
                key = {day.day}
                className = "flex-[0_0_85%] sm:flex-[0_0_70%] md:flex-[0_0_50%] lg:flex-auto ml-4 lg:ml-0"
                initial = {{ opacity: 0, y: 50 }}
                whileInView = {{ opacity: 1, y: 0 }}
                transition = {{ duration: 0.5, delay: dayIndex * 0.15 }}
                viewport = {{ once: true }}
              >
                <div className = "medieval-card p-6 border-t-4 border-accent/50">
                  <h3 className = "font-display text-2xl text-accent text-center mb-2">{day.day}</h3>
                  <p className = "font-body text-sm text-center mb-6 opacity-70">{day.date}</p>

                  <ul className = "space-y-4">
                    {day.items.map((item, itemIndex) => (
                      <li key = {itemIndex} className = "border-b border-accent/10 pb-4 last:border-b-0 flex items-start gap-3">
                        <span className = "text-accent text-lg pt-1"> ✧ </span>
                        <div>
                          <p className = "font-display"> {item.time} - {item.title} </p>
                          <p className = "font-body text-sm"> {item.description} </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}