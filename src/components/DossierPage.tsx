// IMPORTACIONES
import { useState, useMemo, useEffect, useRef } from 'react'; // Herramientas de React para manejar estado, optimizar y ejecutar código.
import { motion, AnimatePresence } from 'framer-motion'; // Para las animaciones de aparición y desaparición.
import { useAppContext } from '../App'; // Para usar el traductor y otras funciones globales.
import { CONFIG } from '../config'; // Archivo con datos fijos (como enlaces).
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import { SectionDivider } from './SectionDivider'; // El separador entre secciones.

// --- PEQUEÑOS COMPONENTES Y HOOKS PARA ESTA PÁGINA ---

// Hook (herramienta reutilizable) para calcular la cuenta atrás.
const useCountdown = (targetDate: string) => {
  const finalDate = useMemo(() => new Date(targetDate).getTime(), [targetDate]); // Convierte la fecha de texto a un número y la guarda para no recalcularla.
  const [now, setNow] = useState(Date.now()); // Guarda la fecha y hora actual, y la actualiza para que el contador avance.
  
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000); // Cada segundo, actualiza la hora.
    return () => clearInterval(timer); // Limpia el temporizador para que no se acumulen.
  }, []);

  const remaining = Math.max(0, finalDate - now); // Calcula el tiempo que falta en milisegundos.
  
  // Devuelve el tiempo restante convertido a días, horas, minutos y segundos.
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor(remaining / 3600000) % 24,
    minutes: Math.floor(remaining / 60000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  };
};

// Componente para el menú desplegable (acordeón) de las actividades.
const AccordionItem = ({ title, emoji, children, isOpen, onClick }: any) => (
  <div className = "medieval-card overflow-hidden">
    <button onClick = {onClick} className = "w-full text-left text-lg font-display p-4 flex justify-between items-center hover:bg-background transition-colors">
      <span className = "flex items-center gap-4"> {emoji} {title} </span>
      <motion.span animate = {{ rotate: isOpen ? 180 : 0 }} className = "text-accent text-2xl font-bold"> {isOpen ? '-' : '+'} </motion.span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial = {{ height: 0, opacity: 0 }} animate = {{ height: 'auto', opacity: 1 }} exit = {{ height: 0, opacity: 0 }}>
          <div className = "px-6 pb-6 pt-2 border-t border-accent/20 font-body text-text-body/90">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);


// SECCIONES DE LA PÁGINA

