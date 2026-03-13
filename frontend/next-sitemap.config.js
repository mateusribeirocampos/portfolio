/** @type {import('next-sitmap').IConfig} */
const config = {
  siteUrl: 'https://portfolio-mateusribeirocampos.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin', '/admin/*'],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/'),
    await config.transform(config, '/about'),
    await config.transform(config, '/blog'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/projects'),
  ],
};

export default config;
