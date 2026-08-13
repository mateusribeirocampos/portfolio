import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  buildLlmsText,
  buildPortfolioMarkdown,
} from '../lib/portfolio-machine-content.js';

const localeRoot = new URL('../public/locales/', import.meta.url);

async function readLocalePage(locale, page) {
  const source = await readFile(new URL(locale + '/' + page + '.json', localeRoot), 'utf8');
  return JSON.parse(source);
}

function getShape(value) {
  if (Array.isArray(value)) {
    return value.map(getShape);
  }

  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [key, getShape(child)]),
    );
  }

  return typeof value;
}

test('home copy exposes the same contract in English and Portuguese', async () => {
  const [english, portuguese] = await Promise.all([
    readLocalePage('en', 'home'),
    readLocalePage('pt-BR', 'home'),
  ]);

  assert.deepEqual(getShape(english.home), getShape(portuguese.home));
  assert.match(english.home.title, /backend/i);
  assert.match(portuguese.home.title, /backend/i);
});

test('projects copy exposes the same contract in English and Portuguese', async () => {
  const [english, portuguese] = await Promise.all([
    readLocalePage('en', 'projects'),
    readLocalePage('pt-BR', 'projects'),
  ]);

  assert.deepEqual(getShape(english.projects), getShape(portuguese.projects));
  assert.equal(typeof english.projects.architectureLabel, 'string');
  assert.equal(typeof portuguese.projects.evidenceLabel, 'string');
});

test('machine-readable portfolio excludes direct contact and credential-shaped data', async () => {
  const about = (await readLocalePage('pt-BR', 'about')).about;
  const project = {
    slug: 'example',
    title: 'Example API',
    kind: { en: 'Backend API', 'pt-BR': 'API backend' },
    status: { en: 'Public', 'pt-BR': 'Público' },
    description: {
      en: 'An API example.',
      'pt-BR': 'Um exemplo de API.',
    },
    tags: ['Java', 'Spring Boot'],
    architecture: ['REST API', 'Service', 'PostgreSQL'],
    evidence: [],
    featured: true,
    featuredOrder: 1,
  };
  const options = {
    locale: 'pt-BR',
    siteUrl: 'https://portfolio.example',
    about,
    projects: [project],
  };
  const portfolio = buildPortfolioMarkdown(options);
  const llms = buildLlmsText(options);
  const machineContent = portfolio + '\n' + llms;

  assert.doesNotMatch(machineContent, /[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  assert.doesNotMatch(
    machineContent,
    /(JWT_SECRET|DATABASE_URL|ADMIN_PASSWORD|ALLOW_USER_ADMIN)/i,
  );
  assert.match(machineContent, /https:\/\/portfolio\.example\/pt-BR\/contact/);
  assert.match(portfolio, /REST API -> Service -> PostgreSQL/);
});
