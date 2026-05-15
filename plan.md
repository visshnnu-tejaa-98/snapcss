# snapcss — Implementation Plan

## What is snapcss?

A lightweight utility-first **runtime CSS engine** in TypeScript. It scans the DOM for utility classes, parses them, resolves them to CSS style objects, and applies them as inline styles. No CSS files needed — works like a mini TailwindCSS that runs entirely in the browser.

```
DOM → Scanner → Parser → Resolver → Style Applier
```

---

## Class Syntax

### Scale-based (predefined tokens)

| Class | CSS Output |
|---|---|
| `p-4` | `padding: 16px` |
| `m-2` | `margin: 4px` |
| `bg-red-500` | `background-color: #ef4444` |
| `text-xl` | `font-size: 24px` |
| `flex` | `display: flex` |
| `items-center` | `align-items: center` |
| `grid` | `display: grid` |
| `grid-cols-3` | `grid-template-columns: repeat(3, 1fr)` |
| `w-full` | `width: 100%` |
| `rounded-lg` | `border-radius: 8px` |
| `md:p-4` | `padding: 16px` when width ≥ 768px |
| `hover:bg-red-500` | applies on mouseenter |
| `dark:bg-black` | applies when OS dark mode is active |

### Arbitrary Values (bracket notation)

Any utility that accepts a value supports raw CSS inside `[...]`. Underscores inside brackets are automatically converted to spaces for multi-word values.

| Class | CSS Output |
|---|---|
| `p-[150px]` | `padding: 150px` |
| `pt-[150px]` | `padding-top: 150px` |
| `bg-[#ff5733]` | `background-color: #ff5733` |
| `text-[20px]` | `font-size: 20px` |
| `w-[200px]` | `width: 200px` |
| `grid-cols-[1fr_2fr_1fr]` | `grid-template-columns: 1fr 2fr 1fr` |
| `hover:bg-[#ff5733]` | arbitrary value + state modifier |
| `md:p-[150px]` | arbitrary value + responsive modifier |
| `dark:text-[#eee]` | arbitrary value + dark mode modifier |

---

## Padding Utilities

All padding utilities support both scale values and arbitrary values.

| Class | CSS Property | Example output |
|---|---|---|
| `p-{n}` | `padding` | `p-4` → `padding: 16px` |
| `pt-{n}` | `padding-top` | `pt-2` → `padding-top: 4px` |
| `pb-{n}` | `padding-bottom` | `pb-2` → `padding-bottom: 4px` |
| `pl-{n}` | `padding-left` | `pl-2` → `padding-left: 4px` |
| `pr-{n}` | `padding-right` | `pr-2` → `padding-right: 4px` |
| `px-{n}` | `padding-left` + `padding-right` | `px-4` → `padding-left: 16px; padding-right: 16px` |
| `py-{n}` | `padding-top` + `padding-bottom` | `py-4` → `padding-top: 16px; padding-bottom: 16px` |

**Arbitrary examples:**
- `pt-[150px]` → `padding-top: 150px`
- `px-[24px]` → `padding-left: 24px; padding-right: 24px`
- `py-[2rem]` → `padding-top: 2rem; padding-bottom: 2rem`

---

## Margin Utilities

All margin utilities support both scale values and arbitrary values.

| Class | CSS Property | Example output |
|---|---|---|
| `m-{n}` | `margin` | `m-4` → `margin: 16px` |
| `mt-{n}` | `margin-top` | `mt-2` → `margin-top: 4px` |
| `mb-{n}` | `margin-bottom` | `mb-2` → `margin-bottom: 4px` |
| `ml-{n}` | `margin-left` | `ml-2` → `margin-left: 4px` |
| `mr-{n}` | `margin-right` | `mr-2` → `margin-right: 4px` |
| `mx-{n}` | `margin-left` + `margin-right` | `mx-4` → `margin-left: 16px; margin-right: 16px` |
| `my-{n}` | `margin-top` + `margin-bottom` | `my-4` → `margin-top: 16px; margin-bottom: 16px` |
| `mx-auto` | `margin-left: auto; margin-right: auto` | center block element |

**Arbitrary examples:**
- `mt-[150px]` → `margin-top: 150px`
- `mx-[30px]` → `margin-left: 30px; margin-right: 30px`
- `my-[2rem]` → `margin-top: 2rem; margin-bottom: 2rem`

---

## Border Width Utilities

| Class | CSS Property | Example output |
|---|---|---|
| `border-{n}` | `border-width` | `border-2` → `border-width: 2px` |
| `border-t-{n}` | `border-top-width` | `border-t-2` → `border-top-width: 2px` |
| `border-b-{n}` | `border-bottom-width` | `border-b-2` → `border-bottom-width: 2px` |
| `border-l-{n}` | `border-left-width` | `border-l-2` → `border-left-width: 2px` |
| `border-r-{n}` | `border-right-width` | `border-r-2` → `border-right-width: 2px` |
| `border-x-{n}` | `border-left-width` + `border-right-width` | `border-x-2` → both sides 2px |
| `border-y-{n}` | `border-top-width` + `border-bottom-width` | `border-y-2` → both sides 2px |

**Arbitrary examples:**
- `border-t-[3px]` → `border-top-width: 3px`
- `border-x-[2px]` → `border-left-width: 2px; border-right-width: 2px`

---

## Border Radius Utilities

| Class | CSS Property | Example output |
|---|---|---|
| `rounded-{s}` | `border-radius` | `rounded-lg` → `border-radius: 8px` |
| `rounded-t-{s}` | `border-top-left-radius` + `border-top-right-radius` | top two corners |
| `rounded-b-{s}` | `border-bottom-left-radius` + `border-bottom-right-radius` | bottom two corners |
| `rounded-l-{s}` | `border-top-left-radius` + `border-bottom-left-radius` | left two corners |
| `rounded-r-{s}` | `border-top-right-radius` + `border-bottom-right-radius` | right two corners |
| `rounded-tl-{s}` | `border-top-left-radius` | single corner |
| `rounded-tr-{s}` | `border-top-right-radius` | single corner |
| `rounded-bl-{s}` | `border-bottom-left-radius` | single corner |
| `rounded-br-{s}` | `border-bottom-right-radius` | single corner |

**Scale values for border-radius:** `none=0`, `sm=2px`, `md=4px`, `lg=8px`, `xl=12px`, `2xl=16px`, `3xl=24px`, `full=9999px`

**Arbitrary examples:**
- `rounded-[6px]` → `border-radius: 6px`
- `rounded-t-[12px]` → `border-top-left-radius: 12px; border-top-right-radius: 12px`
- `rounded-tl-[8px]` → `border-top-left-radius: 8px`

---

## Inset (Positioning Offsets)

All inset utilities support both scale values and arbitrary values. Use with `relative`, `absolute`, `fixed`, `sticky`.

