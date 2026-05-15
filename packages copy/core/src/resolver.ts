import { ParsedClass } from "@snapcss/parser";
import {
  spacingScale, resolveColor,
  fontSizes, fontWeights, lineHeights, letterSpacings, fontFamilies,
  zIndexScale, overflowValues,
  justifyContentValues, alignItemsValues, alignSelfValues, alignContentValues,
  flexValues, orderValues, flexBasisValues,
  gridColsScale, gridRowsScale, colSpanValues, rowSpanValues,
  gridStartEndValues, gridAutoFlowValues, gridAutoColsValues, gridAutoRowsValues,
  placeItemsValues, placeContentValues, placeSelfValues,
  sizingScale, heightScale, maxWidthScale,
  borderWidthScale, borderRadiusScale, borderStyleValues,
  outlineWidthScale, outlineOffsetScale,
  shadowScale,
  transitionPropertyValues, transitionDurationScale,
  transitionTimingValues, transitionDelayScale,
  scaleValues, rotateValues, skewValues,
  bgSizeValues, bgPositionValues, bgRepeatValues, bgAttachmentValues,
} from "@snapcss/utilities";

type Styles = Record<string, string>;

function sp(value: string, isArb: boolean): string {
  return isArb ? value : (spacingScale[value] ?? value);
}

function col(value: string, isArb: boolean): string | undefined {
  if (isArb) return isColorLike(value) ? value : undefined;
  return resolveColor(value);
}

