import { defaultTheme, SnapTheme } from "./default";

let activeTheme: SnapTheme = { ...defaultTheme };

export function configure(overrides: { theme?: Partial<SnapTheme> }): void {
  if (!overrides.theme) return;

  const t = overrides.theme;
  activeTheme = {
    ...defaultTheme,
    ...t,
    spacing: t.spacing ? { ...defaultTheme.spacing, ...t.spacing } : defaultTheme.spacing,
    colors: t.colors ? { ...defaultTheme.colors, ...t.colors } : defaultTheme.colors,
    fontSizes: t.fontSizes ? { ...defaultTheme.fontSizes, ...t.fontSizes } : defaultTheme.fontSizes,
    fontWeights: t.fontWeights ? { ...defaultTheme.fontWeights, ...t.fontWeights } : defaultTheme.fontWeights,
    shadows: t.shadows ? { ...defaultTheme.shadows, ...t.shadows } : defaultTheme.shadows,
  };
}

export function getTheme(): SnapTheme {
  return activeTheme;
}

export function resetTheme(): void {
  activeTheme = { ...defaultTheme };
}
