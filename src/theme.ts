export const palette = {
  frame: '#08050F',
  bg: '#0F0B1A',
  surface: '#1B1530',
  surfaceRaised: '#251D3E',
  border: '#332A52',
  text: '#F6F4FB',
  textMuted: '#948AB0',
  accent: '#6D28D9',
  highlight: '#A78BFA',
  onAccent: '#FFFFFF',
  danger: '#FF6B7A',
} as const;

import type { CSSProperties } from 'react';

export const numeric: CSSProperties = { fontVariantNumeric: 'tabular-nums' };
