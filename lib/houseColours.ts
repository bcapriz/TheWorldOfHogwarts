const COLOR_WORD_MAP: Record<string, string> = {
  scarlet: '#9e1b32',
  gold: '#d3a625',
  blue: '#222f5b',
  bronze: '#946b2d',
  yellow: '#ecb939',
  black: '#0c0a0a',
  green: '#1a472a',
  silver: '#aaaaaa',
  grey: '#5d5d5d',
  gray: '#5d5d5d',
};

const FALLBACK: [string, string] = ['#71717a', '#a1a1aa'];

/**
 * Derives a two-tone accent from the API's free-text `houseColours` field
 * (e.g. "Scarlet and gold") so the UI can reflect each house's identity
 * without hardcoding a house-name lookup table.
 */
export function parseHouseColours(houseColours: string): [string, string] {
  const words = houseColours
    .toLowerCase()
    .split(/\s+and\s+|,\s*/)
    .map((word) => word.trim())
    .filter(Boolean);

  const primary = COLOR_WORD_MAP[words[0]] ?? FALLBACK[0];
  const secondary = COLOR_WORD_MAP[words[1]] ?? FALLBACK[1];
  return [primary, secondary];
}
