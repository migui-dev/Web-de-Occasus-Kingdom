// IMPORTACIONES
import { useState } from 'react'; // Para guardar información que cambia (lo que el usuario escribe).
import { motion } from 'framer-motion'; // Animaciones.
import { useAppContext } from '../App'; // Para usar el traductor y otras cosas globales.
import { Section } from './Section'; // Plantilla para una sección.
import { SectionHeader } from './SectionHeader'; // Plantilla para el título de una sección.
import { Icon } from './Icon'; // Los dibujitos SVG (teléfono, sobre).
import { CONFIG } from '../config'; // Archivo con datos fijos como números de teléfono.

// DEFINICIÓN DEL COMPONENTE
export function Contact() {
  const { t } = useAppContext(); // Usamos la herramienta 't' para traducir textos.
  const [datosForm, setDatosForm] = useState({ name: '', email: '', message: '' }); // Aquí guardamos lo que el usuario escribe en el formulario.
  const [estado, setEstado] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle'); // Para saber el estado del formulario (normal, enviando, éxito o error).

  // Esta función se ejecuta cada vez que el usuario escribe una letra en un campo.
  function manejarCambio(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) { 
    setDatosForm({ ...datosForm, [e.target.name]: e.target.value }); 
  };

  // Esta función se ejecuta cuando el usuario le da al botón de enviar.
  function manejarEnvio(e: React.FormEvent) {
    e.preventDefault(); // Evita que la página se recargue al enviar.
    setEstado('submitting'); // Cambiamos el estado a "enviando".
    
    // Simulamos un envío que tarda 1.5 segundos.
    setTimeout(() => { 
      console.log('Formulario enviado:', datosForm); // Muestra en la consola del navegador lo que se envió.
      setEstado('success'); // Cambiamos el estado a "éxito".
      setDatosForm({ name: '', email: '', message: '' }); // Limpiamos los campos del formulario.
      
      // Después de 5 segundos, el mensaje de éxito desaparece.
      setTimeout(() => setEstado('idle'), 5000); 
    }, 1500);
  };

  return (
    <Section id = "contacto" className = "gradient-bg-2">
      <SectionHeader title = {t('contact.title')} />

      {/* SECCIÓN CON LOS ENLACES DE CONTACTO (TELÉFONO Y EMAIL) */}
      <div className = "max-w-2xl mx-auto mb-12 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          
          {/* Enlace para el teléfono */}
          <motion.a 
            href = {CONFIG.contactInfo.phoneLink} 
            className = "group" 
            initial = {{ opacity: 0, x: -20 }} 
            whileInView = {{ opacity: 1, x: 0 }} 
            viewport = {{ once: true }} 
            transition = {{ duration: 0.5, delay: 0.1 }}
          >
            <div className = "flex items-center justify-center gap-4">
              <span className = "p-4 rounded-full bg-background-alt border border-accent/20 group-hover:text-accent transition-colors">
                <Icon.Phone className = "w-6 h-6"/>
              </span>
              <span> {CONFIG.contactInfo.phone} </span>
            </div>
          </motion.a>

          {/* Enlace para el email */}
          <motion.a 
            href = {CONFIG.contactInfo.emailLink} 
            className = "group" 
            initial = {{ opacity: 0, x: 20 }} 
            whileInView = {{ opacity: 1, x: 0 }} 
            viewport = {{ once: true }} 
            transition = {{ duration: 0.5, delay: 0.2 }}
          >
            <div className = "flex items-center justify-center gap-4">
              <span className = "p-4 rounded-full bg-background-alt border border-accent/20 group-hover:text-accent transition-colors">
                <Icon.Envelope className = "w-6 h-6"/>
              </span>
              <span> {CONFIG.contactInfo.email} </span>
            </div>
          </motion.a>
      </div>
      
      {/* SECCIÓN DEL FORMULARIO */}
      <div className = "max-w-2xl mx-auto">
        <p className = "text-center mb-6"> {t('contact.formMessage')} </p>
        
        <form className = "space-y-4 font-body" onSubmit = {manejarEnvio}>
          <motion.input required type = "text" name = "name" placeholder = {t('contact.namePlaceholder')} className = "form-input" value = {datosForm.name} onChange = {manejarCambio} initial = {{ opacity: 0, x: -20 }} whileInView = {{ opacity: 1, x: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.5, delay: 0.3 }} />
          <motion.input required type = "email" name = "email" placeholder = {t('contact.emailPlaceholder')} className = "form-input" value = {datosForm.email} onChange = {manejarCambio} initial = {{ opacity: 0, x: 20 }} whileInView = {{ opacity: 1, x: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.5, delay: 0.4 }} />
          <motion.textarea required name = "message" placeholder = {t('contact.messagePlaceholder')} className = "form-input" rows = {5} value = {datosForm.message} onChange = {manejarCambio} initial = {{ opacity: 0, y: 20 }} whileInView = {{ opacity: 1, y: 0 }} viewport = {{ once: true }} transition = {{ duration: 0.5, delay: 0.5 }}></motion.textarea>
          
          <motion.button 
            type = "submit" 
            className = "btn-primary w-full" 
            disabled = {estado === 'submitting'} 
            initial = {{ opacity: 0, y: 20 }} 
            whileInView = {{ opacity: 1, y: 0 }} 
            viewport = {{ once: true }} 
            transition = {{ duration: 0.5, delay: 0.6 }}
          >
            {/* Si el estado es "enviando", muestra un texto; si no, muestra el otro. */}
            {estado === 'submitting' ? t('contact.submitting') : t('contact.submitButton')}
          </motion.button>
          
          {/* Si el estado es "éxito", muestra el mensaje de éxito. */}
          {estado === 'success' && <p className = "text-center text-green-400 mt-4"> {t('contact.success')} </p>}
          
          {/* Si el estado es "error", muestra el mensaje de error. */}
          {estado === 'error' && <p className = "text-center text-red-400 mt-4"> {t('contact.error')} </p>}
        </form>
      </div>
    </Section>
  );
}