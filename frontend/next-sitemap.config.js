/** @type {import('next-sitmap').IConfig} */
const config = {
  siteUrl: 'https://portfolio-mateusribeirocampos.vercel.app',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: [],
  alternateRefs: [
    {
      href: 'https://portfolio-mateusribeirocampos.vercel.app',
      hreflang: 'pt-br',
    },
    {
      href: 'https://portfolio-mateusribeirocampos.vercel.app',
      hreflang: 'en-us',
    },
  ],
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs,
    }
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/pt'),
    await config.transform(config, '/pt/about'),
    await config.transform(config, '/pt/blog'),
    await config.transform(config, '/pt/contact'),
    await config.transform(config, '/pt/projects'),
    await config.transform(config, '/en'),
    await config.transform(config, '/en/about'),
    await config.transform(config, '/en/blog'),
    await config.transform(config, '/en/contact'),
    await config.transform(config, '/en/projects'),
  ],
};

export default config;