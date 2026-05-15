type Styles = Record<string, string>;

const cache = new Map<string, Styles>();

export function getStyle(cls: string): Styles | undefined {
  return cache.get(cls);
}

export function setStyle(cls: string, styles: Styles): void {
  cache.set(cls, styles);
}

export function clearCache(): void {
  cache.clear();
}

export function cacheSize(): number {
  return cache.size;
}
