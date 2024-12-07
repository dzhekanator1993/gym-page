import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Завантажуємо всі змінні
  return {
    define: {
      'import.meta.env': env,
    },
  };
});