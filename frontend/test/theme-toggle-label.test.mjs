import test from 'node:test';
import assert from 'node:assert/strict';

import { getThemeToggleState } from '../lib/theme-toggle-label.js';

test('theme toggle label is deterministic before client theme is mounted', () => {
  const serverState = getThemeToggleState({
    locale: 'pt-BR',
    mounted: false,
    theme: undefined,
    resolvedTheme: undefined,
  });
  const firstClientState = getThemeToggleState({
    locale: 'pt-BR',
    mounted: false,
    theme: 'system',
    resolvedTheme: 'dark',
  });

  assert.equal(serverState.label, 'Alternar para tema escuro');
  assert.equal(firstClientState.label, serverState.label);
  assert.equal(firstClientState.nextTheme, serverState.nextTheme);
});

test('theme toggle label reflects the resolved theme after mount', () => {
  assert.deepEqual(
    getThemeToggleState({
      locale: 'pt-BR',
      mounted: true,
      theme: 'system',
      resolvedTheme: 'dark',
    }),
    {
      currentTheme: 'dark',
      nextTheme: 'light',
      label: 'Alternar para tema claro',
    },
  );

  assert.deepEqual(
    getThemeToggleState({
      locale: 'en',
      mounted: true,
      theme: 'system',
      resolvedTheme: 'light',
    }),
    {
      currentTheme: 'light',
      nextTheme: 'dark',
      label: 'Switch to dark theme',
    },
  );
});
