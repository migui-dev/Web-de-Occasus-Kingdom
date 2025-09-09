// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Acceder a datos globales de la aplicación como el idioma actual.
import { Section } from './Section'; // Sección de la web.
import { SectionHeader } from './SectionHeader'; // Títulos de las secciones.
import esTranslations from '../locales/es'; // Archivo de traducciones en español.

// DEFINICIÓN DEL COMPONENTE
export function Asistencia() {
  const { t } = useAppContext();
  const datosTickets = esTranslations.tickets;
  return (
    <Section id = "asistencia" className = "gradient-bg-2">
      <SectionHeader title = {t('tickets.title')} subtitle = {t('tickets.description')} />
      <div className = "flex justify-center">
        {datosTickets.types.map((ticket) => (
          <motion.div
            key={ticket.name}
            className = "medieval-card p-8 flex flex-col max-w-md w-full highlight-card"
            initial = {{ opacity: 0, y: 40 }}
            whileInView = {{ opacity: 1, y: 0 }}
            viewport = {{ once: true, amount: 0.3 }}
            transition = {{ duration: 0.6 }}
          >
            {/* CONTENIDO DE LA TARJETA */}
            <h3 className = "text-2xl font-display text-accent"> {t('tickets.types.0.name')} </h3>
            <p className = "text-5xl font-display my-4"> {t('tickets.types.0.price')} </p>

            <ul className = "space-y-3 font-body flex-grow mb-8">
              {ticket.features.map((_feat, j) => (
                <motion.li
                  key = {j}
                  className = "flex items-center gap-3"
                  initial = {{ opacity: 0, x: -10 }}
                  whileInView = {{ opacity: 1, x: 0 }}
                  viewport = {{ once: true }}
                  transition = {{ duration: 0.4, delay: 0.4 + j * 0.1 }}
                  >
                  <span className = "text-accent"> ✧ </span>
                  <span> {t(`tickets.types.0.features.${j}`)} </span>
                </motion.li>
              ))}
            </ul>

            <a href = "https://www.google.com/forms/about/" target = "_blank" rel = "noopener noreferrer" className = "btn-primary w-full mt-auto"> {t('tickets.button')} </a>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}