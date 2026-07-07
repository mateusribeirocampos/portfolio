/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://portfolio-mateusribeirocampos.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*'],
  // No lastmod: build time is not a real modification date, and a fake one
  // makes Google trust the sitemap less.
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/projects'),
    await config.transform(config, '/pt-BR'),
    await config.transform(config, '/pt-BR/about'),
    await config.transform(config, '/pt-BR/blog'),
    await config.transform(config, '/pt-BR/contact'),
    await config.transform(config, '/pt-BR/projects'),
  ],
};

export default config;
