// IMPORTACIONES
import { useState } from 'react'; // Para guardar información que cambia (el estado del menú móvil).
import { motion, AnimatePresence } from 'framer-motion'; // Animaciones (para el menú desplegable y los iconos).
import { Link, useLocation } from 'react-router-dom'; // Para crear enlaces entre páginas y saber en qué página estamos.
import { useAppContext } from '../App'; // Para usar el traductor y otras funciones globales.
import { CONFIG } from '../config'; // Archivo con datos fijos (nombre del evento, etc.).
import { Icon } from './Icon'; // Los dibujitos SVG (sol, luna, menú, etc.).
import { useManejaScroll } from '../hooks/useManejaScroll'; // La herramienta para el scroll suave.

// DEFINICIÓN DEL COMPONENTE
export function Navbar() {
  const { isDark, toggleTheme, lang, setLang, t } = useAppContext();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { manejarScrollSuave } = useManejaScroll();
  const location = useLocation();
  const esHomePage = location.pathname === '/';

  const linksVisibles = CONFIG.navLinks.filter(link => CONFIG.features[link.feature as keyof typeof CONFIG.features]);

  const clickEnLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (esHomePage) {
      manejarScrollSuave(e, href);
    } else {
      window.location.href = `/${href}`;
    }
    if (menuAbierto) setMenuAbierto(false);
  };

  return (
    <header className = "fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-background-alt/95 supports-[backdrop-filter]:bg-background-alt/80 border-b border-accent/20">
      <nav className = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        <Link to = "/" className = "font-display text-2xl text-accent font-bold title-glow min-w-0 flex-shrink">
          {CONFIG.eventName}
        </Link>

        <div className = "hidden lg:flex items-center gap-6 font-body">
          {linksVisibles.map((link) => {
            if (link.href.startsWith('/')) {
              return <Link key = {link.id} to = {link.href} className = "hover:text-accent transition-colors duration-300"> {t(`nav.${link.id}`)} </Link>;
            }
            return <a key = {link.id} href = {link.href} onClick = {(e) => clickEnLink(e, link.href)} className = "hover:text-accent transition-colors duration-300"> {t(`nav.${link.id}`)} </a>;
          })}
        </div>

        <div className = "flex items-center gap-4">
          <a href = {esHomePage ? CONFIG.ctaPrimaryUrl : '/#asistencia'} onClick = {(e) => esHomePage && clickEnLink(e, CONFIG.ctaPrimaryUrl)} className = "hidden sm:inline-block btn-primary"> {t('ctaPrimary')} </a>
          <div className = "relative"> <button onClick = {() => setLang(lang === 'es' ? 'en' : 'es')} className = "p-2 rounded-full border border-accent/30 hover:bg-accent/10 transition-colors uppercase font-bold text-sm"> {lang} </button> </div>
          <button aria-label = "Cambiar tema" onClick = {toggleTheme} className = "p-2 rounded-full border border-accent/30 hover:bg-accent/10 transition-colors">
            <AnimatePresence mode = "wait"> <motion.div key = {isDark ? 'moon' : 'sun'} initial = {{ opacity: 0, rotate: -90 }} animate = {{ opacity: 1, rotate: 0 }} exit = {{ opacity: 0, rotate: 90 }} transition = {{ duration: 0.3 }}> <span className = "text-accent"> {isDark ? <Icon.Sun className = "w-5 h-5" /> : <Icon.Moon className = "w-5 h-5" />} </span> </motion.div> </AnimatePresence>
          </button>
          <button className = "lg:hidden p-2" aria-label = "Abrir menú" onClick={() => setMenuAbierto(!menuAbierto)}> <Icon.Menu className="w-6 h-6 text-accent" /> </button>
        </div>
      </nav>
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial = {{ opacity: 0, height: 0 }}
            animate = {{ opacity: 1, height: 'auto' }}
            exit = {{ opacity: 0, height: 0 }}
            className = "lg:hidden overflow-hidden"
          >
            <div className = "px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-background-alt/95 backdrop-blur-sm max-h-[70vh] overflow-y-auto">
              {linksVisibles.map((link) => {
                if (link.href.startsWith('/')) {
                  return <Link key = {link.id} to = {link.href} onClick = {() => setMenuAbierto(false)} className = "block px-3 py-2 rounded-md text-base font-medium text-text-body hover:text-accent hover:bg-background">{t(`nav.${link.id}`)}</Link>;
                }
                return <a key = {link.id} href = {link.href} onClick = {(e) => clickEnLink(e, link.href)} className = "block px-3 py-2 rounded-md text-base font-medium text-text-body hover:text-accent hover:bg-background">{t(`nav.${link.id}`)}</a>;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}