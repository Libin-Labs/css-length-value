export type Unit = 'px' | 'rem' | 'em' | 'vw' | 'vh' | '%';
export interface Length {
  readonly value: number;
  readonly unit: Unit;
}
export interface Bases {
  readonly rootFontSize?: number;
  readonly fontSize?: number;
  readonly viewportWidth?: number;
  readonly viewportHeight?: number;
  readonly percentBase?: number;
}
export function parseLength(text: string): Length {
  if (typeof text !== 'string' || text.length > 64) throw new TypeError('Expected length token');
  const m = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(px|rem|em|vw|vh|%)$/.exec(text.trim());
  if (!m) throw new TypeError('Unsupported CSS length token');
  const value = Number(m[1]);
  if (!Number.isFinite(value)) throw new RangeError('Length must be finite');
  return { value, unit: m[2] as Unit };
}
export function toPixels(length: Length, bases: Bases = {}): number {
  if (!Number.isFinite(length.value) || !['px', 'rem', 'em', 'vw', 'vh', '%'].includes(length.unit))
    throw new TypeError('Invalid length');
  const base = (v: number | undefined, name: string) => {
    if (v === undefined || !Number.isFinite(v)) throw new RangeError(name + ' base is required');
    return v;
  };
  const factor =
    length.unit === 'px'
      ? 1
      : length.unit === 'rem'
        ? base(bases.rootFontSize, 'rootFontSize')
        : length.unit === 'em'
          ? base(bases.fontSize, 'fontSize')
          : length.unit === 'vw'
            ? base(bases.viewportWidth, 'viewportWidth') / 100
            : length.unit === 'vh'
              ? base(bases.viewportHeight, 'viewportHeight') / 100
              : base(bases.percentBase, 'percentBase') / 100;
  const result = length.value * factor;
  if (!Number.isFinite(result)) throw new RangeError('Pixel conversion overflow');
  return result;
}