function isColorLike(v: string): boolean {
  return /^(#|rgb|hsl|oklch|color\(|hwb|lch|lab)/.test(v) || /^[a-zA-Z]+$/.test(v);
}

function lk(map: Record<string, string>, value: string, isArb: boolean): string {
  if (isArb) return value;
  return map[value] ?? map["DEFAULT"] ?? value;
}

function br(value: string, isArb: boolean): string {
  return isArb ? value : (borderRadiusScale[value] ?? borderRadiusScale["DEFAULT"] ?? "4px");
}

export function resolve(parsed: ParsedClass): Styles {
  const { utility, value, isArbitrary: isArb } = parsed;

  switch (utility) {
    // ── Padding ──────────────────────────────────────────────
    case "p":  return { padding: sp(value, isArb) };
    case "pt": return { paddingTop: sp(value, isArb) };
    case "pb": return { paddingBottom: sp(value, isArb) };
    case "pl": return { paddingLeft: sp(value, isArb) };
    case "pr": return { paddingRight: sp(value, isArb) };
    case "px": return { paddingLeft: sp(value, isArb), paddingRight: sp(value, isArb) };
    case "py": return { paddingTop: sp(value, isArb), paddingBottom: sp(value, isArb) };

    // ── Margin ───────────────────────────────────────────────
    case "m":  return { margin: sp(value, isArb) };
    case "mt": return { marginTop: sp(value, isArb) };
    case "mb": return { marginBottom: sp(value, isArb) };
    case "ml": return { marginLeft: sp(value, isArb) };
    case "mr": return { marginRight: sp(value, isArb) };
    case "mx": return { marginLeft: sp(value, isArb), marginRight: sp(value, isArb) };
    case "my": return { marginTop: sp(value, isArb), marginBottom: sp(value, isArb) };

    // ── Sizing ───────────────────────────────────────────────
    case "w":     return { width: isArb ? value : (sizingScale[value] ?? value) };
    case "h":     return { height: isArb ? value : (heightScale[value] ?? value) };
    case "min-w": return { minWidth: isArb ? value : (sizingScale[value] ?? value) };
    case "max-w": return { maxWidth: isArb ? value : (maxWidthScale[value] ?? value) };
    case "min-h": return { minHeight: isArb ? value : (heightScale[value] ?? value) };
    case "max-h": return { maxHeight: isArb ? value : (heightScale[value] ?? value) };

    // ── Inset ────────────────────────────────────────────────
    case "top":    return { top: sp(value, isArb) };
    case "right":  return { right: sp(value, isArb) };
    case "bottom": return { bottom: sp(value, isArb) };
    case "left":   return { left: sp(value, isArb) };
    case "inset":  { const v = sp(value, isArb); return { top: v, right: v, bottom: v, left: v }; }
    case "inset-x": return { left: sp(value, isArb), right: sp(value, isArb) };
    case "inset-y": return { top: sp(value, isArb), bottom: sp(value, isArb) };

    // ── Layout ───────────────────────────────────────────────
    case "block":        return { display: "block" };
    case "inline-block": return { display: "inline-block" };
    case "inline":       return { display: "inline" };
    case "inline-flex":  return { display: "inline-flex" };
    case "inline-grid":  return { display: "inline-grid" };
    case "hidden":       return { display: "none" };
    case "table":        return { display: "table" };
    case "table-cell":   return { display: "table-cell" };
    case "table-row":    return { display: "table-row" };
    case "flow-root":    return { display: "flow-root" };
    case "contents":     return { display: "contents" };
    case "relative": return { position: "relative" };
    case "absolute": return { position: "absolute" };
    case "fixed":    return { position: "fixed" };
    case "sticky":   return { position: "sticky" };
    case "static":   return { position: "static" };
    case "visible":   return { visibility: "visible" };
    case "invisible": return { visibility: "hidden" };
    case "z": return { zIndex: isArb ? value : (zIndexScale[value] ?? value) };
    case "overflow-hidden":  return { overflow: "hidden" };
    case "overflow-auto":    return { overflow: "auto" };
    case "overflow-scroll":  return { overflow: "scroll" };
    case "overflow-visible": return { overflow: "visible" };
    case "overflow-clip":    return { overflow: "clip" };
    case "overflow-x": return { overflowX: lk(overflowValues, value, isArb) };
    case "overflow-y": return { overflowY: lk(overflowValues, value, isArb) };
    case "float-left":  return { float: "left" };
    case "float-right": return { float: "right" };
    case "float-none":  return { float: "none" };
    case "clear-left":  return { clear: "left" };
    case "clear-right": return { clear: "right" };
    case "clear-both":  return { clear: "both" };
    case "clear-none":  return { clear: "none" };
    case "box-border":  return { boxSizing: "border-box" };
    case "box-content": return { boxSizing: "content-box" };

    // ── Flexbox ──────────────────────────────────────────────
    case "flex": return value ? { flex: lk(flexValues, value, isArb) } : { display: "flex" };
    case "flex-1":       return { flex: "1 1 0%" };
    case "flex-auto":    return { flex: "1 1 auto" };
    case "flex-initial": return { flex: "0 1 auto" };
    case "flex-none":    return { flex: "none" };
    case "flex-row":          return { flexDirection: "row" };
    case "flex-col":          return { flexDirection: "column" };
    case "flex-row-reverse":  return { flexDirection: "row-reverse" };
    case "flex-col-reverse":  return { flexDirection: "column-reverse" };
    case "flex-wrap":         return { flexWrap: "wrap" };
    case "flex-nowrap":       return { flexWrap: "nowrap" };
    case "flex-wrap-reverse": return { flexWrap: "wrap-reverse" };
    case "grow":   return { flexGrow: "1" };
    case "grow-0": return { flexGrow: "0" };
    case "shrink":   return { flexShrink: "1" };
    case "shrink-0": return { flexShrink: "0" };
    case "basis":   return { flexBasis: isArb ? value : (flexBasisValues[value] ?? spacingScale[value] ?? value) };
    case "order":   return { order: isArb ? value : (orderValues[value] ?? value) };
    case "justify": return { justifyContent: lk(justifyContentValues, value, isArb) };
    case "items":   return { alignItems: lk(alignItemsValues, value, isArb) };
    case "self":    return { alignSelf: lk(alignSelfValues, value, isArb) };
    case "content": return { alignContent: lk(alignContentValues, value, isArb) };
    case "gap":   return { gap: sp(value, isArb) };
    case "gap-x": return { columnGap: sp(value, isArb) };
    case "gap-y": return { rowGap: sp(value, isArb) };

    // ── Grid ─────────────────────────────────────────────────
    case "grid":      return value ? {} : { display: "grid" };
    case "grid-cols": return { gridTemplateColumns: isArb ? value : (gridColsScale[value] ?? value) };
    case "grid-rows": return { gridTemplateRows: isArb ? value : (gridRowsScale[value] ?? value) };
    case "col-span":  return { gridColumn: isArb ? value : (colSpanValues[value] ?? value) };
    case "col-start": return { gridColumnStart: lk(gridStartEndValues, value, isArb) };
    case "col-end":   return { gridColumnEnd: lk(gridStartEndValues, value, isArb) };
    case "row-span":  return { gridRow: isArb ? value : (rowSpanValues[value] ?? value) };
    case "row-start": return { gridRowStart: lk(gridStartEndValues, value, isArb) };
    case "row-end":   return { gridRowEnd: lk(gridStartEndValues, value, isArb) };
    case "grid-flow": return { gridAutoFlow: lk(gridAutoFlowValues, value, isArb) };
    case "auto-cols": return { gridAutoColumns: lk(gridAutoColsValues, value, isArb) };
    case "auto-rows": return { gridAutoRows: lk(gridAutoRowsValues, value, isArb) };
    case "place-items":   return { placeItems: lk(placeItemsValues, value, isArb) };
    case "place-content": return { placeContent: lk(placeContentValues, value, isArb) };
    case "place-self":    return { placeSelf: lk(placeSelfValues, value, isArb) };

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
    case "font-sans":  return { fontFamily: fontFamilies.sans };
    case "font-serif": return { fontFamily: fontFamilies.serif };
    case "font-mono":  return { fontFamily: fontFamilies.mono };
    case "leading":  return { lineHeight: isArb ? value : (lineHeights[value] ?? value) };
    case "tracking": return { letterSpacing: isArb ? value : (letterSpacings[value] ?? value) };
    case "italic":     return { fontStyle: "italic" };
    case "not-italic": return { fontStyle: "normal" };
    case "uppercase":   return { textTransform: "uppercase" };
    case "lowercase":   return { textTransform: "lowercase" };
    case "capitalize":  return { textTransform: "capitalize" };
    case "normal-case": return { textTransform: "none" };
    case "underline":    return { textDecorationLine: "underline" };
    case "overline":     return { textDecorationLine: "overline" };
    case "line-through": return { textDecorationLine: "line-through" };
    case "no-underline": return { textDecorationLine: "none" };
    case "text-left":    return { textAlign: "left" };
    case "text-center":  return { textAlign: "center" };
    case "text-right":   return { textAlign: "right" };
    case "text-justify": return { textAlign: "justify" };
    case "truncate":      return { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
    case "text-ellipsis": return { textOverflow: "ellipsis" };
    case "text-clip":     return { textOverflow: "clip" };
    case "whitespace-normal":   return { whiteSpace: "normal" };
    case "whitespace-nowrap":   return { whiteSpace: "nowrap" };
    case "whitespace-pre":      return { whiteSpace: "pre" };
    case "whitespace-pre-line": return { whiteSpace: "pre-line" };
    case "whitespace-pre-wrap": return { whiteSpace: "pre-wrap" };
    case "break-normal": return { overflowWrap: "normal", wordBreak: "normal" };
    case "break-words":  return { overflowWrap: "break-word" };
    case "break-all":    return { wordBreak: "break-all" };
    case "line-clamp": {
      if (value === "none") return { WebkitLineClamp: "unset" };
      return { overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: value };
    }

    // ── Background ───────────────────────────────────────────
    case "bg": {
      const c = col(value, isArb);
      return c ? { backgroundColor: c } : {};
    }
    case "bg-cover":         return { backgroundSize: "cover" };
    case "bg-contain":       return { backgroundSize: "contain" };
    case "bg-auto":          return { backgroundSize: "auto" };
    case "bg-center":        return { backgroundPosition: "center" };
    case "bg-top":           return { backgroundPosition: "top" };
    case "bg-bottom":        return { backgroundPosition: "bottom" };
    case "bg-left":          return { backgroundPosition: "left" };
    case "bg-right":         return { backgroundPosition: "right" };
    case "bg-left-top":      return { backgroundPosition: "left top" };
    case "bg-right-top":     return { backgroundPosition: "right top" };
    case "bg-left-bottom":   return { backgroundPosition: "left bottom" };
    case "bg-right-bottom":  return { backgroundPosition: "right bottom" };
    case "bg-no-repeat":  return { backgroundRepeat: "no-repeat" };
    case "bg-repeat":     return { backgroundRepeat: "repeat" };
    case "bg-repeat-x":   return { backgroundRepeat: "repeat-x" };
    case "bg-repeat-y":   return { backgroundRepeat: "repeat-y" };
    case "bg-fixed":  return { backgroundAttachment: "fixed" };
    case "bg-local":  return { backgroundAttachment: "local" };
    case "bg-scroll": return { backgroundAttachment: "scroll" };

    // ── Border Width ─────────────────────────────────────────
    case "border": {
      if (!value) return { borderWidth: "1px" };
      const bStyle = borderStyleValues[value];
      if (bStyle) return { borderStyle: bStyle };
      const bColor = col(value, isArb);
      if (bColor) return { borderColor: bColor };
      return { borderWidth: isArb ? value : (borderWidthScale[value] ?? value) };
    }
    case "border-t": {
      const c = col(value, isArb);
      return c ? { borderTopColor: c } : { borderTopWidth: isArb ? value : (borderWidthScale[value] ?? value) };
    }
    case "border-b": {
      const c = col(value, isArb);
      return c ? { borderBottomColor: c } : { borderBottomWidth: isArb ? value : (borderWidthScale[value] ?? value) };
    }
    case "border-l": {
      const c = col(value, isArb);
      return c ? { borderLeftColor: c } : { borderLeftWidth: isArb ? value : (borderWidthScale[value] ?? value) };
    }
    case "border-r": {
      const c = col(value, isArb);
      return c ? { borderRightColor: c } : { borderRightWidth: isArb ? value : (borderWidthScale[value] ?? value) };
    }
    case "border-x": { const w = isArb ? value : (borderWidthScale[value] ?? value); return { borderLeftWidth: w, borderRightWidth: w }; }
    case "border-y": { const w = isArb ? value : (borderWidthScale[value] ?? value); return { borderTopWidth: w, borderBottomWidth: w }; }
    case "border-solid":  return { borderStyle: "solid" };
    case "border-dashed": return { borderStyle: "dashed" };
    case "border-dotted": return { borderStyle: "dotted" };
    case "border-double": return { borderStyle: "double" };
    case "border-hidden": return { borderStyle: "hidden" };
    case "border-none":   return { borderStyle: "none" };

    // ── Border Radius ────────────────────────────────────────
    case "rounded":    return { borderRadius: br(value, isArb) };
    case "rounded-t":  return { borderTopLeftRadius: br(value, isArb), borderTopRightRadius: br(value, isArb) };
    case "rounded-b":  return { borderBottomLeftRadius: br(value, isArb), borderBottomRightRadius: br(value, isArb) };
    case "rounded-l":  return { borderTopLeftRadius: br(value, isArb), borderBottomLeftRadius: br(value, isArb) };
    case "rounded-r":  return { borderTopRightRadius: br(value, isArb), borderBottomRightRadius: br(value, isArb) };
    case "rounded-tl": return { borderTopLeftRadius: br(value, isArb) };
    case "rounded-tr": return { borderTopRightRadius: br(value, isArb) };
    case "rounded-bl": return { borderBottomLeftRadius: br(value, isArb) };
    case "rounded-br": return { borderBottomRightRadius: br(value, isArb) };

    // ── Outline ──────────────────────────────────────────────
    case "outline-none":   return { outline: "2px solid transparent", outlineOffset: "2px" };
    case "outline": {
      if (!value) return { outlineStyle: "solid" };
      const c = col(value, isArb);
      if (c) return { outlineColor: c };
      return { outlineWidth: isArb ? value : (outlineWidthScale[value] ?? value) };
    }
    case "outline-offset": return { outlineOffset: isArb ? value : (outlineOffsetScale[value] ?? value) };

    // ── Shadow ───────────────────────────────────────────────
    case "shadow": return { boxShadow: isArb ? value : (shadowScale[value] ?? shadowScale["DEFAULT"]) };

    // ── Opacity ──────────────────────────────────────────────
    case "opacity": return { opacity: isArb ? value : String(parseInt(value) / 100) };

    // ── Transitions ──────────────────────────────────────────
    case "transition": {
      if (!value) return { transitionProperty: transitionPropertyValues["DEFAULT"], transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
      return { transitionProperty: isArb ? value : (transitionPropertyValues[value] ?? value) };
    }
    case "transition-all":       return { transitionProperty: "all", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
    case "transition-colors":    return { transitionProperty: transitionPropertyValues.colors, transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
    case "transition-opacity":   return { transitionProperty: "opacity", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
    case "transition-shadow":    return { transitionProperty: "box-shadow", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
    case "transition-transform": return { transitionProperty: "transform", transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)", transitionDuration: "150ms" };
    case "transition-none":      return { transitionProperty: "none" };
    case "duration": return { transitionDuration: isArb ? value : (transitionDurationScale[value] ?? value) };
    case "ease-linear":  return { transitionTimingFunction: "linear" };
    case "ease-in":      return { transitionTimingFunction: "cubic-bezier(0.4,0,1,1)" };
    case "ease-out":     return { transitionTimingFunction: "cubic-bezier(0,0,0.2,1)" };
    case "ease-in-out":  return { transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)" };
    case "ease": return { transitionTimingFunction: isArb ? value : (transitionTimingValues[value] ?? value) };
    case "delay": return { transitionDelay: isArb ? value : (transitionDelayScale[value] ?? value) };

    // ── Transforms ───────────────────────────────────────────
    case "scale":   return { scale: isArb ? value : (scaleValues[value] ?? value) };
    case "scale-x": return { scale: `${isArb ? value : (scaleValues[value] ?? value)} 1` };
    case "scale-y": return { scale: `1 ${isArb ? value : (scaleValues[value] ?? value)}` };
    case "rotate":  return { rotate: isArb ? value : (rotateValues[value] ?? value + "deg") };
    case "translate-x": return { translate: `${sp(value, isArb)} 0` };
    case "translate-y": return { translate: `0 ${sp(value, isArb)}` };
    case "skew-x":  return { transform: `skewX(${isArb ? value : (skewValues[value] ?? value)})` };
    case "skew-y":  return { transform: `skewY(${isArb ? value : (skewValues[value] ?? value)})` };
    case "origin-center":       return { transformOrigin: "center" };
    case "origin-top":          return { transformOrigin: "top" };
    case "origin-top-right":    return { transformOrigin: "top right" };
    case "origin-right":        return { transformOrigin: "right" };
    case "origin-bottom-right": return { transformOrigin: "bottom right" };
    case "origin-bottom":       return { transformOrigin: "bottom" };
    case "origin-bottom-left":  return { transformOrigin: "bottom left" };
    case "origin-left":         return { transformOrigin: "left" };
    case "origin-top-left":     return { transformOrigin: "top left" };

    // ── Cursor ───────────────────────────────────────────────
    case "cursor-auto":        return { cursor: "auto" };
    case "cursor-default":     return { cursor: "default" };
    case "cursor-pointer":     return { cursor: "pointer" };
    case "cursor-wait":        return { cursor: "wait" };
    case "cursor-text":        return { cursor: "text" };
    case "cursor-move":        return { cursor: "move" };
    case "cursor-not-allowed": return { cursor: "not-allowed" };
    case "cursor-grab":        return { cursor: "grab" };
    case "cursor-grabbing":    return { cursor: "grabbing" };
    case "cursor-crosshair":   return { cursor: "crosshair" };
    case "cursor-zoom-in":     return { cursor: "zoom-in" };
    case "cursor-zoom-out":    return { cursor: "zoom-out" };
    case "cursor-none":        return { cursor: "none" };

    // ── Pointer Events / User Select ─────────────────────────
    case "pointer-events": return { pointerEvents: value };
    case "select-none":    return { userSelect: "none" };
    case "select-text":    return { userSelect: "text" };
    case "select-all":     return { userSelect: "all" };
    case "select-auto":    return { userSelect: "auto" };

    // ── Aspect Ratio ─────────────────────────────────────────
    case "aspect-auto":   return { aspectRatio: "auto" };
    case "aspect-square": return { aspectRatio: "1 / 1" };
    case "aspect-video":  return { aspectRatio: "16 / 9" };
    case "aspect": return { aspectRatio: isArb ? value.replace("/", " / ") : value };

    // ── Object fit / position ────────────────────────────────
    case "object-contain":      return { objectFit: "contain" };
    case "object-cover":        return { objectFit: "cover" };
    case "object-fill":         return { objectFit: "fill" };
    case "object-none":         return { objectFit: "none" };
    case "object-scale-down":   return { objectFit: "scale-down" };
    case "object-center":       return { objectPosition: "center" };
    case "object-top":          return { objectPosition: "top" };
    case "object-bottom":       return { objectPosition: "bottom" };
    case "object-left":         return { objectPosition: "left" };
    case "object-right":        return { objectPosition: "right" };
    case "object-left-top":     return { objectPosition: "left top" };
    case "object-right-top":    return { objectPosition: "right top" };
    case "object-left-bottom":  return { objectPosition: "left bottom" };
    case "object-right-bottom": return { objectPosition: "right bottom" };

    // ── Appearance / Resize ──────────────────────────────────
    case "appearance-none": return { appearance: "none" };
    case "appearance-auto": return { appearance: "auto" };
    case "resize":      return { resize: "both" };
    case "resize-x":    return { resize: "horizontal" };
    case "resize-y":    return { resize: "vertical" };
    case "resize-none": return { resize: "none" };

    // ── Space Between (marker for applier) ───────────────────
    case "space-x": return { "--snap-space-x": sp(value, isArb) };
    case "space-y": return { "--snap-space-y": sp(value, isArb) };

    default:
      return {};
  }
}
