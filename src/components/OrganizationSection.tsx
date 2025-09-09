// IMPORTACIONES
import { motion } from 'framer-motion'; // Animaciones.
import CountUp from 'react-countup'; // Para que los números cuenten hacia arriba de forma animada.
import { useAppContext } from '../App'; // Para usar el traductor.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import esTranslations from '../locales/es'; // Archivo de traducciones en español.

// DEFINICIÓN DEL COMPONENTE
export function OrganizationSection() {
  const { t } = useAppContext();
  const datosOrganizacion = esTranslations.organization;

  return (
    <Section id = "organization" className = "gradient-bg-2">
      <SectionHeader title = {t('organization.title')} />
      <motion.div
        className = "mt-10 text-center max-w-5xl mx-auto"
        initial = {{ opacity: 0, y: 50 }}
        whileInView = {{ opacity: 1, y: 0 }}
        viewport = {{ once: true, amount: 0.3 }}
        transition = {{ duration: 0.8 }}
      >
        <p className = "font-body text-lg leading-relaxed mb-12"> {t('organization.description')} </p>
        <div className = "grid grid-cols-2 lg:grid-cols-4 gap-8">
          {datosOrganizacion.stats.map((stat, i) => (
            <motion.div
              key = {i}
              className = "flex flex-col items-center"
              initial = {{ opacity: 0, y: 30 }}
              whileInView = {{ opacity: 1, y: 0 }}
              viewport = {{ once: true, amount: 0.5 }}
              transition = {{ duration: 0.6, delay: i * 0.15 }}
            >
              <span className = "text-5xl font-display text-accent mb-2">
                <CountUp
                  start = {0}
                  end = {stat.value} 
                  duration = {2}
                  enableScrollSpy
                  scrollSpyOnce
                  suffix = "+"
                />
              </span>
              <span className = "text-sm uppercase tracking-wider font-body text-text-body/70"> {t(`organization.stats.${i}.label`)} </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}