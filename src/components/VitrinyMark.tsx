import { palette } from '../theme';

interface VitrinyMarkProps {
  size?: number;
}

export function VitrinyMark({ size = 32 }: VitrinyMarkProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="vitrinyGradient" x1="4" y1="6" x2="44" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={palette.accent} />
          <stop offset="1" stopColor={palette.highlight} />
        </linearGradient>
      </defs>
      <path d="M8 8 L24 40 L40 8" stroke="url(#vitrinyGradient)" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
