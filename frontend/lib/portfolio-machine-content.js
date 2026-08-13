const labels = {
  en: {
    role: 'Backend Developer',
    language: 'English',
    profile: 'Profile',
    focus: 'How I work',
    stack: 'Core capabilities',
    experience: 'Experience',
    featuredProjects: 'Featured projects',
    otherProjects: 'Additional projects',
    education: 'Education',
    contact: 'Contact',
    type: 'Type',
    status: 'Status',
    architecture: 'Architecture',
    evidence: 'Engineering evidence',
    technologies: 'Technologies',
    source: 'Source code',
    demo: 'Live product',
    period: 'Period',
    organization: 'Organization',
  },
  'pt-BR': {
    role: 'Desenvolvedor Backend',
    language: 'Português do Brasil',
    profile: 'Perfil',
    focus: 'Como atuo',
    stack: 'Competências principais',
    experience: 'Experiência',
    featuredProjects: 'Projetos em destaque',
    otherProjects: 'Projetos complementares',
    education: 'Formação',
    contact: 'Contato',
    type: 'Tipo',
    status: 'Status',
    architecture: 'Arquitetura',
    evidence: 'Evidências técnicas',
    technologies: 'Tecnologias',
    source: 'Código-fonte',
    demo: 'Produto online',
    period: 'Período',
    organization: 'Organização',
  },
};

const contact = {
  github: 'https://github.com/mateusribeirocampos',
  linkedin: 'https://www.linkedin.com/in/mateus-ribeiro-de-campos-6a135331/',
};

function resolveLabels(locale) {
  return labels[locale === 'pt-BR' ? 'pt-BR' : 'en'];
}

function markdownList(items) {
  return items.map((item) => '- ' + item).join('\n');
}

function projectMarkdown(project, locale, copy) {
  const lines = [
    '### ' + project.title,
    '',
    project.description[locale],
    '',
    '- **' + copy.type + ':** ' + project.kind[locale],
    '- **' + copy.status + ':** ' + project.status[locale],
  ];

  if (project.architecture?.length) {
    lines.push('- **' + copy.architecture + ':** ' + project.architecture.join(' -> '));
  }

  lines.push('- **' + copy.technologies + ':** ' + project.tags.join(', '));

  if (project.evidence?.length) {
    lines.push('', '**' + copy.evidence + '**', '');
    lines.push(
      markdownList(
        project.evidence.map(
          (item) => '**' + item.label[locale] + ':** ' + item.value[locale],
        ),
      ),
    );
  }

  if (project.github) {
    lines.push('', '- [' + copy.source + '](' + project.github + ')');
  }

  if (project.demo) {
    lines.push('- [' + copy.demo + '](' + project.demo + ')');
  }

  return lines.join('\n');
}

export function buildPortfolioMarkdown({
  locale = 'en',
  siteUrl,
  about,
  projects,
}) {
  const resolvedLocale = locale === 'pt-BR' ? 'pt-BR' : 'en';
  const copy = resolveLabels(resolvedLocale);
  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => (a.featuredOrder ?? 0) - (b.featuredOrder ?? 0));
  const additional = projects.filter((project) => !project.featured);
  const skillGroups = Object.values(about.skills).filter(
    (value) => value && typeof value === 'object' && 'title' in value,
  );
  const education = [
    about.education.computerScience,
    about.education.doctorate,
    about.education.masters,
    about.education.agronomy,
  ];

  return [
    '# Mateus R. Campos — ' + copy.role,
    '',
    '> ' + about.subtitle,
    '',
    '- **Canonical:** ' + siteUrl,
    '- **Language:** ' + copy.language + ' (' + resolvedLocale + ')',
    '- **Machine-readable source:** ' + siteUrl + '/portfolio.md?lang=' + resolvedLocale,
    '',
    '## ' + copy.profile,
    '',
    about.hero.description,
    '',
    '## ' + copy.focus,
    '',
    about.focus.items
      .map((item) => '### ' + item.title + '\n\n' + item.description)
      .join('\n\n'),
    '',
    '## ' + copy.stack,
    '',
    markdownList(
      skillGroups.map((skill) => '**' + skill.title + ':** ' + skill.description),
    ),
    '',
    '## ' + copy.experience,
    '',
    about.experience.items
      .map((item) =>
        [
          '### ' + item.role,
          '',
          '- **' + copy.organization + ':** ' + item.organization,
          '- **' + copy.period + ':** ' + item.period,
          '',
          item.summary,
          '',
          markdownList(item.bullets),
        ].join('\n'),
      )
      .join('\n\n'),
    '',
    '## ' + copy.featuredProjects,
    '',
    featured.map((project) => projectMarkdown(project, resolvedLocale, copy)).join('\n\n'),
    '',
    '## ' + copy.otherProjects,
    '',
    additional.map((project) => projectMarkdown(project, resolvedLocale, copy)).join('\n\n'),
    '',
    '## ' + copy.education,
    '',
    markdownList(
      education.map((item) => '**' + item.title + ':** ' + item.description),
    ),
    '',
    '## ' + copy.contact,
    '',
    '- **Contact form:** ' + siteUrl + (resolvedLocale === 'pt-BR' ? '/pt-BR/contact' : '/contact'),
    '- **GitHub:** ' + contact.github,
    '- **LinkedIn:** ' + contact.linkedin,
    '- **Website:** ' + siteUrl,
    '',
  ].join('\n');
}

export function buildLlmsText({ locale = 'en', siteUrl, about }) {
  const resolvedLocale = locale === 'pt-BR' ? 'pt-BR' : 'en';
  const copy = resolveLabels(resolvedLocale);
  const prefix = resolvedLocale === 'pt-BR' ? '/pt-BR' : '';

  return [
    '# Mateus R. Campos — ' + copy.role,
    '',
    '> ' + about.subtitle,
    '',
    '## Machine-readable portfolio',
    '',
    '- [Full portfolio in Markdown](' + siteUrl + '/portfolio.md?lang=' + resolvedLocale + ')',
    '',
    '## Human-readable pages',
    '',
    '- [Home](' + siteUrl + prefix + ')',
    '- [Projects](' + siteUrl + prefix + '/projects)',
    '- [About](' + siteUrl + prefix + '/about)',
    '- [Blog](' + siteUrl + prefix + '/blog)',
    '- [Contact](' + siteUrl + prefix + '/contact)',
    '',
    '## Contact',
    '',
    '- Contact form: ' + siteUrl + prefix + '/contact',
    '- GitHub: ' + contact.github,
    '- LinkedIn: ' + contact.linkedin,
    '',
  ].join('\n');
}
