import { SnapTheme } from '@snapcss/themes';
export { configure } from '@snapcss/themes';

declare function clearCache(): void;

interface SnapCSSOptions {
    theme?: Partial<SnapTheme>;
}
declare function init(options?: SnapCSSOptions): void;

export { type SnapCSSOptions, clearCache, init };
