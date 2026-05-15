import {
  borderRadiusScale,
  borderWidthScale,
  colors,
  fontFamilies,
  fontSizes,
  fontWeights,
  heightScale,
  letterSpacings,
  lineHeights,
  maxWidthScale,
  rotateValues,
  scaleValues,
  shadowScale,
  sizingScale,
  spacingScale,
  transitionDelayScale,
  transitionDurationScale,
  zIndexScale,
} from "../../utilities/src";

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
  colors: colors,
  fontSizes: fontSizes,
  fontWeights: fontWeights,
  lineHeights: lineHeights,
  letterSpacings: letterSpacings,
  fontFamilies: fontFamilies,
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
