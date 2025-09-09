// IMPORTACIONES
import React, { useEffect, useMemo, useState, useContext, createContext } from 'react'; // Herramientas de React.
import { Outlet } from 'react-router-dom'; // Una pieza del router que dibuja la página actual (HomePage o DossierPage).
import { CONFIG } from './config'; // El archivo de configuración.
import esTranslations from './locales/es'; // Los textos en español.
import enTranslations from './locales/en'; // Los textos en inglés.
import { Navbar } from './components/Navbar'; // La barra de navegación.
import { Hero } from './components/Hero'; // La sección principal de la web.
import { Asistencia } from './components/Asistencia'; // La sección de asistencia.
import { InfoSection } from './components/InfoSection'; // La sección de información.
import { OrganizationSection } from './components/OrganizationSection'; // La sección de organización.
import { Schedule } from './components/Schedule'; // La sección del programa.
import { Guests } from './components/Guests'; // La sección de invitados.
import { Lore } from './components/Lore'; // La sección de la historia.
import { Gallery } from './components/Gallery'; // La sección de la galería.
import { VideoSection } from './components/VideoSection'; // La sección del vídeo.
import { FAQ } from './components/FAQ'; // La sección de preguntas frecuentes.
import { Map } from './components/Map'; // La sección del mapa.
import { Contact } from './components/Contact'; // La sección de contacto.
import { Footer } from './components/Footer'; // El pie de página.
import { SectionDivider } from './components/SectionDivider'; // El separador de secciones.
import { ScrollToTop } from './components/ScrollToTop'; // Para que la página suba arriba al navegar.

// DEFINICIÓN DE TIPOS
type Fecha = { year: number,
               month: number,
               day: number,
               hours: number,
               minutes: number
             };

// DEFINICIÓN DE HOOKS
const useCountdown = (fecha: Fecha) => {
  const fechaFinalUTC = useMemo(() => Date.UTC(fecha.year, fecha.month, fecha.day, fecha.hours, fecha.minutes), [fecha]);
  const [tiempoRestante, setTiempoRestante] = useState(fechaFinalUTC - Date.now());
  useEffect(() => {
    const timer = setInterval(() => setTiempoRestante(fechaFinalUTC - Date.now()), 1000);
    return () => clearInterval(timer);
  }, [fechaFinalUTC]);
  const ms = Math.max(0, tiempoRestante);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
};

// DEFINICIÓN DE OBJETOS
const translations = { es: esTranslations, en: enTranslations };
type Lang = keyof typeof translations;

// DEFINICIÓN DEL CONTEXTO
const AppContext = createContext<{ isDark: boolean; toggleTheme: () => void; lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string; }>({ isDark: true, toggleTheme: () => {}, lang: 'es', setLang: () => {}, t: (key) => key });
export const useAppContext = () => useContext(AppContext);

// DEFINICIÓN DEL COMPONENTE PROVEEDOR
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<Lang>('es');
  useEffect(() => { document.documentElement.classList.toggle('dark', isDark); localStorage.setItem('theme', isDark ? 'dark' : 'light'); }, [isDark]);
  useEffect(() => { localStorage.setItem('lang', lang); }, [lang]);
  const toggleTheme = () => setIsDark(prev => !prev);
  const t = useMemo(() => {
    const aplanarMensajes = (obj: any, prefijo = '') => Object.keys(obj).reduce((res: any, key) => {
      const valor = obj[key];
      const nuevaClave = prefijo ? `${prefijo}.${key}` : key;
      if (typeof valor === 'object' && valor !== null) Object.assign(res, aplanarMensajes(valor, nuevaClave));
      else res[nuevaClave] = valor;
      return res;
    }, {});
    const traduccionesAplanadas = aplanarMensajes(translations[lang]);
    return (key: string) => traduccionesAplanadas[key] || key;
  }, [lang]);
  return <AppContext.Provider value = {{ isDark, toggleTheme, lang, setLang, t }}> {children} </AppContext.Provider>;
};

// DEFINICIÓN DEL COMPONENTE DE LA PÁGINA DE INICIO
export function HomePage() {
  const { features } = CONFIG;
  const cuentaAtras = useCountdown(CONFIG.fechaEvento);
  return (
    <main>
      <Hero cuentaAtras = {cuentaAtras} />
      <SectionDivider />
      {features.tickets && <Asistencia />}
      <SectionDivider />
      <InfoSection />
      {features.organization && <><SectionDivider /><OrganizationSection /></>}
      {features.schedule && <><SectionDivider /><Schedule /></>}
      {features.guests && <><SectionDivider /><Guests /></>}
      {features.lore && <><SectionDivider /><Lore /></>}
      {features.gallery && <><SectionDivider /><Gallery /></>}
      <SectionDivider />
      <VideoSection />
      <SectionDivider />
      {features.faq && <FAQ />}
      <SectionDivider />
      {features.map && <Map />}
      <SectionDivider />
      {features.contact && <Contact />}
    </main>
  );
}

// DEFINICIÓN DEL COMPONENTE PRINCIPAL DE LA APLICACIÓN
function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <Navbar />
      <div className = "pt-20">
        <Outlet />
      </div>
      <Footer />
    </AppProvider>
  );
}
export default App;