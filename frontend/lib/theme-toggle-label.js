function normalizeTheme(value) {
  return value === 'dark' ? 'dark' : 'light';
}

/**
 * @param {{
 *   locale?: string;
 *   mounted?: boolean;
 *   theme?: string;
 *   resolvedTheme?: string;
 * }} [options]
 */
export function getThemeToggleState(options = {}) {
  const {
    locale = 'en',
    mounted = false,
    theme,
    resolvedTheme,
  } = options;
  const currentTheme = mounted
    ? normalizeTheme(resolvedTheme || theme)
    : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const isPortuguese = locale === 'pt-BR';

  return {
    currentTheme,
    nextTheme,
    label: isPortuguese
      ? `Alternar para tema ${nextTheme === 'light' ? 'claro' : 'escuro'}`
      : `Switch to ${nextTheme} theme`,
  };
}