| Class | CSS Property | Example output |
|---|---|---|
| `top-{n}` | `top` | `top-4` → `top: 16px` |
| `right-{n}` | `right` | `right-2` → `right: 4px` |
| `bottom-{n}` | `bottom` | `bottom-0` → `bottom: 0px` |
| `left-{n}` | `left` | `left-4` → `left: 16px` |
| `inset-{n}` | `top` + `right` + `bottom` + `left` | `inset-0` → all sides 0 |
| `inset-x-{n}` | `left` + `right` | `inset-x-4` → left+right 16px |
| `inset-y-{n}` | `top` + `bottom` | `inset-y-4` → top+bottom 16px |

Special values: `auto`, `full=100%`, `1/2=50%`, `1/3=33.333%`, `2/3=66.666%`

**Arbitrary examples:**
- `top-[10px]` → `top: 10px`
- `inset-[0]` → all sides 0
- `inset-x-[50%]` → `left: 50%; right: 50%`
- `left-[-16px]` → `left: -16px`

---

## Box Shadow

| Class | CSS (box-shadow) | Example |
|---|---|---|
| `shadow-none` | `none` | removes shadow |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | subtle shadow |
| `shadow` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | default shadow |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` | medium |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | large |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | extra large |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` | 2x extra large |
| `shadow-inner` | `inset 0 2px 4px rgba(0,0,0,0.06)` | inset shadow |

**Arbitrary examples:**
- `shadow-[0_4px_6px_rgba(0,0,0,0.1)]` → `box-shadow: 0 4px 6px rgba(0,0,0,0.1)` (underscores → spaces)
- `hover:shadow-lg` → shadow on hover
- `dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]` → stronger shadow in dark mode

---

## Transitions

| Class | CSS | Notes |
|---|---|---|
| `transition` | `transition-property: color, background-color, border-color, opacity, box-shadow, transform; timing: cubic-bezier(0.4,0,0.2,1); duration: 150ms` | most-used properties |
| `transition-all` | all CSS properties | slower, use sparingly |
| `transition-colors` | color, background-color, border-color, fill, stroke | color changes only |
| `transition-opacity` | opacity | fade in/out |
| `transition-shadow` | box-shadow | shadow changes |
| `transition-transform` | transform | movement/scale |
| `transition-none` | `transition-property: none` | disable transition |
| `duration-75` | `transition-duration: 75ms` | |
| `duration-100` | `transition-duration: 100ms` | |
| `duration-150` | `transition-duration: 150ms` | default |
| `duration-200` | `transition-duration: 200ms` | |
| `duration-300` | `transition-duration: 300ms` | |
| `duration-500` | `transition-duration: 500ms` | |
| `duration-700` | `transition-duration: 700ms` | |
| `duration-1000` | `transition-duration: 1000ms` | |
| `ease-linear` | `transition-timing-function: linear` | |
| `ease-in` | `transition-timing-function: cubic-bezier(0.4,0,1,1)` | |
| `ease-out` | `transition-timing-function: cubic-bezier(0,0,0.2,1)` | |
| `ease-in-out` | `transition-timing-function: cubic-bezier(0.4,0,0.2,1)` | |
| `delay-75` | `transition-delay: 75ms` | |
| `delay-100` | `transition-delay: 100ms` | |
| `delay-150` | `transition-delay: 150ms` | |
| `delay-200` | `transition-delay: 200ms` | |
| `delay-300` | `transition-delay: 300ms` | |
| `delay-500` | `transition-delay: 500ms` | |

**Arbitrary examples:**
- `duration-[400ms]` → `transition-duration: 400ms`
- `delay-[200ms]` → `transition-delay: 200ms`
- `ease-[cubic-bezier(0.1,0.7,1,0.1)]` → custom easing

**Common pattern:** `transition duration-300 ease-in-out hover:bg-blue-600`

---

## Transforms

Uses CSS Transforms Level 2 individual properties (`scale`, `rotate`, `translate`) which compose naturally when multiple transform utilities are applied to the same element.

| Class | CSS property | Values |
|---|---|---|
| `scale-{n}` | `scale: n` | 0, 50, 75, 90, 95, 100, 105, 110, 125, 150 → divided by 100 (e.g. 110 → 1.1) |
| `scale-x-{n}` | `scale: n 1` | same scale |
| `scale-y-{n}` | `scale: 1 n` | same scale |
| `rotate-{n}` | `rotate: ndeg` | 0, 1, 2, 3, 6, 12, 45, 90, 180 |
| `translate-x-{n}` | `translate: v 0` | spacing scale |
| `translate-y-{n}` | `translate: 0 v` | spacing scale |
| `skew-x-{n}` | `transform: skewX(ndeg)` | 0, 1, 2, 3, 6, 12 |
| `skew-y-{n}` | `transform: skewY(ndeg)` | same |
| `origin-center` | `transform-origin: center` | |
| `origin-top` | `transform-origin: top` | |
| `origin-top-right` | `transform-origin: top right` | |
| `origin-right` | `transform-origin: right` | |
| `origin-bottom-right` | `transform-origin: bottom right` | |
| `origin-bottom` | `transform-origin: bottom` | |
| `origin-bottom-left` | `transform-origin: bottom left` | |
| `origin-left` | `transform-origin: left` | |
| `origin-top-left` | `transform-origin: top left` | |

**Arbitrary examples:**
- `scale-[1.35]` → `scale: 1.35`
- `rotate-[30deg]` → `rotate: 30deg`
- `rotate-[-45deg]` → `rotate: -45deg` (negative rotation)
- `translate-x-[200px]` → `translate: 200px 0`

**Common pattern:** `transition-transform duration-200 hover:scale-110`

---

## Text Utilities

| Class | CSS Property | Example |
|---|---|---|
| `text-left` | `text-align: left` | |
| `text-center` | `text-align: center` | |
| `text-right` | `text-align: right` | |
| `text-justify` | `text-align: justify` | |
| `italic` | `font-style: italic` | |
| `not-italic` | `font-style: normal` | |
| `uppercase` | `text-transform: uppercase` | `uppercase` → `HELLO` |
| `lowercase` | `text-transform: lowercase` | `lowercase` → `hello` |
| `capitalize` | `text-transform: capitalize` | `capitalize` → `Hello` |
| `normal-case` | `text-transform: none` | reset transform |
| `underline` | `text-decoration-line: underline` | |
| `overline` | `text-decoration-line: overline` | |
| `line-through` | `text-decoration-line: line-through` | strikethrough |
| `no-underline` | `text-decoration-line: none` | remove decoration |
| `truncate` | `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` | single-line ellipsis |
| `text-ellipsis` | `text-overflow: ellipsis` | |
| `text-clip` | `text-overflow: clip` | |
| `whitespace-normal` | `white-space: normal` | |
| `whitespace-nowrap` | `white-space: nowrap` | |
| `whitespace-pre` | `white-space: pre` | |
| `whitespace-pre-line` | `white-space: pre-line` | |
| `whitespace-pre-wrap` | `white-space: pre-wrap` | |
| `break-normal` | `overflow-wrap: normal; word-break: normal` | |
| `break-words` | `overflow-wrap: break-word` | |
| `break-all` | `word-break: break-all` | |
| `font-sans` | `font-family: ui-sans-serif, system-ui, sans-serif` | |
| `font-serif` | `font-family: ui-serif, Georgia, serif` | |
| `font-mono` | `font-family: ui-monospace, Menlo, monospace` | |
| `line-clamp-1` | `overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1` | truncate after 1 line |
| `line-clamp-2` | same with `-webkit-line-clamp: 2` | truncate after 2 lines |
| `line-clamp-3` through `line-clamp-6` | same pattern | |
| `line-clamp-none` | unsets line-clamp | |

