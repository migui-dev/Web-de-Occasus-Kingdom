// IMPORTACIONES
import React, { useEffect, useRef } from 'react'; // Herramientas de React para efectos y referencias.
import { motion } from 'framer-motion'; // Animaciones.
import { Link } from 'react-router-dom'; // Para crear enlaces entre páginas.
import { useAppContext } from '../App'; // Para usar el traductor y otras cosas globales.
import { CONFIG } from '../config'; // Archivo con datos fijos (nombre del evento, etc.).
import { Icon } from './Icon'; // Los dibujitos SVG (calendario, mapa).
import { useManejaScroll } from '../hooks/useManejaScroll'; // La herramienta para el scroll suave.

// COMPONENTE PARA CADA CUADRADO DEL CONTADOR
const ItemContador = ({ valor, label }: { valor: number; label: string; }) => (
  <div className = "px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border border-accent/20 min-w-[80px] text-center shadow-lg">
    <div className = "text-4xl font-display tabular-nums text-accent text-glow"> {valor} </div>
    <div className = "text-xs tracking-wider uppercase font-body"> {label} </div>
  </div>
);

// DEFINICIÓN DE TIPOS
type CountdownProps = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

// DEFINICIÓN DEL COMPONENTE PRINCIPAL
export function Hero({ cuentaAtras }: { cuentaAtras: CountdownProps }) {
  const { t } = useAppContext();
  const { manejarScrollSuave } = useManejaScroll();
  const sparkContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sparkContainerRef.current; // Coge el div de las chispas.
    if (!container) return; // Si no lo encuentra, no hace nada.
    const numSparks = 30; // El número de chispas que queremos.
    container.innerHTML = ''; // Limpia chispas anteriores por si acaso.
    
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
    <section id = "inicio" className = "relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className = "absolute inset-0 bg-cover bg-center opacity-10" style = {{ backgroundImage: `url(/galeria0.jpg)` }} />

      <div className = "absolute inset-0 hero-gradient-overlay z-[-1]" />

      <div ref = {sparkContainerRef} className = "spark-container" />

      <div className = "relative text-center py-24 px-4">
        <motion.div initial = {{ opacity: 0, y: 20 }} animate = {{ opacity: 1, y: 0 }} transition = {{ duration: 0.8 }}>
          <h1 className = "text-6xl sm:text-7xl lg:text-8xl font-display leading-tight text-glow-subtle text-accent spark-effect"> {CONFIG.eventName} </h1>
          <p className = "mt-4 text-lg sm:text-xl max-w-3xl mx-auto font-body"> {t('tagline')} </p>
          <div className = "mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm font-body">
            <span className = "inline-flex items-center gap-2 text-accent"> <Icon.Calendar className = "w-5 h-5" /> <span> {t('dateLabel')} </span> </span>
            <span className = "inline-flex items-center gap-2 text-accent"> <Icon.MapPin className = "w-5 h-5" /> <span> {t('locationLabel')} </span> </span>
          </div>
        </motion.div>

        <motion.div className = "mt-10" initial = {{ opacity: 0, y: 20 }} animate = {{ opacity: 1, y: 0 }} transition = {{ duration: 0.8, delay: 0.2 }}>
          <div aria-live = "polite" className = "flex gap-3 sm:gap-4 flex-nowrap items-center justify-center">
            <ItemContador label = {t('countdown.days')} valor = {cuentaAtras.days} />
            <ItemContador label = {t('countdown.hours')} valor = {cuentaAtras.hours} />
            <ItemContador label = {t('countdown.minutes')} valor = {cuentaAtras.minutes} />
            <ItemContador label = {t('countdown.seconds')} valor = {cuentaAtras.seconds} />
          </div>
        </motion.div>

        <motion.div className = "mt-10 flex flex-wrap justify-center gap-4" initial = {{ opacity: 0, y: 20 }} animate = {{ opacity: 1, y: 0 }} transition = {{ duration: 0.8, delay: 0.4 }}>
          <a href = {CONFIG.ctaPrimaryUrl} onClick = {(e) => manejarScrollSuave(e, CONFIG.ctaPrimaryUrl)} className = "btn-primary"> {t('heroButtons.confirmAttendance')} </a>
          <a href = {CONFIG.ctaSecondaryUrl} onClick = {(e) => manejarScrollSuave(e, CONFIG.ctaSecondaryUrl)} className = "btn-outline"> {t('heroButtons.viewSchedule')} </a>
          {CONFIG.features.dossier && (
            <Link to = "/dossier" className = "btn-outline"> {t('heroButtons.viewDossier')} </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}