// IMPORTACIONES
import { useState } from 'react'; // Para guardar qué pregunta está abierta actualmente.
import { motion, AnimatePresence } from 'framer-motion'; // Para las animaciones de aparición y desplegado.
import { useAppContext } from '../App'; // Para usar el traductor y el idioma actual.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import { Icon } from './Icon'; // El dibujito de la flecha que gira.
import es from '../locales/es'; // El archivo de idioma español.
import en from '../locales/en'; // El archivo de idioma inglés.

// DEFINICIÓN DE OBJETOS
const translations = { es, en };

// DEFINICIÓN DEL COMPONENTE
export function FAQ() {
    const { t, lang } = useAppContext();
    const datosFaq = translations[lang].faq;
    const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);

    return (
      <Section id = "faq" className = "gradient-bg-1">
        <SectionHeader title = {t('faq.title')} />
        <div className = "max-w-4xl mx-auto space-y-4 font-body">
          {datosFaq.items.map((faq, i) => (
            <motion.div
              key = {i}
              className = "medieval-card overflow-hidden" 
              initial = {{ opacity: 0, x: -30 }}
              whileInView = {{ opacity: 1, x: 0 }}
              viewport = {{ once: true }}
              transition = {{ duration: 0.5, delay: i * 0.1 }}
            >
              <button 
                onClick = {() => setIndiceAbierto(indiceAbierto === i ? null : i)} 
                className = "w-full text-left text-lg font-semibold p-4 flex justify-between items-center"
              >
                <span> {faq.q} </span>
                <motion.div animate = {{ rotate: indiceAbierto === i ? 180 : 0 }}>
                  <Icon.ChevronDown className = "w-5 h-5 text-accent" />
                </motion.div>
              </button>

              <AnimatePresence>
                {indiceAbierto === i && (
                  <motion.div
                    initial = {{ height: 0, opacity: 0 }}
                    animate = {{ height: 'auto', opacity: 1 }}
                    exit = {{ height: 0, opacity: 0 }}
                    transition = {{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <p className = "px-4 pb-4 pt-2 border-t border-accent/20"> {faq.a} </p>
                  </motion.div>

                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Section>
    );
}