---

## Cursor

| Class | CSS | Class | CSS |
|---|---|---|---|
| `cursor-auto` | `cursor: auto` | `cursor-move` | `cursor: move` |
| `cursor-default` | `cursor: default` | `cursor-not-allowed` | `cursor: not-allowed` |
| `cursor-pointer` | `cursor: pointer` | `cursor-grab` | `cursor: grab` |
| `cursor-wait` | `cursor: wait` | `cursor-grabbing` | `cursor: grabbing` |
| `cursor-text` | `cursor: text` | `cursor-crosshair` | `cursor: crosshair` |
| `cursor-none` | `cursor: none` | `cursor-zoom-in` | `cursor: zoom-in` |
| | | `cursor-zoom-out` | `cursor: zoom-out` |

**Example:** `cursor-pointer hover:bg-blue-500` — typical interactive button pattern

---

## Pointer Events + User Select

| Class | CSS |
|---|---|
| `pointer-events-none` | `pointer-events: none` |
| `pointer-events-auto` | `pointer-events: auto` |
| `select-none` | `user-select: none` |
| `select-text` | `user-select: text` |
| `select-all` | `user-select: all` |
| `select-auto` | `user-select: auto` |

---

## Visibility + Overflow Directional

| Class | CSS |
|---|---|
| `visible` | `visibility: visible` |
| `invisible` | `visibility: hidden` |
| `overflow-x-auto` | `overflow-x: auto` |
| `overflow-x-hidden` | `overflow-x: hidden` |
| `overflow-x-scroll` | `overflow-x: scroll` |
| `overflow-x-visible` | `overflow-x: visible` |
| `overflow-y-auto` | `overflow-y: auto` |
| `overflow-y-hidden` | `overflow-y: hidden` |
| `overflow-y-scroll` | `overflow-y: scroll` |
| `overflow-y-visible` | `overflow-y: visible` |

**Examples:**
- `overflow-x-hidden overflow-y-auto` → horizontal clip, vertical scroll
- `invisible` → hides element but keeps layout space (unlike `hidden`)

---

## Flex Extras

| Class | CSS | Example |
|---|---|---|
| `grow` | `flex-grow: 1` | `grow` → fills remaining space |
| `grow-0` | `flex-grow: 0` | prevent growing |
| `shrink` | `flex-shrink: 1` | allow shrinking |
| `shrink-0` | `flex-shrink: 0` | prevent shrinking |
| `flex-1` | `flex: 1 1 0%` | grow + shrink + 0 basis |
| `flex-auto` | `flex: 1 1 auto` | grow + shrink + auto basis |
| `flex-initial` | `flex: 0 1 auto` | don't grow, can shrink |
| `flex-none` | `flex: none` | rigid, no grow/shrink |
| `flex-wrap` | `flex-wrap: wrap` | |
| `flex-nowrap` | `flex-wrap: nowrap` | |
| `flex-wrap-reverse` | `flex-wrap: wrap-reverse` | |
| `basis-{n}` | `flex-basis` | spacing scale + `1/2=50%`, `1/3=33.33%`, `full=100%` |
| `order-{n}` | `order: n` | 1–12, `first=-9999`, `last=9999`, `none=0` |
| `self-auto` | `align-self: auto` | |
| `self-start` | `align-self: flex-start` | |
| `self-end` | `align-self: flex-end` | |
| `self-center` | `align-self: center` | |
| `self-stretch` | `align-self: stretch` | |
| `self-baseline` | `align-self: baseline` | |
| `content-start` | `align-content: flex-start` | |
| `content-end` | `align-content: flex-end` | |
| `content-center` | `align-content: center` | |
| `content-between` | `align-content: space-between` | |
| `content-around` | `align-content: space-around` | |
| `content-evenly` | `align-content: space-evenly` | |
| `content-stretch` | `align-content: stretch` | |

**Arbitrary examples:**
- `basis-[200px]` → `flex-basis: 200px`
- `order-[5]` → `order: 5`

---

## Background Extras

| Class | CSS |
|---|---|
| `bg-cover` | `background-size: cover` |
| `bg-contain` | `background-size: contain` |
| `bg-auto` | `background-size: auto` |
| `bg-center` | `background-position: center` |
| `bg-top` | `background-position: top` |
| `bg-bottom` | `background-position: bottom` |
| `bg-left` | `background-position: left` |
| `bg-right` | `background-position: right` |
| `bg-left-top` | `background-position: left top` |
| `bg-right-top` | `background-position: right top` |
| `bg-left-bottom` | `background-position: left bottom` |
| `bg-right-bottom` | `background-position: right bottom` |
| `bg-no-repeat` | `background-repeat: no-repeat` |
| `bg-repeat` | `background-repeat: repeat` |
| `bg-repeat-x` | `background-repeat: repeat-x` |
| `bg-repeat-y` | `background-repeat: repeat-y` |
| `bg-fixed` | `background-attachment: fixed` |
| `bg-local` | `background-attachment: local` |
| `bg-scroll` | `background-attachment: scroll` |

**Arbitrary examples:**
- `bg-[url('/hero.jpg')]` → `background-image: url('/hero.jpg')`
- `bg-[length:200px_100px]` → arbitrary background-size (using CSS property hint prefix)

---

## Border Color + Border Style

| Class | CSS | Example |
|---|---|---|
| `border-{color}-{shade}` | `border-color` | `border-red-500` → `border-color: #ef4444` |
| `border-t-{color}-{shade}` | `border-top-color` | `border-t-blue-300` → top border color |
| `border-b-{color}-{shade}` | `border-bottom-color` | |
| `border-l-{color}-{shade}` | `border-left-color` | |
| `border-r-{color}-{shade}` | `border-right-color` | |
| `border-solid` | `border-style: solid` | default style |
| `border-dashed` | `border-style: dashed` | |
| `border-dotted` | `border-style: dotted` | |
| `border-double` | `border-style: double` | |
| `border-hidden` | `border-style: hidden` | |
| `border-none` | `border-style: none` | |

