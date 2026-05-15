export const sizingScale: Record<string, string> = {
  "0": "0px", "1": "2px", "2": "4px", "3": "8px", "4": "16px",
  "5": "32px", "6": "48px", "7": "64px", "8": "96px", "9": "128px",
  "10": "160px", "11": "192px", "12": "224px", "14": "256px",
  "16": "320px", "20": "384px", "24": "448px", "28": "512px",
  "32": "576px", px: "1px", auto: "auto",
  "1/2": "50%", "1/3": "33.333%", "2/3": "66.667%",
  "1/4": "25%", "2/4": "50%", "3/4": "75%",
  "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%",
  "1/6": "16.667%", "5/6": "83.333%",
  full: "100%", screen: "100vw", svw: "100svw",
  min: "min-content", max: "max-content", fit: "fit-content",
};

export const heightScale: Record<string, string> = {
  ...sizingScale,
  screen: "100vh", svh: "100svh", dvh: "100dvh",
};

export const maxWidthScale: Record<string, string> = {
  none: "none", "0": "0rem",
  xs: "320px", sm: "384px", md: "448px", lg: "512px",
  xl: "576px", "2xl": "672px", "3xl": "768px", "4xl": "896px",
  "5xl": "1024px", "6xl": "1152px", "7xl": "1280px",
  full: "100%", min: "min-content", max: "max-content", fit: "fit-content",
  prose: "65ch", "screen-sm": "640px", "screen-md": "768px",
  "screen-lg": "1024px", "screen-xl": "1280px", "screen-2xl": "1536px",
};
