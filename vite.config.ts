// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Esto permite que ngrok (y otros dispositivos en tu red) se conecten
    host: true, 
    
    // Aquí está la clave: damos permiso a ngrok
    allowedHosts: [
      // Añadimos el dominio de ngrok a la lista de hosts permitidos.
      // El punto al principio actúa como un comodín (*.ngrok-free.app)
      // para que funcione cada vez que reinicies ngrok, aunque te dé una URL diferente.
      '.ngrok-free.app'
    ]
  }
})