**Arbitrary examples:**
- `border-[#ddd]` → `border-color: #ddd`
- `border-t-[rgba(0,0,0,0.1)]` → `border-top-color: rgba(0,0,0,0.1)`

**Common pattern:** `border border-2 border-solid border-gray-300 rounded-lg`

---

## Outline

| Class | CSS | Example |
|---|---|---|
| `outline-none` | `outline: 2px solid transparent; outline-offset: 2px` | removes visible outline |
| `outline` | `outline-style: solid` | |
| `outline-dashed` | `outline-style: dashed` | |
| `outline-dotted` | `outline-style: dotted` | |
| `outline-double` | `outline-style: double` | |
| `outline-0` | `outline-width: 0px` | |
| `outline-1` | `outline-width: 1px` | |
| `outline-2` | `outline-width: 2px` | |
| `outline-4` | `outline-width: 4px` | |
| `outline-8` | `outline-width: 8px` | |
| `outline-{color}-{shade}` | `outline-color` | `outline-blue-500` |
| `outline-offset-0` | `outline-offset: 0px` | |
| `outline-offset-1` | `outline-offset: 1px` | |
| `outline-offset-2` | `outline-offset: 2px` | |
| `outline-offset-4` | `outline-offset: 4px` | |
| `outline-offset-8` | `outline-offset: 8px` | |

**Arbitrary examples:**
- `outline-[3px]` → `outline-width: 3px`
- `outline-[#007bff]` → `outline-color: #007bff`
- `outline-offset-[3px]` → `outline-offset: 3px`

**Common pattern:** `focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500`

---

## Space Between (child spacing)

Applies margin to all direct children (except the first), spacing them evenly without needing gap on a flex/grid container.

| Class | CSS applied to children | Example |
|---|---|---|
| `space-x-{n}` | `margin-left: value` on every child except first | `space-x-4` → 16px gap between children horizontally |
| `space-y-{n}` | `margin-top: value` on every child except first | `space-y-2` → 4px gap between children vertically |
| `space-x-reverse` | `margin-right` instead of `margin-left` | for `flex-direction: row-reverse` |
| `space-y-reverse` | `margin-bottom` instead of `margin-top` | for `flex-direction: column-reverse` |

**Implementation note:** The applier iterates `el.children` and directly sets margins on child elements. The cache stores the parent class but the styles are applied on the children.

**Arbitrary examples:**
- `space-x-[12px]` → `margin-left: 12px` on children
- `space-y-[8px]` → `margin-top: 8px` on children

---

## Aspect Ratio

| Class | CSS | Example |
|---|---|---|
| `aspect-auto` | `aspect-ratio: auto` | browser default |
| `aspect-square` | `aspect-ratio: 1 / 1` | perfect square |
| `aspect-video` | `aspect-ratio: 16 / 9` | widescreen video |

**Arbitrary examples:**
- `aspect-[4/3]` → `aspect-ratio: 4/3`
- `aspect-[21/9]` → `aspect-ratio: 21/9`
- `aspect-[1/1]` → same as `aspect-square`

---

## Object Fit + Object Position

| Class | CSS | Use case |
|---|---|---|
| `object-contain` | `object-fit: contain` | fit inside bounds, preserve ratio |
| `object-cover` | `object-fit: cover` | fill bounds, crop if needed |
| `object-fill` | `object-fit: fill` | stretch to fill (distorts) |
| `object-none` | `object-fit: none` | natural size, clip to box |
| `object-scale-down` | `object-fit: scale-down` | smaller of contain/none |
| `object-center` | `object-position: center` | |
| `object-top` | `object-position: top` | |
| `object-bottom` | `object-position: bottom` | |
| `object-left` | `object-position: left` | |
| `object-right` | `object-position: right` | |
| `object-left-top` | `object-position: left top` | |
| `object-right-top` | `object-position: right top` | |
| `object-left-bottom` | `object-position: left bottom` | |
| `object-right-bottom` | `object-position: right bottom` | |

**Common pattern:** `<img class="w-full h-48 object-cover object-center" />`

---

## Additional Modifiers

### focus-visible (`focus-visible:`)
Applies only when focused via keyboard (Tab key), not mouse click. Essential for accessible focus rings.

```html
<button class="outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500">
  Click me
</button>
```

**Implementation:** `focus` event → check `el.matches(':focus-visible')` → apply if true. `blur` → restore.

---

### disabled (`disabled:`)
Applies when the element has a `disabled` attribute.

```html
<button class="bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
  Submit
</button>
```

**Implementation:** On init, check `el.hasAttribute('disabled')`. MutationObserver watches `disabled` attribute changes.

---

### first / last (`first:`, `last:`)
Applies to the first or last child of a parent element.

```html
<ul>
  <li class="py-2 first:pt-0 last:pb-0">Item</li>
  <li class="py-2 first:pt-0 last:pb-0">Item</li>
</ul>
```

**Implementation:** On init, check `el === el.parentElement?.firstElementChild` / `lastElementChild`. Re-evaluated by MutationObserver when siblings change.

---

### odd / even (`odd:`, `even:`)
Applies to elements at odd (1st, 3rd, 5th…) or even (2nd, 4th, 6th…) positions within their parent.

```html
<tr class="odd:bg-gray-100 even:bg-white">...</tr>
```

**Implementation:** Get index among siblings using `Array.from(el.parentElement.children).indexOf(el)`. Odd = index % 2 === 0, Even = index % 2 === 1 (0-based). Re-evaluated when MutationObserver detects sibling changes.

---

### group-hover (`group` + `group-hover:`)
Marks a parent as a group root and lets child elements respond to the parent's hover state.

```html
<div class="group p-4 bg-white hover:bg-blue-500">
  <p class="text-black group-hover:text-white">I change color when parent is hovered</p>
  <span class="opacity-0 group-hover:opacity-100">I appear on parent hover</span>
</div>
```

**Implementation:**
1. Scan for elements with `group` class → mark as group roots (no style applied)
2. For each element with `group-hover:*` class → find nearest ancestor with `group`
3. Register child under that ancestor's group
4. `mouseenter` on group root → apply group-hover styles on all registered children
5. `mouseleave` on group root → restore original styles on all children
6. MutationObserver handles dynamically added group elements

---

## Project Structure

```
snapcss/
├── packages/
│   ├── core/          ← main runtime engine
│   ├── parser/        ← class string parsing
│   ├── utilities/     ← token maps (spacing, colors, etc.)
│   ├── themes/        ← default theme + configure API
│   ├── presets/       ← future: pre-built class collections
│   └── cli/           ← future: CLI tool
├── playground/
│   ├── index.html     ← demo page
│   ├── app.js         ← calls snapcss.init()
│   └── server.js      ← Express static server
├── tests/
├── examples/
├── docs/
├── tsconfig.json
├── tsup.config.ts
└── package.json
```

---

## Step-by-Step Implementation

