// Mapeamento simples de cores para linguagens populares (GitHub palette aproximada)
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  CSharp: '#178600',
  Shell: '#89e051',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138'
};

export function colorWithAlpha(hex: string, alpha = 0.15) {
  // supports #rrggbb only
  if (!hex || !hex.startsWith('#') || (hex.length !== 7)) return 'rgba(255,255,255,0.1)';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
