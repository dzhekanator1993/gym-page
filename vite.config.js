import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: 'localhost', // Дозволяє доступ із мережі
    port: 3001, // Інший порт, щоб не конфліктувати з CRA
  },
});