### Step 1 — Project Scaffolding
- Root `package.json` with npm workspaces
- `tsconfig.json` — strict TypeScript, ES2020, composite references
- ESLint + Prettier config
- Per-package `package.json` files for each workspace

### Step 2 — Utility Config Maps (`packages/utilities/src/`)
Raw token maps that the resolver uses for scale-based values:

| File | Contents |
|---|---|
| `spacing.ts` | `{ 0: "0px", 1: "2px", 2: "4px", 3: "8px", 4: "16px", 5: "32px", ... }` — used by padding, margin, inset, translate, gap |
| `colors.ts` | Full palette: 22 color families × shades 50–950, plus white/black/transparent — used by text, bg, border, outline |
| `typography.ts` | `fontSizes`, `fontWeights`, `lineHeights`, `letterSpacing`, `fontFamilies` |
| `layout.ts` | display, position, overflow, z-index scale, visibility, float, clear, box-sizing values |
| `flexbox.ts` | justify-content, align-items, align-self, align-content, flex-direction, flex-wrap, order, gap values |
| `grid.ts` | grid-template-columns/rows presets, col-span/row-span, grid-flow, auto-cols/rows |
| `sizing.ts` | width/height values (%, px, rem, auto, full, screen, fit, min, max, fractions) |
| `borders.ts` | border-width scale `{ 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }`, border-radius scale, border-style values |
| `shadows.ts` | Pre-defined box-shadow values: sm, default, md, lg, xl, 2xl, inner, none |
| `transitions.ts` | transition-property presets, duration scale (75–1000ms), easing values, delay scale |
| `transforms.ts` | scale values (as decimals: 0→0, 50→0.5, 110→1.1), rotate values (deg), skew values (deg) |
| `backgrounds.ts` | bg-size, bg-position, bg-repeat, bg-attachment named values |

### Step 3 — Parser (`packages/parser/src/`)

**`tokenizer.ts`**

Splits a class string into tokens, treating `[...]` as a single unbreakable token:

```
"bg-red-500"          → ["bg", "red", "500"]
"p-[150px]"           → ["p", "[150px]"]
"pt-2"                → ["pt", "2"]
"px-[24px]"           → ["px", "[24px]"]
"border-t-2"          → ["border", "t", "2"]
"border-t-[3px]"      → ["border", "t", "[3px]"]
"rounded-tl-lg"       → ["rounded", "tl", "lg"]
"grid-cols-[1fr_2fr]" → ["grid", "cols", "[1fr_2fr]"]
```

Key rule: when the tokenizer encounters `[`, everything until the closing `]` is one token. Does not split on `-` inside brackets.

**`modifier.ts`**

Extracts modifiers before `:`:
```
"md:pt-2"                  → { type: "responsive", breakpoint: "md", rest: "pt-2" }
"hover:pb-[10px]"          → { type: "state", state: "hover", rest: "pb-[10px]" }
"focus-visible:outline-2"  → { type: "state", state: "focus-visible", rest: "outline-2" }
"disabled:opacity-50"      → { type: "structural", kind: "disabled", rest: "opacity-50" }
"first:pt-0"               → { type: "structural", kind: "first", rest: "pt-0" }
"last:pb-0"                → { type: "structural", kind: "last", rest: "pb-0" }
"odd:bg-gray-100"          → { type: "structural", kind: "odd", rest: "bg-gray-100" }
"even:bg-white"            → { type: "structural", kind: "even", rest: "bg-white" }
"group-hover:text-white"   → { type: "group", kind: "group-hover", rest: "text-white" }
"dark:bg-black"            → { type: "dark", rest: "bg-black" }
```

**`arbitrary.ts`**

Utility for detecting and extracting arbitrary values:
```ts
isArbitrary("[150px]")       → true
extractArbitrary("[150px]")  → "150px"
extractArbitrary("[1fr_2fr]")→ "1fr 2fr"   // underscore → space
```

**`parser.ts`** — combines tokenizer + modifier + arbitrary detection into a full parsed object:
```ts
parseClass("pt-2")
// → { modifier: null, utility: "pt", value: "2", isArbitrary: false }

parseClass("pt-[150px]")
// → { modifier: null, utility: "pt", value: "150px", isArbitrary: true }

parseClass("rounded-tl-lg")
// → { modifier: null, utility: "rounded-tl", value: "lg", isArbitrary: false }

parseClass("border-t-[3px]")
// → { modifier: null, utility: "border-t", value: "3px", isArbitrary: true }
```

### Step 4 — Resolver (`packages/core/src/resolver.ts`)

Maps a parsed class object → a CSS style object. Returns a `Record<string, string>` which may contain **one or more** CSS properties (for shorthand utilities like `px`, `py`, `mx`, `my`).

**For scale-based values:** look up in utility config maps.
**For arbitrary values:** use the extracted raw value directly.

```ts
// Padding directional — scale
resolve({ utility: "pt", value: "2" })   → { paddingTop: "4px" }
resolve({ utility: "px", value: "4" })   → { paddingLeft: "16px", paddingRight: "16px" }
resolve({ utility: "py", value: "4" })   → { paddingTop: "16px", paddingBottom: "16px" }

// Padding directional — arbitrary
resolve({ utility: "pt", value: "150px", isArbitrary: true }) → { paddingTop: "150px" }
resolve({ utility: "px", value: "24px", isArbitrary: true })  → { paddingLeft: "24px", paddingRight: "24px" }

// Margin directional — scale
resolve({ utility: "mt", value: "2" })   → { marginTop: "4px" }
resolve({ utility: "mx", value: "4" })   → { marginLeft: "16px", marginRight: "16px" }
resolve({ utility: "my", value: "auto"}) → { marginTop: "auto", marginBottom: "auto" }

// Border width directional — scale
resolve({ utility: "border-t", value: "2" }) → { borderTopWidth: "2px" }
resolve({ utility: "border-x", value: "2" }) → { borderLeftWidth: "2px", borderRightWidth: "2px" }

// Border radius directional — scale
resolve({ utility: "rounded-t",  value: "lg" }) → { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }
resolve({ utility: "rounded-tl", value: "lg" }) → { borderTopLeftRadius: "8px" }
```

**Resolver utility key → CSS property mapping (full list):**

