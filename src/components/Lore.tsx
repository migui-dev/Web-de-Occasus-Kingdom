// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor y el idioma actual.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import es from '../locales/es'; // El archivo de idioma español.
import en from '../locales/en'; // El archivo de idioma inglés.

// DEFINICIÓN DE OBJETOS
const translations = { es, en };

// DEFINICIÓN DEL COMPONENTE
export function Lore() {
  const { t, lang } = useAppContext();
  const datosLore = translations[lang].lore;

  return (
    <Section id = "lore" className = "gradient-bg-1">
      <SectionHeader title = {t('lore.title')} />
      <div className = "max-w-3xl mx-auto space-y-6 font-body text-lg text-center leading-relaxed">
        {datosLore.paragraphs.map((p, i) => (
          <motion.p
            key = {i}
            initial = {{ opacity: 0, y: 20 }}
            whileInView = {{ opacity: 1, y: 0 }}
            viewport = {{ once: true, amount: 0.5 }}
            transition = {{ duration: 0.6, delay: i * 0.2 }}
          >
            {p}
          </motion.p>
        ))}
      </div>
    </Section>
  );
}