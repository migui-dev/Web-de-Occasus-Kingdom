// IMPORTACIONES
import { useAppContext } from '../App'; // Para usar el traductor.
import { CONFIG } from '../config'; // Archivo con datos fijos como el nombre del evento y las redes sociales.
import { SOCIAL_ICONS } from './Icon'; // Los dibujitos SVG de las redes sociales.

// DEFINICIÓN DEL COMPONENTE
export function Footer() {
  const { t } = useAppContext();

  return (
    <footer className = "bg-background-alt/50 border-t border-accent/20 py-10 mt-10">
      <div className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        <div className = "font-display text-2xl text-accent text-glow"> {CONFIG.eventName} </div>
        <div className = "flex gap-6">
          {Object.entries(CONFIG.social).map(([key, url]) => {
            const IconoSocial = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
            if (IconoSocial) {
              return (
                <a
                  key = {key}
                  href = {url}
                  target = "_blank"
                  rel = "noopener noreferrer"
                  aria-label = {`Visita nuestro ${key}`}
                  className = "hover:text-accent hover:scale-110 transition-all duration-300"
                >
                  <IconoSocial className = "w-6 h-6" />
                </a>
              )
            }
            return null;
          })}
        </div>

        <p className = "text-sm font-body opacity-70"> © {new Date().getFullYear()} {t('footer.copyright')} </p>
      </div>
    </footer>
  );
}