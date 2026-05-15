import {
  spacingScale,
  colors,
  fontSizes, fontWeights, lineHeights, letterSpacings, fontFamilies,
  zIndexScale,
  borderWidthScale, borderRadiusScale,
  shadowScale,
  transitionDurationScale, transitionDelayScale,
  scaleValues, rotateValues,
  sizingScale, heightScale, maxWidthScale,
} from "@snapcss/utilities";

export interface SnapTheme {
  spacing?: Record<string, string>;
  colors?: Record<string, Record<string, string> | string>;
  fontSizes?: Record<string, string>;
  fontWeights?: Record<string, string>;
  lineHeights?: Record<string, string>;
  letterSpacings?: Record<string, string>;
  fontFamilies?: Record<string, string>;
  zIndex?: Record<string, string>;
  borderWidth?: Record<string, string>;
  borderRadius?: Record<string, string>;
  shadows?: Record<string, string>;
  transitionDuration?: Record<string, string>;
  transitionDelay?: Record<string, string>;
  scale?: Record<string, string>;
  rotate?: Record<string, string>;
  sizing?: Record<string, string>;
  heights?: Record<string, string>;
  maxWidths?: Record<string, string>;
}

export const defaultTheme: SnapTheme = {
  spacing: spacingScale,
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  fontFamilies,
  zIndex: zIndexScale,
  borderWidth: borderWidthScale,
  borderRadius: borderRadiusScale,
  shadows: shadowScale,
  transitionDuration: transitionDurationScale,
  transitionDelay: transitionDelayScale,
  scale: scaleValues,
  rotate: rotateValues,
  sizing: sizingScale,
  heights: heightScale,
  maxWidths: maxWidthScale,
};
