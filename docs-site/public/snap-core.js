"use strict";
var SnapCore = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // packages/core/src/index.ts
  var src_exports = {};
  __export(src_exports, {
    clearCache: () => clearCache,
    configure: () => configure,
    init: () => init
  });

  // packages/parser/src/tokenizer.ts
  function tokenize(cls) {
    const withoutPrefix = cls;
    const tokens = [];
    let current = "";
    let inBracket = false;
    for (const char of withoutPrefix) {
      if (char === "[") {
        inBracket = true;
        current += char;
      } else if (char === "]") {
        inBracket = false;
        current += char;
      } else if (char === "-" && !inBracket) {
        if (current) tokens.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    if (current) tokens.push(current);
    return tokens;
  }

  // packages/parser/src/modifier.ts
  var BREAKPOINTS = /* @__PURE__ */ new Set(["sm", "md", "lg", "xl", "2xl"]);
  var STATES = /* @__PURE__ */ new Set(["hover", "focus", "active", "focus-visible"]);
  var STRUCTURAL = /* @__PURE__ */ new Set(["disabled", "first", "last", "odd", "even"]);
  function extractModifier(cls) {
    const withoutPrefix = cls;
    const colonIdx = withoutPrefix.indexOf(":");
    if (colonIdx === -1) return { modifier: null, rest: withoutPrefix };
    const prefix = withoutPrefix.slice(0, colonIdx);
    const rest = withoutPrefix.slice(colonIdx + 1);
    if (BREAKPOINTS.has(prefix)) {
      return { modifier: { type: "responsive", breakpoint: prefix }, rest };
    }
    if (STATES.has(prefix)) {
      return { modifier: { type: "state", state: prefix }, rest };
    }
    if (STRUCTURAL.has(prefix)) {
      return { modifier: { type: "structural", kind: prefix }, rest };
    }
    if (prefix === "dark") {
      return { modifier: { type: "dark" }, rest };
    }
    if (prefix === "group-hover") {
      return { modifier: { type: "group", kind: "group-hover" }, rest };
    }
    return { modifier: null, rest: withoutPrefix };
  }

  // packages/parser/src/arbitrary.ts
  function isArbitrary(value) {
    return value.startsWith("[") && value.endsWith("]");
  }
  function extractArbitrary(value) {
    return value.slice(1, -1).replace(/_/g, " ");
  }

  // packages/parser/src/parser.ts
  var MULTI_TOKEN_UTILITIES = [
    "grid-cols",
    "grid-rows",
    "grid-flow",
    "auto-cols",
    "auto-rows",
    "col-span",
    "col-start",
    "col-end",
    "row-span",
    "row-start",
    "row-end",
    "place-items",
    "place-content",
    "place-self",
    "border-t",
    "border-b",
    "border-l",
    "border-r",
    "border-x",
    "border-y",
    "rounded-tl",
    "rounded-tr",
    "rounded-bl",
    "rounded-br",
    "rounded-t",
    "rounded-b",
    "rounded-l",
    "rounded-r",
    "inset-x",
    "inset-y",
    "gap-x",
    "gap-y",
    "space-x",
    "space-y",
    "max-w",
    "min-w",
    "max-h",
    "min-h",
    "overflow-x",
    "overflow-y",
    "translate-x",
    "translate-y",
    "scale-x",
    "scale-y",
    "skew-x",
    "skew-y",
    "flex-row",
    "flex-col",
    "flex-wrap",
    "font-sans",
    "font-serif",
    "font-mono",
    "bg-cover",
    "bg-contain",
    "bg-auto",
    "bg-center",
    "bg-top",
    "bg-bottom",
    "bg-left",
    "bg-right",
    "bg-no-repeat",
    "bg-repeat",
    "bg-fixed",
    "bg-local",
    "bg-scroll",
    "bg-left-top",
    "bg-right-top",
    "bg-left-bottom",
    "bg-right-bottom",
    "bg-repeat-x",
    "bg-repeat-y",
    "text-left",
    "text-center",
    "text-right",
    "text-justify",
    "text-ellipsis",
    "text-clip",
    "object-cover",
    "object-contain",
    "object-fill",
    "object-none",
    "object-scale-down",
    "object-center",
    "object-top",
    "object-bottom",
    "object-left",
    "object-right",
    "object-left-top",
    "object-right-top",
    "object-left-bottom",
    "object-right-bottom",
    "outline-none",
    "outline-offset",
    "aspect-square",
    "aspect-video",
    "aspect-auto",
    "line-clamp",
    "flex-1",
    "flex-auto",
    "flex-initial",
    "flex-none",
    "grow-0",
    "shrink-0",
    "cursor-auto",
    "cursor-default",
    "cursor-pointer",
    "cursor-wait",
    "cursor-text",
    "cursor-move",
    "cursor-not-allowed",
    "cursor-grab",
    "cursor-grabbing",
    "cursor-crosshair",
    "cursor-zoom-in",
    "cursor-zoom-out",
    "cursor-none",
    "pointer-events",
    "select-none",
    "select-text",
    "select-all",
    "select-auto",
    "box-border",
    "box-content",
    "float-left",
    "float-right",
    "float-none",
    "clear-left",
    "clear-right",
    "clear-both",
    "clear-none",
    "whitespace-normal",
    "whitespace-nowrap",
    "whitespace-pre",
    "break-normal",
    "break-words",
    "break-all",
    "inline-block",
    "inline-flex",
    "inline-grid",
    "table-cell",
    "table-row",
    "flow-root",
    "list-none",
    "list-disc",
    "list-decimal",
    "resize-x",
    "resize-y",
    "resize-none",
    "origin-center",
    "origin-top",
    "origin-right",
    "origin-bottom",
    "origin-left",
    "origin-top-right",
    "origin-top-left",
    "origin-bottom-right",
    "origin-bottom-left",
    "ease-in-out",
    "ease-in",
    "ease-out",
    "transition-all",
    "transition-colors",
    "transition-opacity",
    "transition-shadow",
    "transition-transform",
    "transition-none",
    "appearance-none",
    "appearance-auto",
    "border-solid",
    "border-dashed",
    "border-dotted",
    "border-double",
    "border-hidden",
    "border-none",
    "overflow-hidden",
    "overflow-auto",
    "overflow-scroll",
    "overflow-visible",
    "overflow-clip",
    "visible",
    "invisible"
  ];
  function parseClass(cls) {
    const { modifier, rest } = extractModifier(cls);
    const tokens = tokenize(rest);
    for (const multi of MULTI_TOKEN_UTILITIES) {
      const multiTokens = multi.split("-");
      const joined = tokens.slice(0, multiTokens.length).join("-");
      if (joined === multi) {
        const valueTokens = tokens.slice(multiTokens.length);
        const rawValue2 = valueTokens.join("-");
        const arbitrary2 = rawValue2 && isArbitrary(rawValue2);
        return {
          raw: cls,
          modifier,
          utility: multi,
          value: arbitrary2 ? extractArbitrary(rawValue2) : rawValue2,
          isArbitrary: !!arbitrary2
        };
      }
    }
    const utility = tokens[0] ?? "";
    const rawValue = tokens.slice(1).join("-");
    const arbitrary = rawValue && isArbitrary(rawValue);
    return {
      raw: cls,
      modifier,
      utility,
      value: arbitrary ? extractArbitrary(rawValue) : rawValue,
      isArbitrary: !!arbitrary
    };
  }

  // packages/utilities/src/spacing.ts
  var spacingScale = {
    "0": "0px",
    "1": "2px",
    "2": "4px",
    "3": "8px",
    "4": "16px",
    "5": "32px",
    "6": "48px",
    "7": "64px",
    "8": "96px",
    "9": "128px",
    "10": "160px",
    "11": "192px",
    "12": "224px",
    "14": "256px",
    "16": "320px",
    "20": "384px",
    "24": "448px",
    "28": "512px",
    "32": "576px",
    px: "1px",
    "0.5": "2px",
    "1.5": "6px",
    "2.5": "10px",
    "3.5": "14px",
    auto: "auto",
    full: "100%",
    "1/2": "50%",
    "1/3": "33.333%",
    "2/3": "66.667%",
    "1/4": "25%",
    "3/4": "75%"
  };

  // packages/utilities/src/colors.ts
  var colors = {
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000000",
    white: "#ffffff",
    slate: {
      "50": "#f8fafc",
      "100": "#f1f5f9",
      "200": "#e2e8f0",
      "300": "#cbd5e1",
      "400": "#94a3b8",
      "500": "#64748b",
      "600": "#475569",
      "700": "#334155",
      "800": "#1e293b",
      "900": "#0f172a",
      "950": "#020617"
    },
    gray: {
      "50": "#f9fafb",
      "100": "#f3f4f6",
      "200": "#e5e7eb",
      "300": "#d1d5db",
      "400": "#9ca3af",
      "500": "#6b7280",
      "600": "#4b5563",
      "700": "#374151",
      "800": "#1f2937",
      "900": "#111827",
      "950": "#030712"
    },
    zinc: {
      "50": "#fafafa",
      "100": "#f4f4f5",
      "200": "#e4e4e7",
      "300": "#d4d4d8",
      "400": "#a1a1aa",
      "500": "#71717a",
      "600": "#52525b",
      "700": "#3f3f46",
      "800": "#27272a",
      "900": "#18181b",
      "950": "#09090b"
    },
    neutral: {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#e5e5e5",
      "300": "#d4d4d4",
      "400": "#a3a3a3",
      "500": "#737373",
      "600": "#525252",
      "700": "#404040",
      "800": "#262626",
      "900": "#171717",
      "950": "#0a0a0a"
    },
    stone: {
      "50": "#fafaf9",
      "100": "#f5f5f4",
      "200": "#e7e5e4",
      "300": "#d6d3d1",
      "400": "#a8a29e",
      "500": "#78716c",
      "600": "#57534e",
      "700": "#44403c",
      "800": "#292524",
      "900": "#1c1917",
      "950": "#0c0a09"
    },
    red: {
      "50": "#fef2f2",
      "100": "#fee2e2",
      "200": "#fecaca",
      "300": "#fca5a5",
      "400": "#f87171",
      "500": "#ef4444",
      "600": "#dc2626",
      "700": "#b91c1c",
      "800": "#991b1b",
      "900": "#7f1d1d",
      "950": "#450a0a"
    },
    orange: {
      "50": "#fff7ed",
      "100": "#ffedd5",
      "200": "#fed7aa",
      "300": "#fdba74",
      "400": "#fb923c",
      "500": "#f97316",
      "600": "#ea580c",
      "700": "#c2410c",
      "800": "#9a3412",
      "900": "#7c2d12",
      "950": "#431407"
    },
    amber: {
      "50": "#fffbeb",
      "100": "#fef3c7",
      "200": "#fde68a",
      "300": "#fcd34d",
      "400": "#fbbf24",
      "500": "#f59e0b",
      "600": "#d97706",
      "700": "#b45309",
      "800": "#92400e",
      "900": "#78350f",
      "950": "#451a03"
    },
    yellow: {
      "50": "#fefce8",
      "100": "#fef9c3",
      "200": "#fef08a",
      "300": "#fde047",
      "400": "#facc15",
      "500": "#eab308",
      "600": "#ca8a04",
      "700": "#a16207",
      "800": "#854d0e",
      "900": "#713f12",
      "950": "#422006"
    },
    lime: {
      "50": "#f7fee7",
      "100": "#ecfccb",
      "200": "#d9f99d",
      "300": "#bef264",
      "400": "#a3e635",
      "500": "#84cc16",
      "600": "#65a30d",
      "700": "#4d7c0f",
      "800": "#3f6212",
      "900": "#365314",
      "950": "#1a2e05"
    },
    green: {
      "50": "#f0fdf4",
      "100": "#dcfce7",
      "200": "#bbf7d0",
      "300": "#86efac",
      "400": "#4ade80",
      "500": "#22c55e",
      "600": "#16a34a",
      "700": "#15803d",
      "800": "#166534",
      "900": "#14532d",
      "950": "#052e16"
    },
    emerald: {
      "50": "#ecfdf5",
      "100": "#d1fae5",
      "200": "#a7f3d0",
      "300": "#6ee7b7",
      "400": "#34d399",
      "500": "#10b981",
      "600": "#059669",
      "700": "#047857",
      "800": "#065f46",
      "900": "#064e3b",
      "950": "#022c22"
    },
    teal: {
      "50": "#f0fdfa",
      "100": "#ccfbf1",
      "200": "#99f6e4",
      "300": "#5eead4",
      "400": "#2dd4bf",
      "500": "#14b8a6",
      "600": "#0d9488",
      "700": "#0f766e",
      "800": "#115e59",
      "900": "#134e4a",
      "950": "#042f2e"
    },
    cyan: {
      "50": "#ecfeff",
      "100": "#cffafe",
      "200": "#a5f3fc",
      "300": "#67e8f9",
      "400": "#22d3ee",
      "500": "#06b6d4",
      "600": "#0891b2",
      "700": "#0e7490",
      "800": "#155e75",
      "900": "#164e63",
      "950": "#083344"
    },
    sky: {
      "50": "#f0f9ff",
      "100": "#e0f2fe",
      "200": "#bae6fd",
      "300": "#7dd3fc",
      "400": "#38bdf8",
      "500": "#0ea5e9",
      "600": "#0284c7",
      "700": "#0369a1",
      "800": "#075985",
      "900": "#0c4a6e",
      "950": "#082f49"
    },
    blue: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a",
      "950": "#172554"
    },
    indigo: {
      "50": "#eef2ff",
      "100": "#e0e7ff",
      "200": "#c7d2fe",
      "300": "#a5b4fc",
      "400": "#818cf8",
      "500": "#6366f1",
      "600": "#4f46e5",
      "700": "#4338ca",
      "800": "#3730a3",
      "900": "#312e81",
      "950": "#1e1b4b"
    },
    violet: {
      "50": "#f5f3ff",
      "100": "#ede9fe",
      "200": "#ddd6fe",
      "300": "#c4b5fd",
      "400": "#a78bfa",
      "500": "#8b5cf6",
      "600": "#7c3aed",
      "700": "#6d28d9",
      "800": "#5b21b6",
      "900": "#4c1d95",
      "950": "#2e1065"
    },
    purple: {
      "50": "#faf5ff",
      "100": "#f3e8ff",
      "200": "#e9d5ff",
      "300": "#d8b4fe",
      "400": "#c084fc",
      "500": "#a855f7",
      "600": "#9333ea",
      "700": "#7e22ce",
      "800": "#6b21a8",
      "900": "#581c87",
      "950": "#3b0764"
    },
    fuchsia: {
      "50": "#fdf4ff",
      "100": "#fae8ff",
      "200": "#f5d0fe",
      "300": "#f0abfc",
      "400": "#e879f9",
      "500": "#d946ef",
      "600": "#c026d3",
      "700": "#a21caf",
      "800": "#86198f",
      "900": "#701a75",
      "950": "#4a044e"
    },
    pink: {
      "50": "#fdf2f8",
      "100": "#fce7f3",
      "200": "#fbcfe8",
      "300": "#f9a8d4",
      "400": "#f472b6",
      "500": "#ec4899",
      "600": "#db2777",
      "700": "#be185d",
      "800": "#9d174d",
      "900": "#831843",
      "950": "#500724"
    },
    rose: {
      "50": "#fff1f2",
      "100": "#ffe4e6",
      "200": "#fecdd3",
      "300": "#fda4af",
      "400": "#fb7185",
      "500": "#f43f5e",
      "600": "#e11d48",
      "700": "#be123c",
      "800": "#9f1239",
      "900": "#881337",
      "950": "#4c0519"
    }
  };
  function resolveColor(value) {
    if (value === "black") return "#000000";
    if (value === "white") return "#ffffff";
    if (value === "transparent") return "transparent";
    if (value === "current") return "currentColor";
    if (value === "inherit") return "inherit";
    const parts = value.split("-");
    if (parts.length < 2) return void 0;
    const shade = parts[parts.length - 1];
    const colorName = parts.slice(0, -1).join("-");
    const colorGroup = colors[colorName];
    if (colorGroup && typeof colorGroup === "object") {
      return colorGroup[shade];
    }
    return void 0;
  }

  // packages/utilities/src/typography.ts
  var fontSizes = {
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px"
  };
  var fontWeights = {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900"
  };
  var lineHeights = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    "3": "12px",
    "4": "16px",
    "5": "20px",
    "6": "24px",
    "7": "28px",
    "8": "32px",
    "9": "36px",
    "10": "40px"
  };
  var letterSpacings = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em"
  };
  var fontFamilies = {
    sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace"
  };

  // packages/utilities/src/layout.ts
  var overflowValues = {
    auto: "auto",
    hidden: "hidden",
    visible: "visible",
    scroll: "scroll",
    clip: "clip"
  };
  var zIndexScale = {
    "0": "0",
    "10": "10",
    "20": "20",
    "30": "30",
    "40": "40",
    "50": "50",
    auto: "auto"
  };

  // packages/utilities/src/flexbox.ts
  var justifyContentValues = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch",
    normal: "normal"
  };
  var alignItemsValues = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    baseline: "baseline",
    stretch: "stretch"
  };
  var alignSelfValues = {
    auto: "auto",
    start: "flex-start",
    end: "flex-end",
    center: "center",
    stretch: "stretch",
    baseline: "baseline"
  };
  var alignContentValues = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch",
    normal: "normal"
  };
  var flexValues = {
    "1": "1 1 0%",
    auto: "1 1 auto",
    initial: "0 1 auto",
    none: "none"
  };
  var orderValues = {
    first: "-9999",
    last: "9999",
    none: "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "11": "11",
    "12": "12"
  };
  var flexBasisValues = {
    "0": "0px",
    auto: "auto",
    full: "100%",
    "1/2": "50%",
    "1/3": "33.333%",
    "2/3": "66.667%",
    "1/4": "25%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%"
  };

  // packages/utilities/src/grid.ts
  function gridCols(n) {
    return `repeat(${n}, minmax(0, 1fr))`;
  }
  function gridRows(n) {
    return `repeat(${n}, minmax(0, 1fr))`;
  }
  var gridColsScale = {
    "1": gridCols(1),
    "2": gridCols(2),
    "3": gridCols(3),
    "4": gridCols(4),
    "5": gridCols(5),
    "6": gridCols(6),
    "7": gridCols(7),
    "8": gridCols(8),
    "9": gridCols(9),
    "10": gridCols(10),
    "11": gridCols(11),
    "12": gridCols(12),
    none: "none"
  };
  var gridRowsScale = {
    "1": gridRows(1),
    "2": gridRows(2),
    "3": gridRows(3),
    "4": gridRows(4),
    "5": gridRows(5),
    "6": gridRows(6),
    none: "none"
  };
  var colSpanValues = {
    "1": "span 1 / span 1",
    "2": "span 2 / span 2",
    "3": "span 3 / span 3",
    "4": "span 4 / span 4",
    "5": "span 5 / span 5",
    "6": "span 6 / span 6",
    "7": "span 7 / span 7",
    "8": "span 8 / span 8",
    "9": "span 9 / span 9",
    "10": "span 10 / span 10",
    "11": "span 11 / span 11",
    "12": "span 12 / span 12",
    full: "1 / -1",
    auto: "auto"
  };
  var rowSpanValues = {
    "1": "span 1 / span 1",
    "2": "span 2 / span 2",
    "3": "span 3 / span 3",
    "4": "span 4 / span 4",
    "5": "span 5 / span 5",
    "6": "span 6 / span 6",
    full: "1 / -1",
    auto: "auto"
  };
  var gridStartEndValues = {
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "10": "10",
    "11": "11",
    "12": "12",
    "13": "13",
    auto: "auto"
  };
  var gridAutoFlowValues = {
    row: "row",
    col: "column",
    dense: "dense",
    "row-dense": "row dense",
    "col-dense": "column dense"
  };
  var gridAutoColsValues = {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  };
  var gridAutoRowsValues = {
    auto: "auto",
    min: "min-content",
    max: "max-content",
    fr: "minmax(0, 1fr)"
  };
  var placeItemsValues = {
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch"
  };
  var placeContentValues = {
    start: "start",
    end: "end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
    stretch: "stretch"
  };
  var placeSelfValues = {
    auto: "auto",
    start: "start",
    end: "end",
    center: "center",
    stretch: "stretch"
  };

  // packages/utilities/src/sizing.ts
  var sizingScale = {
    "0": "0px",
    "1": "2px",
    "2": "4px",
    "3": "8px",
    "4": "16px",
    "5": "32px",
    "6": "48px",
    "7": "64px",
    "8": "96px",
    "9": "128px",
    "10": "160px",
    "11": "192px",
    "12": "224px",
    "14": "256px",
    "16": "320px",
    "20": "384px",
    "24": "448px",
    "28": "512px",
    "32": "576px",
    px: "1px",
    auto: "auto",
    "1/2": "50%",
    "1/3": "33.333%",
    "2/3": "66.667%",
    "1/4": "25%",
    "2/4": "50%",
    "3/4": "75%",
    "1/5": "20%",
    "2/5": "40%",
    "3/5": "60%",
    "4/5": "80%",
    "1/6": "16.667%",
    "5/6": "83.333%",
    full: "100%",
    screen: "100vw",
    svw: "100svw",
    min: "min-content",
    max: "max-content",
    fit: "fit-content"
  };
  var heightScale = {
    ...sizingScale,
    screen: "100vh",
    svh: "100svh",
    dvh: "100dvh"
  };
  var maxWidthScale = {
    none: "none",
    "0": "0rem",
    xs: "320px",
    sm: "384px",
    md: "448px",
    lg: "512px",
    xl: "576px",
    "2xl": "672px",
    "3xl": "768px",
    "4xl": "896px",
    "5xl": "1024px",
    "6xl": "1152px",
    "7xl": "1280px",
    full: "100%",
    min: "min-content",
    max: "max-content",
    fit: "fit-content",
    prose: "65ch",
    "screen-sm": "640px",
    "screen-md": "768px",
    "screen-lg": "1024px",
    "screen-xl": "1280px",
    "screen-2xl": "1536px"
  };

  // packages/utilities/src/borders.ts
  var borderWidthScale = {
    "0": "0px",
    DEFAULT: "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px"
  };
  var borderRadiusScale = {
    none: "0px",
    sm: "2px",
    DEFAULT: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    "2xl": "16px",
    "3xl": "24px",
    full: "9999px"
  };
  var borderStyleValues = {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted",
    double: "double",
    hidden: "hidden",
    none: "none"
  };
  var outlineWidthScale = {
    "0": "0px",
    "1": "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px"
  };
  var outlineOffsetScale = {
    "0": "0px",
    "1": "1px",
    "2": "2px",
    "4": "4px",
    "8": "8px"
  };

  // packages/utilities/src/shadows.ts
  var shadowScale = {
    none: "none",
    sm: "0 1px 2px rgba(0,0,0,0.05)",
    DEFAULT: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
    md: "0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
    lg: "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
    xl: "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)",
    "2xl": "0 25px 50px rgba(0,0,0,0.25)",
    inner: "inset 0 2px 4px rgba(0,0,0,0.06)"
  };

  // packages/utilities/src/transitions.ts
  var transitionPropertyValues = {
    DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
    all: "all",
    colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
    opacity: "opacity",
    shadow: "box-shadow",
    transform: "transform",
    none: "none"
  };
  var transitionDurationScale = {
    "0": "0ms",
    "75": "75ms",
    "100": "100ms",
    "150": "150ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
    "700": "700ms",
    "1000": "1000ms"
  };
  var transitionTimingValues = {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    "in-out": "cubic-bezier(0.4, 0, 0.2, 1)"
  };
  var transitionDelayScale = {
    "0": "0ms",
    "75": "75ms",
    "100": "100ms",
    "150": "150ms",
    "200": "200ms",
    "300": "300ms",
    "500": "500ms",
    "700": "700ms",
    "1000": "1000ms"
  };

  // packages/utilities/src/transforms.ts
  var scaleValues = {
    "0": "0",
    "50": "0.5",
    "75": "0.75",
    "90": "0.9",
    "95": "0.95",
    "100": "1",
    "105": "1.05",
    "110": "1.1",
    "125": "1.25",
    "150": "1.5"
  };
  var rotateValues = {
    "0": "0deg",
    "1": "1deg",
    "2": "2deg",
    "3": "3deg",
    "6": "6deg",
    "12": "12deg",
    "45": "45deg",
    "90": "90deg",
    "180": "180deg"
  };
  var skewValues = {
    "0": "0deg",
    "1": "1deg",
    "2": "2deg",
    "3": "3deg",
    "6": "6deg",
    "12": "12deg"
  };

  // packages/themes/src/default.ts
  var defaultTheme = {
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
    maxWidths: maxWidthScale
  };

  // packages/themes/src/configure.ts
  var activeTheme = { ...defaultTheme };
  function configure(overrides) {
    if (!overrides.theme) return;
    const t = overrides.theme;
    activeTheme = {
      ...defaultTheme,
      ...t,
      spacing: t.spacing ? { ...defaultTheme.spacing, ...t.spacing } : defaultTheme.spacing,
      colors: t.colors ? { ...defaultTheme.colors, ...t.colors } : defaultTheme.colors,
      fontSizes: t.fontSizes ? { ...defaultTheme.fontSizes, ...t.fontSizes } : defaultTheme.fontSizes,
      fontWeights: t.fontWeights ? { ...defaultTheme.fontWeights, ...t.fontWeights } : defaultTheme.fontWeights,
      shadows: t.shadows ? { ...defaultTheme.shadows, ...t.shadows } : defaultTheme.shadows
    };
  }

  // packages/core/src/scanner.ts
  function scanDOM(root = document) {
    const all = root.querySelectorAll("*");
    const result = [];
    all.forEach((el) => {
      const snapClasses = extractSnapClasses(el);
      if (snapClasses.length > 0) {
        result.push({ el, snapClasses });
      }
    });
    return result;
  }
  function extractSnapClasses(el) {
    return Array.from(el.classList);
  }

  // packages/core/src/resolver.ts
  function sp(value, isArb) {
    return isArb ? value : spacingScale[value] ?? value;
  }
  function col(value, isArb) {
    if (isArb) return isColorLike(value) ? value : void 0;
    return resolveColor(value);
  }
  function isColorLike(v) {
    return /^(#|rgb|hsl|oklch|color\(|hwb|lch|lab)/.test(v) || /^[a-zA-Z]+$/.test(v);
  }
  function lk(map, value, isArb) {
    if (isArb) return value;
    return map[value] ?? map["DEFAULT"] ?? value;
  }
  function br(value, isArb) {
    return isArb ? value : borderRadiusScale[value] ?? borderRadiusScale["DEFAULT"] ?? "4px";
  }
  function resolve(parsed) {
    const { utility, value, isArbitrary: isArb } = parsed;
    switch (utility) {
      // ── Padding ──────────────────────────────────────────────
      case "p":
        return { padding: sp(value, isArb) };
      case "pt":
        return { paddingTop: sp(value, isArb) };
      case "pb":
        return { paddingBottom: sp(value, isArb) };
      case "pl":
        return { paddingLeft: sp(value, isArb) };
      case "pr":
        return { paddingRight: sp(value, isArb) };
      case "px":
        return { paddingLeft: sp(value, isArb), paddingRight: sp(value, isArb) };
      case "py":
        return { paddingTop: sp(value, isArb), paddingBottom: sp(value, isArb) };
      // ── Margin ───────────────────────────────────────────────
      case "m":
        return { margin: sp(value, isArb) };
      case "mt":
        return { marginTop: sp(value, isArb) };
      case "mb":
        return { marginBottom: sp(value, isArb) };
      case "ml":
        return { marginLeft: sp(value, isArb) };
      case "mr":
        return { marginRight: sp(value, isArb) };
      case "mx":
        return { marginLeft: sp(value, isArb), marginRight: sp(value, isArb) };
      case "my":
        return { marginTop: sp(value, isArb), marginBottom: sp(value, isArb) };
      // ── Sizing ───────────────────────────────────────────────
      case "w":
        return { width: isArb ? value : sizingScale[value] ?? value };
      case "h":
        return { height: isArb ? value : heightScale[value] ?? value };
      case "min-w":
        return { minWidth: isArb ? value : sizingScale[value] ?? value };
      case "max-w":
        return { maxWidth: isArb ? value : maxWidthScale[value] ?? value };
      case "min-h":
        return { minHeight: isArb ? value : heightScale[value] ?? value };
      case "max-h":
        return { maxHeight: isArb ? value : heightScale[value] ?? value };
      // ── Inset ────────────────────────────────────────────────
      case "top":
        return { top: sp(value, isArb) };
      case "right":
        return { right: sp(value, isArb) };
      case "bottom":
        return { bottom: sp(value, isArb) };
      case "left":
        return { left: sp(value, isArb) };
      case "inset": {
        const v = sp(value, isArb);
        return { top: v, right: v, bottom: v, left: v };
      }
      case "inset-x":
        return { left: sp(value, isArb), right: sp(value, isArb) };
      case "inset-y":
        return { top: sp(value, isArb), bottom: sp(value, isArb) };
      // ── Layout ───────────────────────────────────────────────
      case "block":
        return { display: "block" };
      case "inline-block":
        return { display: "inline-block" };
      case "inline":
        return { display: "inline" };
      case "inline-flex":
        return { display: "inline-flex" };
      case "inline-grid":
        return { display: "inline-grid" };
      case "hidden":
        return { display: "none" };
      case "table":
        return { display: "table" };
      case "table-cell":
        return { display: "table-cell" };
      case "table-row":
        return { display: "table-row" };
      case "flow-root":
        return { display: "flow-root" };
      case "contents":
        return { display: "contents" };
      case "relative":
        return { position: "relative" };
      case "absolute":
        return { position: "absolute" };
      case "fixed":
        return { position: "fixed" };
      case "sticky":
        return { position: "sticky" };
      case "static":
        return { position: "static" };
      case "visible":
        return { visibility: "visible" };
      case "invisible":
        return { visibility: "hidden" };
      case "z":
        return { zIndex: isArb ? value : zIndexScale[value] ?? value };
      case "overflow-hidden":
        return { overflow: "hidden" };
      case "overflow-auto":
        return { overflow: "auto" };
      case "overflow-scroll":
        return { overflow: "scroll" };
      case "overflow-visible":
        return { overflow: "visible" };
      case "overflow-clip":
        return { overflow: "clip" };
      case "overflow-x":
        return { overflowX: lk(overflowValues, value, isArb) };
      case "overflow-y":
        return { overflowY: lk(overflowValues, value, isArb) };
      case "float-left":
        return { float: "left" };
      case "float-right":
        return { float: "right" };
      case "float-none":
        return { float: "none" };
      case "clear-left":
        return { clear: "left" };
      case "clear-right":
        return { clear: "right" };
      case "clear-both":
        return { clear: "both" };
      case "clear-none":
        return { clear: "none" };
      case "box-border":
        return { boxSizing: "border-box" };
      case "box-content":
        return { boxSizing: "content-box" };
      // ── Flexbox ──────────────────────────────────────────────
      case "flex":
        return value ? { flex: lk(flexValues, value, isArb) } : { display: "flex" };
      case "flex-1":
        return { flex: "1 1 0%" };
      case "flex-auto":
        return { flex: "1 1 auto" };
      case "flex-initial":
        return { flex: "0 1 auto" };
      case "flex-none":
        return { flex: "none" };
      case "flex-row":
        return { flexDirection: "row" };
      case "flex-col":
        return { flexDirection: "column" };
      case "flex-row-reverse":
        return { flexDirection: "row-reverse" };
      case "flex-col-reverse":
        return { flexDirection: "column-reverse" };
      case "flex-wrap":
        return { flexWrap: "wrap" };
      case "flex-nowrap":
        return { flexWrap: "nowrap" };
      case "flex-wrap-reverse":
        return { flexWrap: "wrap-reverse" };
      case "grow":
        return { flexGrow: "1" };
      case "grow-0":
        return { flexGrow: "0" };
      case "shrink":
        return { flexShrink: "1" };
      case "shrink-0":
        return { flexShrink: "0" };
      case "basis":
        return { flexBasis: isArb ? value : flexBasisValues[value] ?? spacingScale[value] ?? value };
      case "order":
        return { order: isArb ? value : orderValues[value] ?? value };
      case "justify":
        return { justifyContent: lk(justifyContentValues, value, isArb) };
      case "items":
        return { alignItems: lk(alignItemsValues, value, isArb) };
      case "self":
        return { alignSelf: lk(alignSelfValues, value, isArb) };
      case "content":
        return { alignContent: lk(alignContentValues, value, isArb) };
      case "gap":
        return { gap: sp(value, isArb) };
      case "gap-x":
        return { columnGap: sp(value, isArb) };
      case "gap-y":
        return { rowGap: sp(value, isArb) };
      // ── Grid ─────────────────────────────────────────────────
      case "grid":
        return value ? {} : { display: "grid" };
      case "grid-cols":
        return { gridTemplateColumns: isArb ? value : gridColsScale[value] ?? value };
      case "grid-rows":
        return { gridTemplateRows: isArb ? value : gridRowsScale[value] ?? value };
      case "col-span":
        return { gridColumn: isArb ? value : colSpanValues[value] ?? value };
      case "col-start":
        return { gridColumnStart: lk(gridStartEndValues, value, isArb) };
      case "col-end":
        return { gridColumnEnd: lk(gridStartEndValues, value, isArb) };
      case "row-span":
        return { gridRow: isArb ? value : rowSpanValues[value] ?? value };
      case "row-start":
        return { gridRowStart: lk(gridStartEndValues, value, isArb) };
      case "row-end":
        return { gridRowEnd: lk(gridStartEndValues, value, isArb) };
      case "grid-flow":
        return { gridAutoFlow: lk(gridAutoFlowValues, value, isArb) };
      case "auto-cols":
        return { gridAutoColumns: lk(gridAutoColsValues, value, isArb) };
      case "auto-rows":
        return { gridAutoRows: lk(gridAutoRowsValues, value, isArb) };
      case "place-items":
        return { placeItems: lk(placeItemsValues, value, isArb) };
      case "place-content":
        return { placeContent: lk(placeContentValues, value, isArb) };
      case "place-self":
        return { placeSelf: lk(placeSelfValues, value, isArb) };
      // ── Typography ───────────────────────────────────────────
      case "text": {
        if (isArb) {
          if (/^[\d]/.test(value) || /px$|rem$|em$|vh$|vw$/.test(value)) return { fontSize: value };
          return { color: value };
        }
        if (fontSizes[value]) return { fontSize: fontSizes[value] };
        const c = resolveColor(value);
        if (c) return { color: c };
        return {};
      }
      case "font": {
        if (isArb) return { fontWeight: value };
        if (fontWeights[value]) return { fontWeight: fontWeights[value] };
        if (fontFamilies[value]) return { fontFamily: fontFamilies[value] };
        return {};
      }
      case "font-sans":
        return { fontFamily: fontFamilies.sans };
      case "font-serif":
        return { fontFamily: fontFamilies.serif };
      case "font-mono":
        return { fontFamily: fontFamilies.mono };
      case "leading":
        return { lineHeight: isArb ? value : lineHeights[value] ?? value };
      case "tracking":
        return { letterSpacing: isArb ? value : letterSpacings[value] ?? value };
      case "italic":
        return { fontStyle: "italic" };
      case "not-italic":
        return { fontStyle: "normal" };
      case "uppercase":
        return { textTransform: "uppercase" };
      case "lowercase":
        return { textTransform: "lowercase" };
      case "capitalize":
        return { textTransform: "capitalize" };
      case "normal-case":
        return { textTransform: "none" };
      case "underline":
        return { textDecorationLine: "underline" };
      case "overline":
        return { textDecorationLine: "overline" };
      case "line-through":
        return { textDecorationLine: "line-through" };
      case "no-underline":
        return { textDecorationLine: "none" };
      case "text-left":
        return { textAlign: "left" };
      case "text-center":
        return { textAlign: "center" };
      case "text-right":
        return { textAlign: "right" };
      case "text-justify":
        return { textAlign: "justify" };
      case "truncate":
        return { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
      case "text-ellipsis":
        return { textOverflow: "ellipsis" };
      case "text-clip":
        return { textOverflow: "clip" };
      case "whitespace-normal":
        return { whiteSpace: "normal" };
      case "whitespace-nowrap":
        return { whiteSpace: "nowrap" };
      case "whitespace-pre":
        return { whiteSpace: "pre" };
      case "whitespace-pre-line":
        return { whiteSpace: "pre-line" };
      case "whitespace-pre-wrap":
        return { whiteSpace: "pre-wrap" };
      case "break-normal":
        return { overflowWrap: "normal", wordBreak: "normal" };
      case "break-words":
        return { overflowWrap: "break-word" };
      case "break-all":
        return { wordBreak: "break-all" };
      case "line-clamp": {
        if (value === "none") return { WebkitLineClamp: "unset" };
        return { overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: value };
      }
      // ── Background ───────────────────────────────────────────
      case "bg": {
        const c = col(value, isArb);
        return c ? { backgroundColor: c } : {};
      }
      case "bg-cover":
        return { backgroundSize: "cover" };
      case "bg-contain":
        return { backgroundSize: "contain" };
      case "bg-auto":
        return { backgroundSize: "auto" };
      case "bg-center":
        return { backgroundPosition: "center" };
      case "bg-top":
        return { backgroundPosition: "top" };
      case "bg-bottom":
        return { backgroundPosition: "bottom" };
      case "bg-left":
        return { backgroundPosition: "left" };
      case "bg-right":
        return { backgroundPosition: "right" };
      case "bg-left-top":
        return { backgroundPosition: "left top" };
      case "bg-right-top":
        return { backgroundPosition: "right top" };
      case "bg-left-bottom":
        return { backgroundPosition: "left bottom" };
      case "bg-right-bottom":
        return { backgroundPosition: "right bottom" };
      case "bg-no-repeat":
        return { backgroundRepeat: "no-repeat" };
      case "bg-repeat":
        return { backgroundRepeat: "repeat" };
      case "bg-repeat-x":
        return { backgroundRepeat: "repeat-x" };
      case "bg-repeat-y":
        return { backgroundRepeat: "repeat-y" };
      case "bg-fixed":
        return { backgroundAttachment: "fixed" };
      case "bg-local":
        return { backgroundAttachment: "local" };
      case "bg-scroll":
        return { backgroundAttachment: "scroll" };
      // ── Border Width ─────────────────────────────────────────
      case "border": {
        if (!value) return { borderWidth: "1px" };
        const bStyle = borderStyleValues[value];
        if (bStyle) return { borderStyle: bStyle };
        const bColor = col(value, isArb);
        if (bColor) return { borderColor: bColor };
        return { borderWidth: isArb ? value : borderWidthScale[value] ?? value };
      }
      case "border-t": {
        const c = col(value, isArb);
        return c ? { borderTopColor: c } : { borderTopWidth: isArb ? value : borderWidthScale[value] ?? value };
      }
      case "border-b": {
        const c = col(value, isArb);
        return c ? { borderBottomColor: c } : { borderBottomWidth: isArb ? value : borderWidthScale[value] ?? value };
      }
      case "border-l": {
        const c = col(value, isArb);
        return c ? { borderLeftColor: c } : { borderLeftWidth: isArb ? value : borderWidthScale[value] ?? value };
      }
      case "border-r": {
        const c = col(value, isArb);
        return c ? { borderRightColor: c } : { borderRightWidth: isArb ? value : borderWidthScale[value] ?? value };
      }
      case "border-x": {
        const w = isArb ? value : borderWidthScale[value] ?? value;
        return { borderLeftWidth: w, borderRightWidth: w };
      }
      case "border-y": {
        const w = isArb ? value : borderWidthScale[value] ?? value;
        return { borderTopWidth: w, borderBottomWidth: w };
      }
      case "border-solid":
        return { borderStyle: "solid" };
      case "border-dashed":
        return { borderStyle: "dashed" };
      case "border-dotted":
        return { borderStyle: "dotted" };
      case "border-double":
        return { borderStyle: "double" };
      case "border-hidden":
        return { borderStyle: "hidden" };
      case "border-none":
        return { borderStyle: "none" };
      // ── Border Radius ────────────────────────────────────────
      case "rounded":
        return { borderRadius: br(value, isArb) };
      case "rounded-t":
        return { borderTopLeftRadius: br(value, isArb), borderTopRightRadius: br(value, isArb) };
      case "rounded-b":
        return { borderBottomLeftRadius: br(value, isArb), borderBottomRightRadius: br(value, isArb) };
      case "rounded-l":
        return { borderTopLeftRadius: br(value, isArb), borderBottomLeftRadius: br(value, isArb) };
      case "rounded-r":
        return { borderTopRightRadius: br(value, isArb), borderBottomRightRadius: br(value, isArb) };
      case "rounded-tl":
        return { borderTopLeftRadius: br(value, isArb) };
      case "rounded-tr":
        return { borderTopRightRadius: br(value, isArb) };
      case "rounded-bl":
        return { borderBottomLeftRadius: br(value, isArb) };
      case "rounded-br":
        return { borderBottomRightRadius: br(value, isArb) };
      // ── Outline ──────────────────────────────────────────────
      case "outline-none":
        return { outline: "2px solid transparent", outlineOffset: "2px" };
      case "outline": {
        if (!value) return { outlineStyle: "solid" };
        const c = col(value, isArb);
        if (c) return { outlineColor: c };
        return { outlineWidth: isArb ? value : outlineWidthScale[value] ?? value };
      }
      case "outline-offset":
        return { outlineOffset: isArb ? value : outlineOffsetScale[value] ?? value };
      // ── Shadow ───────────────────────────────────────────────
      case "shadow":
        return { boxShadow: isArb ? value : shadowScale[value] ?? shadowScale["DEFAULT"] };
      // ── Opacity ──────────────────────────────────────────────
      case "opacity":
        return { opacity: isArb ? value : String(parseInt(value) / 100) };
      // ── Transitions ──────────────────────────────────────────
      case "transition": {
        if (!value) return { transitionProperty: transitionPropertyValues["DEFAULT"], transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
        return { transitionProperty: isArb ? value : transitionPropertyValues[value] ?? value };
      }
      case "transition-all":
        return { transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      case "transition-colors":
        return { transitionProperty: transitionPropertyValues.colors, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      case "transition-opacity":
        return { transitionProperty: "opacity", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      case "transition-shadow":
        return { transitionProperty: "box-shadow", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      case "transition-transform":
        return { transitionProperty: "transform", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      case "transition-none":
        return { transitionProperty: "none" };
      case "duration":
        return { transitionDuration: isArb ? value : transitionDurationScale[value] ?? value };
      case "ease-linear":
        return { transitionTimingFunction: "linear" };
      case "ease-in":
        return { transitionTimingFunction: "cubic-bezier(0.4,0,1,1)" };
      case "ease-out":
        return { transitionTimingFunction: "cubic-bezier(0,0,0.2,1)" };
      case "ease-in-out":
        return { transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" };
      case "ease":
        return { transitionTimingFunction: isArb ? value : transitionTimingValues[value] ?? value };
      case "delay":
        return { transitionDelay: isArb ? value : transitionDelayScale[value] ?? value };
      // ── Transforms ───────────────────────────────────────────
      case "scale":
        return { scale: isArb ? value : scaleValues[value] ?? value };
      case "scale-x":
        return { scale: `${isArb ? value : scaleValues[value] ?? value} 1` };
      case "scale-y":
        return { scale: `1 ${isArb ? value : scaleValues[value] ?? value}` };
      case "rotate":
        return { rotate: isArb ? value : rotateValues[value] ?? value + "deg" };
      case "translate-x":
        return { translate: `${sp(value, isArb)} 0` };
      case "translate-y":
        return { translate: `0 ${sp(value, isArb)}` };
      case "skew-x":
        return { transform: `skewX(${isArb ? value : skewValues[value] ?? value})` };
      case "skew-y":
        return { transform: `skewY(${isArb ? value : skewValues[value] ?? value})` };
      case "origin-center":
        return { transformOrigin: "center" };
      case "origin-top":
        return { transformOrigin: "top" };
      case "origin-top-right":
        return { transformOrigin: "top right" };
      case "origin-right":
        return { transformOrigin: "right" };
      case "origin-bottom-right":
        return { transformOrigin: "bottom right" };
      case "origin-bottom":
        return { transformOrigin: "bottom" };
      case "origin-bottom-left":
        return { transformOrigin: "bottom left" };
      case "origin-left":
        return { transformOrigin: "left" };
      case "origin-top-left":
        return { transformOrigin: "top left" };
      // ── Cursor ───────────────────────────────────────────────
      case "cursor-auto":
        return { cursor: "auto" };
      case "cursor-default":
        return { cursor: "default" };
      case "cursor-pointer":
        return { cursor: "pointer" };
      case "cursor-wait":
        return { cursor: "wait" };
      case "cursor-text":
        return { cursor: "text" };
      case "cursor-move":
        return { cursor: "move" };
      case "cursor-not-allowed":
        return { cursor: "not-allowed" };
      case "cursor-grab":
        return { cursor: "grab" };
      case "cursor-grabbing":
        return { cursor: "grabbing" };
      case "cursor-crosshair":
        return { cursor: "crosshair" };
      case "cursor-zoom-in":
        return { cursor: "zoom-in" };
      case "cursor-zoom-out":
        return { cursor: "zoom-out" };
      case "cursor-none":
        return { cursor: "none" };
      // ── Pointer Events / User Select ─────────────────────────
      case "pointer-events":
        return { pointerEvents: value };
      case "select-none":
        return { userSelect: "none" };
      case "select-text":
        return { userSelect: "text" };
      case "select-all":
        return { userSelect: "all" };
      case "select-auto":
        return { userSelect: "auto" };
      // ── Aspect Ratio ─────────────────────────────────────────
      case "aspect-auto":
        return { aspectRatio: "auto" };
      case "aspect-square":
        return { aspectRatio: "1 / 1" };
      case "aspect-video":
        return { aspectRatio: "16 / 9" };
      case "aspect":
        return { aspectRatio: isArb ? value.replace("/", " / ") : value };
      // ── Object fit / position ────────────────────────────────
      case "object-contain":
        return { objectFit: "contain" };
      case "object-cover":
        return { objectFit: "cover" };
      case "object-fill":
        return { objectFit: "fill" };
      case "object-none":
        return { objectFit: "none" };
      case "object-scale-down":
        return { objectFit: "scale-down" };
      case "object-center":
        return { objectPosition: "center" };
      case "object-top":
        return { objectPosition: "top" };
      case "object-bottom":
        return { objectPosition: "bottom" };
      case "object-left":
        return { objectPosition: "left" };
      case "object-right":
        return { objectPosition: "right" };
      case "object-left-top":
        return { objectPosition: "left top" };
      case "object-right-top":
        return { objectPosition: "right top" };
      case "object-left-bottom":
        return { objectPosition: "left bottom" };
      case "object-right-bottom":
        return { objectPosition: "right bottom" };
      // ── Appearance / Resize ──────────────────────────────────
      case "appearance-none":
        return { appearance: "none" };
      case "appearance-auto":
        return { appearance: "auto" };
      case "resize":
        return { resize: "both" };
      case "resize-x":
        return { resize: "horizontal" };
      case "resize-y":
        return { resize: "vertical" };
      case "resize-none":
        return { resize: "none" };
      // ── Space Between (marker for applier) ───────────────────
      case "space-x":
        return { "--snap-space-x": sp(value, isArb) };
      case "space-y":
        return { "--snap-space-y": sp(value, isArb) };
      default:
        return {};
    }
  }

  // packages/core/src/cache.ts
  var cache = /* @__PURE__ */ new Map();
  function getStyle(cls) {
    return cache.get(cls);
  }
  function setStyle(cls, styles) {
    cache.set(cls, styles);
  }
  function clearCache() {
    cache.clear();
  }

  // packages/core/src/applier.ts
  function applyStyles(el, styles) {
    const htmlEl = el;
    if ("--snap-space-x" in styles) {
      applySpaceBetween(el, "--snap-space-x", styles["--snap-space-x"], "marginLeft");
      return;
    }
    if ("--snap-space-y" in styles) {
      applySpaceBetween(el, "--snap-space-y", styles["--snap-space-y"], "marginTop");
      return;
    }
    Object.assign(htmlEl.style, styles);
  }
  function removeStyles(el, keys) {
    const htmlEl = el;
    for (const key of keys) {
      htmlEl.style.removeProperty(
        key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`)
      );
    }
  }
  function applySpaceBetween(el, _marker, value, prop) {
    const children = Array.from(el.children);
    children.forEach((child, i) => {
      child.style[prop] = i === 0 ? "" : value;
    });
  }

  // packages/core/src/states.ts
  function setupStateHandlers(el, snapClasses) {
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type !== "state") continue;
      const state = parsed.modifier.state;
      const styles = resolve({ ...parsed, modifier: null });
      if (!Object.keys(styles).length) continue;
      const styleKeys = Object.keys(styles);
      if (state === "hover") {
        el.addEventListener("mouseenter", () => applyStyles(el, styles));
        el.addEventListener("mouseleave", () => removeStyles(el, styleKeys));
      } else if (state === "focus") {
        el.addEventListener("focus", () => applyStyles(el, styles));
        el.addEventListener("blur", () => removeStyles(el, styleKeys));
      } else if (state === "focus-visible") {
        el.addEventListener("focus", () => {
          if (el.matches(":focus-visible")) applyStyles(el, styles);
        });
        el.addEventListener("blur", () => removeStyles(el, styleKeys));
      } else if (state === "active") {
        el.addEventListener("mousedown", () => applyStyles(el, styles));
        el.addEventListener("mouseup", () => removeStyles(el, styleKeys));
        el.addEventListener("mouseleave", () => removeStyles(el, styleKeys));
      }
    }
  }

  // packages/core/src/structural.ts
  function applyStructuralModifiers(el, snapClasses) {
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type !== "structural") continue;
      const kind = parsed.modifier.kind;
      const styles = resolve({ ...parsed, modifier: null });
      if (!Object.keys(styles).length) continue;
      if (kind === "disabled") {
        if (el.disabled || el.hasAttribute("disabled")) {
          applyStyles(el, styles);
        }
      } else if (kind === "first") {
        if (el === el.parentElement?.firstElementChild) {
          applyStyles(el, styles);
        }
      } else if (kind === "last") {
        if (el === el.parentElement?.lastElementChild) {
          applyStyles(el, styles);
        }
      } else if (kind === "odd" || kind === "even") {
        const parent = el.parentElement;
        if (!parent) continue;
        const index = Array.from(parent.children).indexOf(el);
        const isOdd = index % 2 === 0;
        if (kind === "odd" && isOdd || kind === "even" && !isOdd) {
          applyStyles(el, styles);
        }
      }
    }
  }

  // packages/core/src/group.ts
  var groupRegistry = /* @__PURE__ */ new Map();
  function registerGroupElements(scannedElements) {
    for (const { el, snapClasses } of scannedElements) {
      for (const cls of snapClasses) {
        const parsed = parseClass(cls);
        if (parsed.modifier?.type !== "group") continue;
        const styles = resolve({ ...parsed, modifier: null });
        if (!Object.keys(styles).length) continue;
        const groupRoot = el.closest(".group");
        if (!groupRoot) continue;
        const children = groupRegistry.get(groupRoot) ?? [];
        children.push({ el, styles, styleKeys: Object.keys(styles) });
        groupRegistry.set(groupRoot, children);
      }
    }
  }
  function setupGroupHoverListeners() {
    groupRegistry.forEach((children, groupRoot) => {
      groupRoot.addEventListener("mouseenter", () => {
        children.forEach(({ el, styles }) => applyStyles(el, styles));
      });
      groupRoot.addEventListener("mouseleave", () => {
        children.forEach(({ el, styleKeys }) => removeStyles(el, styleKeys));
      });
    });
  }

  // packages/core/src/responsive.ts
  var BREAKPOINTS2 = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  };
  var responsiveEntries = [];
  function storeResponsiveClass(el, snapClasses) {
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type !== "responsive") continue;
      const bp = BREAKPOINTS2[parsed.modifier.breakpoint];
      if (bp === void 0) continue;
      const styles = resolve({ ...parsed, modifier: null });
      if (!Object.keys(styles).length) continue;
      responsiveEntries.push({ el, breakpoint: bp, styles, styleKeys: Object.keys(styles) });
    }
  }
  function applyResponsive() {
    const width = window.innerWidth;
    for (const entry of responsiveEntries) {
      if (width >= entry.breakpoint) {
        applyStyles(entry.el, entry.styles);
      } else {
        removeStyles(entry.el, entry.styleKeys);
      }
    }
  }
  var resizeTimer = null;
  function setupResizeListener() {
    window.addEventListener("resize", () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResponsive, 150);
    });
  }

  // packages/core/src/darkmode.ts
  var darkEntries = [];
  function storeDarkClass(el, snapClasses) {
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type !== "dark") continue;
      const styles = resolve({ ...parsed, modifier: null });
      if (!Object.keys(styles).length) continue;
      darkEntries.push({ el, styles, styleKeys: Object.keys(styles) });
    }
  }
  function applyDarkMode() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    for (const entry of darkEntries) {
      if (isDark) {
        applyStyles(entry.el, entry.styles);
      } else {
        removeStyles(entry.el, entry.styleKeys);
      }
    }
  }
  function setupDarkModeListener() {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyDarkMode);
  }

  // packages/core/src/observer.ts
  function processElement(el) {
    const snapClasses = extractSnapClasses(el);
    if (!snapClasses.length) return;
    setupStateHandlers(el, snapClasses);
    applyStructuralModifiers(el, snapClasses);
    storeResponsiveClass(el, snapClasses);
    storeDarkClass(el, snapClasses);
    registerGroupElements([{ el, snapClasses }]);
    for (const cls of snapClasses) {
      const parsed = parseClass(cls);
      if (parsed.modifier !== null) continue;
      let styles = getStyle(cls);
      if (!styles) {
        styles = resolve(parsed);
        setStyle(cls, styles);
      }
      applyStyles(el, styles);
    }
  }
  function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
      let needsResponsive = false;
      let needsDark = false;
      let needsGroupSetup = false;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;
            const el = node;
            processElement(el);
            el.querySelectorAll("*").forEach(processElement);
            needsResponsive = true;
            needsDark = true;
            needsGroupSetup = true;
          });
        } else if (mutation.type === "attributes") {
          const el = mutation.target;
          if (mutation.attributeName === "class") {
            processElement(el);
            needsResponsive = true;
            needsDark = true;
            needsGroupSetup = true;
          } else if (mutation.attributeName === "disabled") {
            applyStructuralModifiers(el, extractSnapClasses(el));
          }
        }
      }
      if (needsResponsive) applyResponsive();
      if (needsDark) applyDarkMode();
      if (needsGroupSetup) setupGroupHoverListeners();
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "disabled"]
    });
  }

  // packages/core/src/index.ts
  function init(options) {
    if (options?.theme) {
      configure({ theme: options.theme });
    }
    const scannedElements = scanDOM();
    registerGroupElements(scannedElements);
    for (const { el, snapClasses } of scannedElements) {
      setupStateHandlers(el, snapClasses);
      applyStructuralModifiers(el, snapClasses);
      storeResponsiveClass(el, snapClasses);
      storeDarkClass(el, snapClasses);
      for (const cls of snapClasses) {
        const parsed = parseClass(cls);
        if (parsed.modifier !== null) continue;
        let styles = getStyle(cls);
        if (!styles) {
          styles = resolve(parsed);
          setStyle(cls, styles);
        }
        applyStyles(el, styles);
      }
    }
    applyResponsive();
    applyDarkMode();
    setupGroupHoverListeners();
    setupResizeListener();
    setupDarkModeListener();
    setupMutationObserver();
  }
  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => init());
  }
  return __toCommonJS(src_exports);
})();
//# sourceMappingURL=snap-core.js.map