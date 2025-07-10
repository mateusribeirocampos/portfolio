const { i18n } = require('./next-i18next.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // Habilita ESLint durante builds para garantir qualidade do código
  },
  images: { 
    unoptimized: true // Mantém imagens não otimizadas para compatibilidade com Vercel
  },
  i18n,
  
  // Headers de segurança para proteger contra ataques comuns
  async headers() {
    return [
      {
        // Aplica headers de segurança a todas as rotas
        source: '/(.*)',
        headers: [
          {
            // Previne ataques de clickjacking
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            // Previne ataques MIME-type sniffing
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Força HTTPS no navegador por 1 ano
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            // Controla referrer information
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            // Habilita proteção XSS do navegador
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            // Content Security Policy - Política rigorosa de segurança
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'", // Permite apenas recursos do próprio domínio
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com", // Scripts permitidos (inclui Google AdSense)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Estilos permitidos (inclui Google Fonts)
              "font-src 'self' https://fonts.gstatic.com", // Fontes permitidas (Google Fonts)
              "img-src 'self' data: https:", // Imagens de qualquer HTTPS e data URIs
              "connect-src 'self' https://vercel-insights.com", // Conexões para analytics
              "frame-ancestors 'none'", // Previne embedding em iframes
              "object-src 'none'", // Bloqueia objetos perigosos
              "base-uri 'self'", // Restringe URLs base
              "form-action 'self'", // Restringe envio de formulários
              "upgrade-insecure-requests" // Força upgrade para HTTPS
            ].join('; ')
          },
          {
            // Permissions Policy - Controla APIs do navegador
            key: 'Permissions-Policy',
            value: [
              'camera=()', // Bloqueia acesso à câmera
              'microphone=()', // Bloqueia acesso ao microfone
              'geolocation=()', // Bloqueia acesso à localização
              'payment=()', // Bloqueia APIs de pagamento
              'usb=()', // Bloqueia acesso USB
              'magnetometer=()', // Bloqueia magnetômetro
              'accelerometer=()', // Bloqueia acelerômetro
              'gyroscope=()' // Bloqueia giroscópio
            ].join(', ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;