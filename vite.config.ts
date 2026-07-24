import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = env.PORT ? parseInt(env.PORT, 10) : 3000;
  const proxyTarget = env.VITE_PROXY_TARGET || 'https://api.giaoly.cmate.vn';

  return {
    plugins: [react()],
    server: {
      port,
      // Same-origin /api so BE Set-Cookie (guest_identifier) works locally without BE changes
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          cookieDomainRewrite: 'localhost',
        },
      },
    },
    preview: {
      port,
      allowedHosts: ['giaoly.cmate.vn'],
    },
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@context': path.resolve(__dirname, './src/context'),
        '@theme': path.resolve(__dirname, './src/theme'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@hooks': path.resolve(__dirname, './src/hooks'),
        '@config': path.resolve(__dirname, './src/config'),
        '@services': path.resolve(__dirname, './src/services'),
        '@constants': path.resolve(__dirname, './src/constants'),
        '@styles': path.resolve(__dirname, './src/styles'),
        '@interfaces': path.resolve(__dirname, './src/interfaces'),
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
