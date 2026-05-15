import { ComponentType } from 'react'
import { Introduction, Installation, QuickStart, Compatibility } from './getting-started'
import { ClassSyntax, ArbitraryValues, ModifiersOverview } from './core-concepts'
import { Padding, Margin, SpaceBetween } from './spacing'
import { Display, Position, Overflow, Visibility } from './layout'
import { FlexBasics, FlexExtras, Grid } from './flex-grid'
import { Sizing, Inset } from './sizing'
import { Typography } from './typography'
import { ColorPalette, BackgroundColor, BackgroundExtras, TextColor } from './colors'
import { BorderWidth, BorderRadius, BorderStyle, Outline } from './borders'
import { Shadows, Opacity, Transitions, Transforms } from './effects'
import { Cursor, PointerEvents, AspectRatio, ObjectFit } from './interactivity'
import {
  HoverFocusActive,
  FocusVisible,
  Responsive,
  DarkMode,
  Disabled,
  FirstLast,
  OddEven,
  GroupHover,
} from './modifiers'
import { ThemeConfig, DynamicDom, Performance } from './advanced'

export const registry: Record<string, ComponentType> = {
  // Getting Started
  'introduction':      Introduction,
  'installation':      Installation,
  'quick-start':       QuickStart,
  'compatibility':     Compatibility,

  // Core Concepts
  'class-syntax':      ClassSyntax,
  'arbitrary-values':  ArbitraryValues,
  'modifiers-overview': ModifiersOverview,

  // Spacing
  'padding':           Padding,
  'margin':            Margin,
  'space-between':     SpaceBetween,

  // Layout
  'display':           Display,
  'position':          Position,
  'overflow':          Overflow,
  'visibility':        Visibility,

  // Flexbox
  'flex-basics':       FlexBasics,
  'flex-extras':       FlexExtras,

  // Grid
  'grid':              Grid,

  // Sizing
  'sizing':            Sizing,
  'inset':             Inset,

  // Typography
  'typography':        Typography,

  // Colors
  'color-palette':     ColorPalette,

  // Backgrounds & Colors
  'background-color':  BackgroundColor,
  'background-extras': BackgroundExtras,
  'text-color':        TextColor,

  // Borders
  'border-width':      BorderWidth,
  'border-radius':     BorderRadius,
  'border-style':      BorderStyle,
  'outline':           Outline,

  // Effects
  'shadows':           Shadows,
  'opacity':           Opacity,
  'transitions':       Transitions,
  'transforms':        Transforms,

  // Interactivity
  'cursor':            Cursor,
  'pointer-events':    PointerEvents,
  'aspect-ratio':      AspectRatio,
  'object-fit':        ObjectFit,

  // Modifiers
  'hover-focus-active': HoverFocusActive,
  'focus-visible':     FocusVisible,
  'responsive':        Responsive,
  'dark-mode':         DarkMode,
  'disabled':          Disabled,
  'first-last':        FirstLast,
  'odd-even':          OddEven,
  'group-hover':       GroupHover,

  // Advanced
  'theme-config':      ThemeConfig,
  'dynamic-dom':       DynamicDom,
  'performance':       Performance,
}