| Utility key | CSS properties |
|---|---|
| `p` | `padding` |
| `pt` | `paddingTop` |
| `pb` | `paddingBottom` |
| `pl` | `paddingLeft` |
| `pr` | `paddingRight` |
| `px` | `paddingLeft`, `paddingRight` |
| `py` | `paddingTop`, `paddingBottom` |
| `m` | `margin` |
| `mt` | `marginTop` |
| `mb` | `marginBottom` |
| `ml` | `marginLeft` |
| `mr` | `marginRight` |
| `mx` | `marginLeft`, `marginRight` |
| `my` | `marginTop`, `marginBottom` |
| `border` | `borderWidth` |
| `border-t` | `borderTopWidth` |
| `border-b` | `borderBottomWidth` |
| `border-l` | `borderLeftWidth` |
| `border-r` | `borderRightWidth` |
| `border-x` | `borderLeftWidth`, `borderRightWidth` |
| `border-y` | `borderTopWidth`, `borderBottomWidth` |
| `rounded` | `borderRadius` |
| `rounded-t` | `borderTopLeftRadius`, `borderTopRightRadius` |
| `rounded-b` | `borderBottomLeftRadius`, `borderBottomRightRadius` |
| `rounded-l` | `borderTopLeftRadius`, `borderBottomLeftRadius` |
| `rounded-r` | `borderTopRightRadius`, `borderBottomRightRadius` |
| `rounded-tl` | `borderTopLeftRadius` |
| `rounded-tr` | `borderTopRightRadius` |
| `rounded-bl` | `borderBottomLeftRadius` |
| `rounded-br` | `borderBottomRightRadius` |
| `bg` | `backgroundColor` |
| `text` | `fontSize` or `color` (determined by value type) |
| `font` | `fontWeight` |
| `leading` | `lineHeight` |
| `tracking` | `letterSpacing` |
| `w` | `width` |
| `h` | `height` |
| `max-w` | `maxWidth` |
| `min-w` | `minWidth` |
| `max-h` | `maxHeight` |
| `min-h` | `minHeight` |
| `flex` | `display: flex` or `flex` property |
| `grow` | `flexGrow` |
| `shrink` | `flexShrink` |
| `basis` | `flexBasis` |
| `order` | `order` |
| `self` | `alignSelf` |
| `content` | `alignContent` |
| `grid-cols` | `gridTemplateColumns` |
| `grid-rows` | `gridTemplateRows` |
| `col-span` | `gridColumn` |
| `row-span` | `gridRow` |
| `gap` | `gap` |
| `gap-x` | `columnGap` |
| `gap-y` | `rowGap` |
| `top` | `top` |
| `right` | `right` |
| `bottom` | `bottom` |
| `left` | `left` |
| `inset` | `top`, `right`, `bottom`, `left` |
| `inset-x` | `left`, `right` |
| `inset-y` | `top`, `bottom` |
| `z` | `zIndex` |
| `opacity` | `opacity` |
| `shadow` | `boxShadow` |
| `transition` | `transitionProperty`, `transitionTimingFunction`, `transitionDuration` |
| `duration` | `transitionDuration` |
| `ease` | `transitionTimingFunction` |
| `delay` | `transitionDelay` |
| `scale` | `scale` (CSS Transforms Level 2) |
| `scale-x` | `scale` (n 1) |
| `scale-y` | `scale` (1 n) |
| `rotate` | `rotate` (CSS Transforms Level 2) |
| `translate-x` | `translate` (v 0) |
| `translate-y` | `translate` (0 v) |
| `skew-x` | `transform: skewX(n)` |
| `skew-y` | `transform: skewY(n)` |
| `origin` | `transformOrigin` |
| `cursor` | `cursor` |
| `pointer-events` | `pointerEvents` |
| `select` | `userSelect` |
| `outline` | `outlineStyle` |
| `outline-{n}` | `outlineWidth` |
| `outline-offset` | `outlineOffset` |
| `aspect` | `aspectRatio` |
| `object` | `objectFit` or `objectPosition` |
| `space-x` | `marginLeft` on children (except first) |
| `space-y` | `marginTop` on children (except first) |
| `border-color` | `borderColor` |
| `border-solid/dashed/…` | `borderStyle` |
| `bg-cover/contain/…` | `backgroundSize` |
| `bg-center/top/…` | `backgroundPosition` |
| `bg-no-repeat/…` | `backgroundRepeat` |
| `bg-fixed/…` | `backgroundAttachment` |

### Step 5 — Cache (`packages/core/src/cache.ts`)

```ts
Map<string, Record<string, string>>
```

- Full class string is the cache key (e.g., `"pt-[150px]"`, `"rounded-tl-lg"`)
- Works identically for all utility types — scale, arbitrary, directional
- `getStyle(cls)` / `setStyle(cls, styles)` / `clearCache()`

### Step 6 — Scanner + Applier
- **`scanner.ts`** — `querySelectorAll("*")`, collect all class names from every element
- **`applier.ts`** — `Object.assign(el.style, styles)` to apply; removes specific keys on teardown (handles multi-property utilities like `px` correctly — removes both `paddingLeft` and `paddingRight`)

### Step 7 — States Handler (`packages/core/src/states.ts`)
For `hover:*`, `focus:*`, `focus-visible:*`, `active:*`:
- `hover` → `mouseenter`/`mouseleave`
- `focus` → `focus`/`blur`
- `focus-visible` → `focus` event + check `el.matches(':focus-visible')` → only apply if true
- `active` → `mousedown`/`mouseup`+`mouseleave`
- Store original styles before overwriting → restore on event end
- Works with all utility forms: `hover:pt-[10px]`, `focus-visible:outline-2`, `active:scale-95`

### Step 7b — Structural Modifiers (`packages/core/src/structural.ts`)
For `disabled:*`, `first:*`, `last:*`, `odd:*`, `even:*`:
- **disabled:** check `el.hasAttribute('disabled')` on init; MutationObserver watches `disabled` attribute changes
- **first:** check `el === el.parentElement?.firstElementChild` on init
- **last:** check `el === el.parentElement?.lastElementChild` on init
- **odd/even:** compute `Array.from(el.parentElement.children).indexOf(el)` on init; odd = index % 2 === 0, even = index % 2 === 1 (0-based)
- Re-evaluated when MutationObserver detects child-list changes in the parent

### Step 7c — Group Hover (`packages/core/src/group.ts`)
For `group` parent and `group-hover:*` children:
- Scan for all elements with `group` class → register as group roots (no CSS applied)
- For each element with `group-hover:*` → find nearest ancestor with `group` → register under that group
- `mouseenter` on group root → resolve + apply group-hover styles on all registered children
- `mouseleave` on group root → restore saved original styles on all children
- MutationObserver handles dynamically added group elements

### Step 8 — Responsive Handler (`packages/core/src/responsive.ts`)
Breakpoints: `{ sm: 640, md: 768, lg: 1024, xl: 1280 }`
- Apply responsive classes based on `window.innerWidth`
- Re-evaluate on `resize` event (debounced 150ms)
- Works with all directional forms: `md:pt-4`, `lg:mx-[30px]`

### Step 9 — Dark Mode (`packages/core/src/darkmode.ts`)
- Detect via `window.matchMedia("(prefers-color-scheme: dark)")`
- Apply `dark:*` classes when active
- Works with directional forms: `dark:pt-4`, `dark:border-t-[2px]`

### Step 10 — MutationObserver (`packages/core/src/observer.ts`)
```ts
new MutationObserver(mutations => {
  // process newly added nodes
  // re-process nodes whose class attribute changed
}).observe(document.body, { childList: true, subtree: true, attributes: true });
```

