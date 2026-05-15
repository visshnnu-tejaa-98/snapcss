export const transitionPropertyValues: Record<string, string> = {
  DEFAULT:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  all: "all",
  colors:
    "color, background-color, border-color, text-decoration-color, fill, stroke",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform",
  none: "none",
};

export const transitionDurationScale: Record<string, string> = {
  "0": "0ms",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "300": "300ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms",
};

export const transitionTimingValues: Record<string, string> = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
};

export const transitionDelayScale: Record<string, string> = {
  "0": "0ms",
  "75": "75ms",
  "100": "100ms",
  "150": "150ms",
  "200": "200ms",
  "300": "300ms",
  "500": "500ms",
  "700": "700ms",
  "1000": "1000ms",
};
