// snapcss — a tiny runtime utility-first CSS engine
// This is a demo build used by the homepage playground.
(function (global) {
  'use strict';

  // ----- design tokens -----
  const SPACING = {
    0: '0px', px: '1px', 0.5: '2px', 1: '4px', 1.5: '6px', 2: '8px', 2.5: '10px',
    3: '12px', 3.5: '14px', 4: '16px', 5: '20px', 6: '24px', 7: '28px', 8: '32px',
    9: '36px', 10: '40px', 11: '44px', 12: '48px', 14: '56px', 16: '64px',
    20: '80px', 24: '96px', 28: '112px', 32: '128px', 40: '160px', 48: '192px',
    56: '224px', 64: '256px',
  };

  const FONT_SIZE = {
    xs: ['12px', '16px'], sm: ['14px', '20px'], base: ['16px', '24px'],
    lg: ['18px', '28px'], xl: ['20px', '28px'], '2xl': ['24px', '32px'],
    '3xl': ['30px', '36px'], '4xl': ['36px', '40px'], '5xl': ['48px', '1'],
    '6xl': ['60px', '1'], '7xl': ['72px', '1'], '8xl': ['96px', '1'],
  };

  const FONT_WEIGHT = {
    thin: 100, extralight: 200, light: 300, normal: 400, medium: 500,
    semibold: 600, bold: 700, extrabold: 800, black: 900,
  };

  const RADIUS = {
    none: '0', sm: '2px', md: '6px', lg: '8px', xl: '12px', '2xl': '16px',
    '3xl': '24px', '4xl': '32px', full: '9999px',
  };

  const SHADOW = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.4)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 40px rgb(34 211 238 / 0.45)',
  };

  // Tailwind-ish color palette (subset, enough for the demo)
  const COLORS = (function makeColors() {
    const palette = {
      slate:  ['#f8fafc','#f1f5f9','#e2e8f0','#cbd5e1','#94a3b8','#64748b','#475569','#334155','#1e293b','#0f172a','#020617'],
      gray:   ['#f9fafb','#f3f4f6','#e5e7eb','#d1d5db','#9ca3af','#6b7280','#4b5563','#374151','#1f2937','#111827','#030712'],
      zinc:   ['#fafafa','#f4f4f5','#e4e4e7','#d4d4d8','#a1a1aa','#71717a','#52525b','#3f3f46','#27272a','#18181b','#09090b'],
      red:    ['#fef2f2','#fee2e2','#fecaca','#fca5a5','#f87171','#ef4444','#dc2626','#b91c1c','#991b1b','#7f1d1d','#450a0a'],
      orange: ['#fff7ed','#ffedd5','#fed7aa','#fdba74','#fb923c','#f97316','#ea580c','#c2410c','#9a3412','#7c2d12','#431407'],
      amber:  ['#fffbeb','#fef3c7','#fde68a','#fcd34d','#fbbf24','#f59e0b','#d97706','#b45309','#92400e','#78350f','#451a03'],
      yellow: ['#fefce8','#fef9c3','#fef08a','#fde047','#facc15','#eab308','#ca8a04','#a16207','#854d0e','#713f12','#422006'],
      lime:   ['#f7fee7','#ecfccb','#d9f99d','#bef264','#a3e635','#84cc16','#65a30d','#4d7c0f','#3f6212','#365314','#1a2e05'],
      green:  ['#f0fdf4','#dcfce7','#bbf7d0','#86efac','#4ade80','#22c55e','#16a34a','#15803d','#166534','#14532d','#052e16'],
      emerald:['#ecfdf5','#d1fae5','#a7f3d0','#6ee7b7','#34d399','#10b981','#059669','#047857','#065f46','#064e3b','#022c22'],
      teal:   ['#f0fdfa','#ccfbf1','#99f6e4','#5eead4','#2dd4bf','#14b8a6','#0d9488','#0f766e','#115e59','#134e4a','#042f2e'],
      cyan:   ['#ecfeff','#cffafe','#a5f3fc','#67e8f9','#22d3ee','#06b6d4','#0891b2','#0e7490','#155e75','#164e63','#083344'],
      sky:    ['#f0f9ff','#e0f2fe','#bae6fd','#7dd3fc','#38bdf8','#0ea5e9','#0284c7','#0369a1','#075985','#0c4a6e','#082f49'],
      blue:   ['#eff6ff','#dbeafe','#bfdbfe','#93c5fd','#60a5fa','#3b82f6','#2563eb','#1d4ed8','#1e40af','#1e3a8a','#172554'],
      indigo: ['#eef2ff','#e0e7ff','#c7d2fe','#a5b4fc','#818cf8','#6366f1','#4f46e5','#4338ca','#3730a3','#312e81','#1e1b4b'],
      violet: ['#f5f3ff','#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9','#5b21b6','#4c1d95','#2e1065'],
      purple: ['#faf5ff','#f3e8ff','#e9d5ff','#d8b4fe','#c084fc','#a855f7','#9333ea','#7e22ce','#6b21a8','#581c87','#3b0764'],
      fuchsia:['#fdf4ff','#fae8ff','#f5d0fe','#f0abfc','#e879f9','#d946ef','#c026d3','#a21caf','#86198f','#701a75','#4a044e'],
      pink:   ['#fdf2f8','#fce7f3','#fbcfe8','#f9a8d4','#f472b6','#ec4899','#db2777','#be185d','#9d174d','#831843','#500724'],
      rose:   ['#fff1f2','#ffe4e6','#fecdd3','#fda4af','#fb7185','#f43f5e','#e11d48','#be123c','#9f1239','#881337','#4c0519'],
    };
    const shades = [50,100,200,300,400,500,600,700,800,900,950];
    const out = { white: '#ffffff', black: '#000000', transparent: 'transparent', current: 'currentColor' };
    for (const name in palette) {
      out[name] = {};
      palette[name].forEach((hex, i) => { out[name][shades[i]] = hex; });
    }
    return out;
  })();

  function lookupColor(name, shade) {
    if (!name) return null;
    if (typeof COLORS[name] === 'string') return COLORS[name];
    if (COLORS[name] && shade && COLORS[name][shade]) return COLORS[name][shade];
    return null;
  }

  function sz(v) {
    if (v == null) return null;
    if (SPACING[v] != null) return SPACING[v];
    if (/^\d+$/.test(v)) return (parseInt(v, 10) * 4) + 'px';
    return null;
  }

  // ----- resolver -----
  // Each entry: prefix or exact match → function(parts) → style object
  function resolve(cls) {
    const tokens = cls.split('-');
    const head = tokens[0];

    // display
    const DISPLAY = { flex:'flex', grid:'grid', block:'block', inline:'inline', hidden:'none', 'inline-flex':'inline-flex', 'inline-block':'inline-block' };
    if (DISPLAY[cls]) return { display: DISPLAY[cls] };

    if (cls === 'italic') return { fontStyle: 'italic' };
    if (cls === 'not-italic') return { fontStyle: 'normal' };
    if (cls === 'underline') return { textDecoration: 'underline' };
    if (cls === 'uppercase') return { textTransform: 'uppercase' };
    if (cls === 'lowercase') return { textTransform: 'lowercase' };
    if (cls === 'capitalize') return { textTransform: 'capitalize' };
    if (cls === 'truncate') return { overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' };
    if (cls === 'rounded') return { borderRadius: '4px' };
    if (cls === 'border') return { borderWidth: '1px', borderStyle: 'solid' };
    if (cls === 'shadow') return { boxShadow: SHADOW.md };

    // padding / margin
    const PM = { p:'padding', m:'margin', px:['paddingLeft','paddingRight'], py:['paddingTop','paddingBottom'],
                 pt:'paddingTop', pr:'paddingRight', pb:'paddingBottom', pl:'paddingLeft',
                 mx:['marginLeft','marginRight'], my:['marginTop','marginBottom'],
                 mt:'marginTop', mr:'marginRight', mb:'marginBottom', ml:'marginLeft' };
    if (PM[head] && tokens.length === 2) {
      const v = sz(tokens[1]);
      if (v == null) return null;
      const target = PM[head];
      if (Array.isArray(target)) { const o = {}; target.forEach(t => o[t]=v); return o; }
      return { [target]: v };
    }

    // gap
    if (head === 'gap' && tokens.length === 2) {
      const v = sz(tokens[1]); if (v) return { gap: v };
    }

    // width / height
    if ((head === 'w' || head === 'h') && tokens.length === 2) {
      const prop = head === 'w' ? 'width' : 'height';
      const v = tokens[1];
      const sized = sz(v);
      if (sized) return { [prop]: sized };
      if (v === 'full') return { [prop]: '100%' };
      if (v === 'screen') return { [prop]: head === 'w' ? '100vw' : '100vh' };
      if (v === 'auto') return { [prop]: 'auto' };
      if (v === 'fit') return { [prop]: 'fit-content' };
      if (/^\d+\/\d+$/.test(v)) {
        const [a, b] = v.split('/').map(Number);
        return { [prop]: (a/b*100).toFixed(4) + '%' };
      }
    }

    // text- family
    if (head === 'text') {
      // size?
      if (tokens.length === 2 && FONT_SIZE[tokens[1]]) {
        const [size, lh] = FONT_SIZE[tokens[1]];
        return { fontSize: size, lineHeight: lh };
      }
      // align?
      if (tokens.length === 2 && ['left','center','right','justify'].includes(tokens[1])) {
        return { textAlign: tokens[1] };
      }
      // color
      if (tokens.length >= 2) {
        const colorName = tokens[1];
        const shade = tokens[2];
        const c = lookupColor(colorName, shade);
        if (c) return { color: c };
      }
    }

    // bg-
    if (head === 'bg' && tokens.length >= 2) {
      const colorName = tokens[1];
      const shade = tokens[2];
      const c = lookupColor(colorName, shade);
      if (c) return { backgroundColor: c };
    }

    // border-
    if (head === 'border' && tokens.length >= 2) {
      // border-N (width)
      if (/^\d+$/.test(tokens[1]) && tokens.length === 2) {
        return { borderWidth: tokens[1]+'px', borderStyle:'solid' };
      }
      // border-color-shade
      const c = lookupColor(tokens[1], tokens[2]);
      if (c) return { borderColor: c, borderStyle:'solid', borderWidth: '1px' };
    }

    // rounded-
    if (head === 'rounded' && tokens.length === 2 && RADIUS[tokens[1]] != null) {
      return { borderRadius: RADIUS[tokens[1]] };
    }

    // shadow-
    if (head === 'shadow' && tokens.length === 2 && SHADOW[tokens[1]] != null) {
      return { boxShadow: SHADOW[tokens[1]] };
    }

    // font-weight
    if (head === 'font' && tokens.length === 2 && FONT_WEIGHT[tokens[1]]) {
      return { fontWeight: FONT_WEIGHT[tokens[1]] };
    }

    // items- / justify-
    if (head === 'items' && tokens.length === 2) {
      const map = { start:'flex-start', center:'center', end:'flex-end', baseline:'baseline', stretch:'stretch' };
      if (map[tokens[1]]) return { alignItems: map[tokens[1]] };
    }
    if (head === 'justify' && tokens.length === 2) {
      const map = { start:'flex-start', center:'center', end:'flex-end', between:'space-between', around:'space-around', evenly:'space-evenly' };
      if (map[tokens[1]]) return { justifyContent: map[tokens[1]] };
    }

    // opacity-N
    if (head === 'opacity' && tokens.length === 2 && /^\d+$/.test(tokens[1])) {
      return { opacity: (parseInt(tokens[1])/100).toString() };
    }

    // tracking- (letter-spacing)
    if (head === 'tracking' && tokens.length === 2) {
      const map = { tighter:'-0.05em', tight:'-0.025em', normal:'0', wide:'0.025em', wider:'0.05em', widest:'0.1em' };
      if (map[tokens[1]]) return { letterSpacing: map[tokens[1]] };
    }

    // leading- (line-height)
    if (head === 'leading' && tokens.length === 2) {
      const map = { none:'1', tight:'1.25', snug:'1.375', normal:'1.5', relaxed:'1.625', loose:'2' };
      if (map[tokens[1]]) return { lineHeight: map[tokens[1]] };
      if (/^\d+$/.test(tokens[1])) return { lineHeight: sz(tokens[1]) };
    }

    return null;
  }

  // ----- parser: strip prefix, return { variant, base } -----
  function parse(cls) {
    // strip optional 'snap-' prefix
    let c = cls.startsWith('snap-') ? cls.slice(5) : cls;
    // variants e.g. hover:bg-red-500
    let variant = null;
    if (c.includes(':')) {
      const parts = c.split(':');
      variant = parts.slice(0, -1);
      c = parts[parts.length - 1];
    }
    return { variant, base: c };
  }

  // Compile a class string into a base style + variant styles
  function compile(classStr) {
    const out = { base: {}, hover: {}, focus: {}, active: {}, dark: {}, responsive: [] };
    if (!classStr) return out;
    const classes = classStr.trim().split(/\s+/);
    for (const cls of classes) {
      const { variant, base } = parse(cls);
      const style = resolve(base);
      if (!style) continue;
      if (!variant) { Object.assign(out.base, style); continue; }
      // recognize variants
      for (const v of variant) {
        if (v === 'hover') Object.assign(out.hover, style);
        else if (v === 'focus') Object.assign(out.focus, style);
        else if (v === 'active') Object.assign(out.active, style);
        else if (v === 'dark') Object.assign(out.dark, style);
        else if (['sm','md','lg','xl','2xl'].includes(v)) {
          out.responsive.push({ bp: v, style });
        }
      }
    }
    return out;
  }

  // Apply compiled styles to a target DOM node with proper event-driven variant handling
  function apply(el, compiled) {
    if (!el) return;
    // Reset inline style first
    el.style.cssText = '';
    Object.assign(el.style, compiled.base);

    // Variants
    el.onmouseenter = () => Object.assign(el.style, compiled.hover);
    el.onmouseleave = () => {
      el.style.cssText = '';
      Object.assign(el.style, compiled.base);
      // re-apply responsive + dark
      applyResponsive(el, compiled);
    };
    el.onmousedown = () => Object.assign(el.style, compiled.active);
    el.onmouseup = () => {
      el.style.cssText='';
      Object.assign(el.style, compiled.base);
      Object.assign(el.style, compiled.hover);
      applyResponsive(el, compiled);
    };
    el.onfocus = () => Object.assign(el.style, compiled.focus);
    el.onblur = () => { el.style.cssText=''; Object.assign(el.style, compiled.base); applyResponsive(el, compiled); };

    applyResponsive(el, compiled);
  }

  function applyResponsive(el, compiled) {
    const bp = { sm:640, md:768, lg:1024, xl:1280, '2xl':1536 };
    const w = window.innerWidth;
    for (const { bp: b, style } of compiled.responsive) {
      if (w >= bp[b]) Object.assign(el.style, style);
    }
    if (compiled.dark && Object.keys(compiled.dark).length) {
      if (document.documentElement.classList.contains('dark') ||
          window.matchMedia('(prefers-color-scheme: dark)').matches) {
        Object.assign(el.style, compiled.dark);
      }
    }
  }

  global.snapcss = { compile, apply, resolve, parse, COLORS, SPACING };
})(window);