### Step 11 — Theme System (`packages/themes/src/`)
- `default.ts` — exports `defaultTheme` combining all utility maps
- `configure()` — deep-merges user overrides over default theme
```ts
snapcss.configure({
  theme: {
    colors: { brand: { 500: "#ff5733" } }
  }
});
```

### Step 12 — Main Init (`packages/core/src/index.ts`)
```ts
export function init(options?: SnapCSSOptions) {
  applyTheme(options?.theme);
  const elements = scanDOM();
  elements.forEach(({ el, snapClasses }) => {
    snapClasses.forEach(cls => {
      const parsed = parseClass(cls);
      if (parsed.modifier?.type === "state") setupStateHandler(el, parsed);           // hover, focus, focus-visible, active
      else if (parsed.modifier?.type === "structural") applyStructural(el, parsed);  // disabled, first, last, odd, even
      else if (parsed.modifier?.type === "group") registerGroupHover(el, parsed);    // group-hover
      else if (parsed.modifier?.type === "responsive") storeResponsive(el, parsed);
      else if (parsed.modifier?.type === "dark") storeDark(el, parsed);
      else applyStyles(el, getFromCacheOrResolve(cls, parsed));
    });
  });
  applyResponsive(responsiveElements);
  applyDarkMode(darkElements);
  setupGroupHoverListeners();
  setupResizeListener(responsiveElements);
  setupDarkModeListener(darkElements);
  setupMutationObserver();
}
document.addEventListener("DOMContentLoaded", () => init());
```

### Step 13 — Express Playground (`playground/`)
- `server.js` — Express static file server on port 3000
- `index.html` — full demo including directional padding/margin/border/radius + arbitrary values
- `app.js` — imports and calls `snapcss.init()`

### Step 14 — Build Config (`tsup.config.ts`)
```ts
defineConfig({
  entry: ["packages/core/src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  minify: true,
  sourcemap: true,
});
```

### Step 15 — Tests (`tests/`)
Using **Vitest**:
- `parser.test.ts` — all class formats including directional and arbitrary
- `resolver-spacing.test.ts` — all padding variants (p, pt, pb, pl, pr, px, py) scale + arbitrary
- `resolver-margin.test.ts` — all margin variants (m, mt, mb, ml, mr, mx, my) scale + arbitrary
- `resolver-border.test.ts` — border-width directional + border-radius directional
- `resolver-typography.test.ts` / `resolver-colors.test.ts` / etc.
- `cache.test.ts`, `scanner.test.ts`, `integration.test.ts`
- Performance: 1000 nodes under 50ms

### Step 16 — npm Package Setup
```json
{
  "name": "snapcss",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    }
  }
}
```

---

## Full Utility Reference

### Spacing (padding + margin)

| Utility | Scale | Arbitrary |
|---|---|---|
| `p-{n}` | `p-4` → `padding: 16px` | `p-[150px]` → `padding: 150px` |
| `pt-{n}` | `pt-2` → `padding-top: 4px` | `pt-[150px]` → `padding-top: 150px` |
| `pb-{n}` | `pb-2` → `padding-bottom: 4px` | `pb-[2rem]` |
| `pl-{n}` | `pl-2` → `padding-left: 4px` | `pl-[24px]` |
| `pr-{n}` | `pr-2` → `padding-right: 4px` | `pr-[24px]` |
| `px-{n}` | `px-4` → left+right 16px | `px-[24px]` → left+right 24px |
| `py-{n}` | `py-4` → top+bottom 16px | `py-[2rem]` → top+bottom 2rem |
| `m-{n}` | `m-4` → `margin: 16px` | `m-[2rem]` |
| `mt-{n}` | `mt-2` → `margin-top: 4px` | `mt-[150px]` |
| `mb-{n}` | `mb-2` → `margin-bottom: 4px` | `mb-[2rem]` |
| `ml-{n}` | `ml-2` → `margin-left: 4px` | `ml-[30px]` |
| `mr-{n}` | `mr-2` → `margin-right: 4px` | `mr-[30px]` |
| `mx-{n}` | `mx-auto` → left+right auto | `mx-[30px]` |
| `my-{n}` | `my-4` → top+bottom 16px | `my-[2rem]` |

### Borders

| Utility | Scale | Arbitrary |
|---|---|---|
| `border-{n}` | `border-2` → `border-width: 2px` | `border-[3px]` |
| `border-t-{n}` | `border-t-2` → `border-top-width: 2px` | `border-t-[3px]` |
| `border-b-{n}` | `border-b-2` → `border-bottom-width: 2px` | `border-b-[3px]` |
| `border-l-{n}` | `border-l-2` → `border-left-width: 2px` | `border-l-[3px]` |
| `border-r-{n}` | `border-r-2` → `border-right-width: 2px` | `border-r-[3px]` |
| `border-x-{n}` | `border-x-2` → left+right 2px | `border-x-[2px]` |
| `border-y-{n}` | `border-y-2` → top+bottom 2px | `border-y-[2px]` |

### Border Radius

| Utility | CSS properties | Scale | Arbitrary |
|---|---|---|---|
| `rounded-{s}` | `border-radius` | `rounded-lg` → 8px | `rounded-[6px]` |
| `rounded-t-{s}` | top-left + top-right | `rounded-t-lg` | `rounded-t-[12px]` |
| `rounded-b-{s}` | bottom-left + bottom-right | `rounded-b-lg` | `rounded-b-[12px]` |
| `rounded-l-{s}` | top-left + bottom-left | `rounded-l-lg` | `rounded-l-[12px]` |
| `rounded-r-{s}` | top-right + bottom-right | `rounded-r-lg` | `rounded-r-[12px]` |
| `rounded-tl-{s}` | `border-top-left-radius` | `rounded-tl-lg` | `rounded-tl-[8px]` |
| `rounded-tr-{s}` | `border-top-right-radius` | `rounded-tr-lg` | `rounded-tr-[8px]` |
| `rounded-bl-{s}` | `border-bottom-left-radius` | `rounded-bl-lg` | `rounded-bl-[8px]` |
| `rounded-br-{s}` | `border-bottom-right-radius` | `rounded-br-lg` | `rounded-br-[8px]` |

Border radius scale: `none=0`, `sm=2px`, `md=4px` (default), `lg=8px`, `xl=12px`, `2xl=16px`, `3xl=24px`, `full=9999px`

### Other Utilities