// DEFINICIÓN DEL COMPONENTE UneteSection
function UneteSection() {
  const { t } = useAppContext();
  const sparkContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sparkContainerRef.current;
    
    if (!container) return;

    const numSparks = 30;
    container.innerHTML = '';
    
    for (let i = 0; i < numSparks; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';

      const size = Math.random() * 5 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 5;
      const xOffset = (Math.random() - 0.5) * 200;

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${left}%`;
      spark.style.animationDelay = `${delay}s`;
      spark.style.animationDuration = `${duration}s`;
      spark.style.setProperty('--spark-x-offset', `${xOffset}px`);
      
      container.appendChild(spark);
    }
  }, []);

  return (
    <section id = "unete" className = "relative bg-background-alt overflow-hidden">
      <div ref = {sparkContainerRef} className = "spark-container"></div>
      <div className = "absolute inset-0 bg-cover bg-center opacity-10" style = {{ backgroundImage: `url(/galeria4.jpg)` }} />
      <div className = "absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className = "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
        <motion.div initial = {{ opacity: 0, y: 20 }} whileInView = {{ opacity: 1, y: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.8 }}>
          <h2 className = "font-display text-5xl md:text-7xl text-accent spark-effect"> {t('dossier.uneteTitulo')} </h2>
          <p className = "mt-4 text-xl max-w-3xl mx-auto font-body"> {t('dossier.uneteSubtitulo')} </p>
        </motion.div>
        <motion.div initial = {{ opacity: 0, y: 20 }} whileInView = {{ opacity: 1, y: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.8, delay: 0.2 }} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 font-display text-lg max-w-4xl mx-auto">
          <div className = "medieval-card p-4"> {t('dossier.uneteFecha')} </div>
          <div className = "medieval-card p-4"> {t('dossier.uneteLugar')} </div>
          <div className = "medieval-card p-4"> {t('dossier.unetePrecio')} </div>
        </motion.div>
      </div>
    </section>
  );
}

// DEFINICIÓN DEL COMPONENTE PreciosSection
function PreciosSection() {
    const { t } = useAppContext();
    const precios = [
        { zona: t('dossier.preciosZonaPerimetral'),
          precio: "32€/m",
          desc: t('dossier.preciosZonaPerimetralDesc'),
          icon: '✔' },
        
        { zona: t('dossier.preciosZonaAccesos'),
          precio: "37€/m",
          desc: t('dossier.preciosZonaAccesosDesc'),
          icon: '✅' },
        
        { zona: t('dossier.preciosZonaPrincipal'),
          precio: "41€/m",
          desc: t('dossier.preciosZonaPrincipalDesc'),
          icon: '📍' },
    ];
    return (
        <Section id = "precios" className = "gradient-bg-1">
            <SectionHeader title = {t('dossier.preciosTitulo')} />
            <p className = "text-center max-w-4xl mx-auto mb-4" dangerouslySetInnerHTML = {{ __html: t('dossier.preciosDesc1') }} />
            <p className = "text-center font-bold medieval-card max-w-4xl mx-auto p-4 mb-12" dangerouslySetInnerHTML = {{ __html: t('dossier.preciosImportante') }} />
            <div className = "grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {precios.map((p, i) => (
                    <motion.div key = {p.zona} className = "medieval-card p-6 text-center flex flex-col" initial = {{ opacity: 0, y: 50 }} whileInView = {{ opacity: 1, y: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.5, delay: i * 0.15 }}>
                        <h3 className = "font-display text-xl text-accent-highlight mb-4"> {p.zona} </h3>
                        <p className = "font-display text-5xl my-4"> {p.precio} </p>
                        <p className = "font-body text-sm flex-grow mb-6"> {p.desc} </p>
                        <div className = "text-4xl"> {p.icon} </div>
                    </motion.div>
                ))}
                <motion.div className = "medieval-card p-6 text-center flex flex-col bg-accent/10" initial = {{ opacity: 0, y: 50 }} whileInView = {{ opacity: 1, y: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.5, delay: 0.45 }}>
                    <h3 className = "font-display text-xl text-accent-highlight mb-4"> {t('dossier.preciosAnimaciones')} </h3>
                    <p className = "font-display text-5xl my-4"> ¿€? </p>
                    <p className = "font-body text-sm flex-grow mb-6"> {t('dossier.preciosAnimacionesDesc')} </p>
                    <a href = "https://api.whatsapp.com/send/?phone=34689681114&text=Hola%21+Vengo+desde+la+web+de+Occasus+Kingdom.+Me+gustaria+info+sobre+proximas+ferias+y+actividades.&type=phone_number&app_absent=0" target = "_blank" rel = "noopener noreferrer" className = "btn-primary mt-auto"> {t('dossier.preciosBtn')} </a>
                </motion.div>
            </div>
        </Section>
    );
}

// DEFINICIÓN DEL COMPONENTE ZonificacionSection
function ZonificacionSection() {
    const { t } = useAppContext();
    return (
        <Section id = "zonificacion" className = "gradient-bg-2">
            <div className = "grid md:grid-cols-2 gap-12 items-center">
                <motion.div initial = {{ opacity: 0, x: -50 }} whileInView = {{ opacity: 1, x: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.8 }}>
                    <SectionHeader title = {t('dossier.zonificacionTitulo')} />
                    <p className = "font-body text-lg leading-relaxed mb-6"> {t('dossier.zonificacionDesc1')} </p>
                    <p className = "font-body text-lg leading-relaxed mb-6" dangerouslySetInnerHTML = {{ __html: t('dossier.zonificacionDesc2') }} />
                    <p className = "font-body text-lg leading-relaxed mb-6"> {t('dossier.zonificacionDesc3')} </p>
                    <ul className = "list-disc list-inside space-y-2 font-body text-lg">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <li key = {i}> {t(`dossier.zonificacionLista.${i}`)} </li>
                        ))}
                    </ul>
                </motion.div>
                <motion.div initial = {{ opacity: 0, scale: 0.9 }} whileInView = {{ opacity: 1, scale: 1 }} viewport = {{ once: true }} transition = {{ duration: 0.8 }}>
                    <img src = "/mapa.png" alt = "Mapa de zonificación del evento" className = "rounded-lg shadow-2xl w-full h-auto object-cover" />
                </motion.div>
            </div>
        </Section>
    );
}

// DEFINICIÓN DEL COMPONENTE ActividadesSection
function ActividadesSection() {
    const { t } = useAppContext();
    const [openIndex, setOpenIndex] = useState<number | null>(null); // Guarda qué desplegable está abierto.
    const actividades = [
        { title: t('dossier.actividadesRecreativas'),
          emoji: "⚔️",
          items: Array.from({ length: 4 }).map((_, i) => t(`dossier.actividadesRecreativasLista.${i}`)) },
        
        { title: t('dossier.actividadesDesafiantes'),
          emoji: "🗡️",
          items: Array.from({ length: 4 }).map((_, i) => t(`dossier.actividadesDesafiantesLista.${i}`)) },
        
        { title: t('dossier.actividadesInmersivas'),
          emoji: "🏰",
          items: Array.from({ length: 4 }).map((_, i) => t(`dossier.actividadesInmersivasLista.${i}`)) },
        
        { title: t('dossier.actividadesLudicas'),
          emoji: "🎨",
          items: Array.from({ length: 4 }).map((_, i) => t(`dossier.actividadesLudicasLista.${i}`)) },
    ];
    return (
        <Section id = "actividades" className = "gradient-bg-1">
            <SectionHeader title = {t('dossier.actividadesTitulo')} />
            <div className = "max-w-4xl mx-auto space-y-4">
                {actividades.map((item, index) => (
                    <AccordionItem key = {index} title = {item.title} emoji = {item.emoji} isOpen = {openIndex === index} onClick = {() => setOpenIndex(openIndex === index ? null : index)}>
                        <ul className = "list-disc list-inside space-y-2 pl-2">
                            {item.items.map((listItem, i) => (
                                <li key = {i} dangerouslySetInnerHTML = {{ __html: listItem }} />
                            ))}
                        </ul>
                    </AccordionItem>
                ))}
            </div>
        </Section>
    );
}

// DEFINICIÓN DEL COMPONENTE OfrecemosSection
function OfrecemosSection() {
    const { t } = useAppContext();
    const servicios = [
        { title: t('dossier.ofrecemosParking'),
          desc: t('dossier.ofrecemosParkingDesc'),
          emoji: "🚗" },

        { title: t('dossier.ofrecemosServicios'),
          desc: t('dossier.ofrecemosServiciosDesc'),
          emoji: "💡" },

        { title: t('dossier.ofrecemosHospedaje'),
          desc: t('dossier.ofrecemosHospedajeDesc'),
          emoji: "🏕️" },

        { title: t('dossier.ofrecemosPublicidad'),
          desc: t('dossier.ofrecemosPublicidadDesc'),
          emoji: "📣" }
    ];
    return (
        <Section id = "ofrecemos" className = "gradient-bg-2">
            <SectionHeader title = {t('dossier.ofrecemosTitulo')} />
            <div className = "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {servicios.map((s, i) => (
                    <motion.div key = {i} className = "flex gap-4" initial = {{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView = {{ opacity: 1, x: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.7, delay: i * 0.1 }}>
                        <div className = "text-2xl text-accent pt-1"> ✔️ </div>
                        <div>
                            <h3 className = "font-display text-2xl text-accent-highlight mb-2"> {s.emoji} {s.title} </h3>
                            <p className = "font-body leading-relaxed"> {s.desc} </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}

// DEFINICIÓN DEL COMPONENTE FormularioSection
function FormularioSection() {
    const { t } = useAppContext();
    const countdown = useCountdown('2025-09-10T00:00:00'); // La fecha a la que le hacemos la cuenta atrás.
    return (
        <Section id = "formulario" className = "gradient-bg-1">
            <SectionHeader title = {t('dossier.formularioTitulo')} />
            <div className = "medieval-card max-w-4xl mx-auto p-8 text-center">
                <p className = "text-lg mb-6" dangerouslySetInnerHTML = {{ __html: t('dossier.formularioDesc1') }} />
                <div className = "flex gap-3 sm:gap-4 flex-nowrap items-center justify-center my-8">
                    <div className = "font-display text-4xl p-4 medieval-card"> {countdown.days} <span className = "block text-sm"> DÍAS </span> </div>
                    <div className = "font-display text-4xl p-4 medieval-card"> {countdown.hours} <span className = "block text-sm"> HRS. </span> </div>
                    <div className = "font-display text-4xl p-4 medieval-card"> {countdown.minutes} <span className = "block text-sm">MIN. </span> </div>
                    <div className = "font-display text-4xl p-4 medieval-card"> {countdown.seconds} <span className = "block text-sm"> SEG. </span> </div>
                </div>
                <p className = "text-lg my-4"> {t('dossier.formularioDesc2')} </p>
                <ul className = "list-disc list-inside space-y-2 font-body text-left inline-block">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <li key = {i} dangerouslySetInnerHTML = {{ __html: t(`dossier.formularioLista.${i}`) }} />
                    ))}
                </ul>
                <p className = "mt-8 font-bold text-lg" dangerouslySetInnerHTML = {{ __html: t('dossier.formularioDesc3') }} />
            </div>
        </Section>
    );
}

// DEFINICIÓN DEL COMPONENTE ContactoFinalSection
function ContactoFinalSection() {
    const { t } = useAppContext();
    return (
        <Section id = "contacto-final" className = "gradient-bg-2">
            <div className = "grid md:grid-cols-2 gap-8 items-center medieval-card p-8">
                <motion.div initial = {{ opacity: 0, x: -50 }} whileInView = {{ opacity: 1, x: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.8 }}>
                    <SectionHeader title = {t('dossier.contactoTitulo')} />
                    <p className = "font-body text-lg leading-relaxed mb-4" dangerouslySetInnerHTML = {{ __html: t('dossier.contactoDesc1') }} />
                    <p className = "font-body text-lg leading-relaxed mb-6" dangerouslySetInnerHTML = {{ __html: t('dossier.contactoDesc2') }} />
                    <a href = "https://api.whatsapp.com/send/?phone=34689681114&text=Hola%21+Vengo+desde+la+web+de+Occasus+Kingdom.+Me+gustaria+info+sobre+proximas+ferias+y+actividades.&type=phone_number&app_absent=0" target = "_blank" rel = "noopener noreferrer" className = "btn-primary inline-block"> {t('dossier.contactoBtn')} </a>
                </motion.div>
                <motion.div initial = {{ opacity: 0, scale: 0.9 }} whileInView = {{ opacity: 1, scale: 1 }} viewport = {{ once: true }} transition = {{ duration: 0.8 }}>
                    <img src = "/galeria2.jpg" alt = "Caballero medieval señalando" className = "rounded-lg shadow-xl w-full h-auto object-cover"/>
                </motion.div>
            </div>
        </Section>
    );
}

// COMPONENTE PRINCIPAL DE LA PÁGINA
export function DossierPage() {
  return (
    <>
      <UneteSection />
      <SectionDivider />
      <PreciosSection />
      <SectionDivider />
      <ZonificacionSection />
      <SectionDivider />
      <ActividadesSection />
      <SectionDivider />
      <OfrecemosSection />
      <SectionDivider />
      <FormularioSection />
      <SectionDivider />
      <ContactoFinalSection />
    </>
  );
}