| Category | Scale Classes | Arbitrary Classes |
|---|---|---|
| Layout | `block`, `flex`, `grid`, `hidden`, `visible`, `invisible` | — |
| Position | `relative`, `absolute`, `fixed`, `sticky` | — |
| Inset | `top-4`, `inset-0`, `inset-x-2` | `top-[10px]`, `inset-[50%]` |
| Flexbox | `flex-row`, `justify-center`, `items-center`, `grow`, `shrink-0`, `self-center` | `gap-[12px]`, `basis-[200px]` |
| Grid | `grid-cols-3`, `col-span-2` | `grid-cols-[1fr_2fr_1fr]`, `grid-rows-[auto_1fr]` |
| Sizing | `w-full`, `h-screen`, `max-w-lg` | `w-[200px]`, `h-[50vh]`, `max-w-[800px]` |
| Typography | `text-xl`, `font-bold`, `leading-6`, `uppercase`, `italic`, `truncate` | `text-[20px]`, `font-[600]`, `leading-[1.8]` |
| Text color | `text-red-500` | `text-[rgba(0,0,0,0.5)]` |
| Background | `bg-red-500`, `bg-cover`, `bg-center`, `bg-no-repeat` | `bg-[#ff5733]`, `bg-[url('/img.png')]` |
| Border color | `border-red-500`, `border-t-blue-300` | `border-[#ddd]` |
| Border style | `border-solid`, `border-dashed`, `border-dotted` | — |
| Shadow | `shadow-sm`, `shadow-lg`, `shadow-inner` | `shadow-[0_4px_6px_rgba(0,0,0,0.1)]` |
| Transitions | `transition`, `duration-300`, `ease-in-out`, `delay-100` | `duration-[400ms]` |
| Transforms | `scale-110`, `rotate-45`, `translate-x-4` | `rotate-[-45deg]`, `scale-[1.35]` |
| Cursor | `cursor-pointer`, `cursor-not-allowed` | — |
| Outline | `outline-none`, `outline-2`, `outline-blue-500` | `outline-[3px]` |
| Space between | `space-x-4`, `space-y-2` | `space-x-[12px]` |
| Aspect ratio | `aspect-square`, `aspect-video` | `aspect-[4/3]` |
| Object | `object-cover`, `object-center` | — |
| Z-index | `z-10`, `z-50` | `z-[100]` |
| Opacity | `opacity-50`, `opacity-0` | `opacity-[0.75]` |
| States | `hover:bg-red-500`, `focus-visible:outline-2`, `disabled:opacity-50` | `hover:pt-[10px]` |
| Structural | `first:pt-0`, `last:pb-0`, `odd:bg-gray-100`, `even:bg-white` | `first:p-[10px]` |
| Group hover | `group` + `group-hover:text-white` | `group-hover:bg-[#ff5733]` |
| Responsive | `sm:p-2`, `md:flex`, `lg:grid-cols-3` | `md:pt-[150px]`, `lg:mx-[30px]` |
| Dark Mode | `dark:bg-black`, `dark:text-white` | `dark:bg-[#1a1a1a]`, `dark:text-[#eee]` |

---

## How Arbitrary Values Work Internally

```
Input class: "px-[24px]"
      ↓
Tokenizer:   detects "[" → tokens: ["px", "[24px]"]
      ↓
arbitrary.ts: isArbitrary("[24px]") = true → extractArbitrary → "24px"
      ↓
Parser output: { utility: "px", value: "24px", isArbitrary: true }
      ↓
Resolver:    utility "px" → CSS properties paddingLeft + paddingRight
             isArbitrary=true → use "24px" directly
             → { paddingLeft: "24px", paddingRight: "24px" }
      ↓
Cache:       stores { "px-[24px]": { paddingLeft: "24px", paddingRight: "24px" } }
      ↓
Applier:     Object.assign(el.style, { paddingLeft: "24px", paddingRight: "24px" })
```

---

## Verification Checklist

- [ ] `npx vitest run` — all tests pass
- [ ] `node playground/server.js` → open `http://localhost:3000` — all utilities visually work
- [ ] `pt-2` → only `padding-top` changes, other sides unaffected
- [ ] `px-4` → both `padding-left` and `padding-right` set, top/bottom unaffected
- [ ] `py-4` → both `padding-top` and `padding-bottom` set, left/right unaffected
- [ ] Same behavior verified for all `mt/mb/ml/mr/mx/my` margin utilities
- [ ] `border-t-2` → only top border width set
- [ ] `border-x-2` → left and right border width set, top/bottom unaffected
- [ ] `rounded-tl-lg` → only top-left corner rounded
- [ ] `rounded-t-lg` → top-left and top-right rounded, bottom unaffected
- [ ] Arbitrary values: `pt-[150px]`, `mx-[30px]`, `border-t-[3px]`, `rounded-tl-[8px]`
- [ ] Modifiers + directional: `hover:pt-[10px]`, `md:px-[24px]`, `dark:border-t-2`
- [ ] Inset: `top-4`, `inset-0`, `inset-x-[50%]` on positioned elements
- [ ] Shadow: `shadow-lg`, `shadow-inner`, `shadow-[0_4px_6px_rgba(0,0,0,0.1)]`
- [ ] Transitions: `transition duration-300 ease-in-out` smoothly animates hover changes
- [ ] Transforms: `scale-110 rotate-45` compose correctly on the same element
- [ ] Negative arbitrary transforms: `rotate-[-45deg]`, `translate-x-[-16px]`
- [ ] Text: `uppercase`, `italic`, `truncate`, `line-clamp-2`
- [ ] Cursor: `cursor-pointer`, `cursor-not-allowed`
- [ ] Overflow directional: `overflow-x-hidden overflow-y-auto`
- [ ] Visibility: `invisible` hides element but keeps layout space; `hidden` removes from layout
- [ ] Flex extras: `grow shrink-0`, `flex-1`, `self-center`, `order-last`
- [ ] Background: `bg-cover bg-center bg-no-repeat` on image background
- [ ] Border color+style: `border border-2 border-dashed border-red-500`
- [ ] Outline: `outline-none` removes focus ring; `focus-visible:outline focus-visible:outline-2` adds keyboard-only ring
- [ ] Space between: `space-x-4` applies margin to children, not the container
- [ ] Aspect ratio: `aspect-square`, `aspect-video`, `aspect-[4/3]`
- [ ] Object fit: `object-cover object-center` on `<img>`
- [ ] focus-visible: applies on Tab key focus, NOT on mouse click
- [ ] disabled: `disabled:opacity-50` applies when `disabled` attribute added; removes when attribute removed
- [ ] first/last: `first:pt-0 last:pb-0` on list items — only first and last items affected
- [ ] odd/even: `odd:bg-gray-100 even:bg-white` alternates correctly on table rows
- [ ] group-hover: child changes style when parent (with `group`) is hovered
- [ ] Resize browser → responsive classes apply/remove correctly
- [ ] Toggle OS dark mode → dark classes apply/remove
- [ ] Hover/focus/click elements → state classes apply/remove
- [ ] Dynamically append element → MutationObserver picks it up and applies all modifiers correctly
- [ ] `npx tsup` → `dist/` has `.js`, `.mjs`, `.d.ts` files
- [ ] Performance: 1000-node scan completes under 50ms
