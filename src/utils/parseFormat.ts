import isLE from './isLE';
import type { Token, EndianChar } from '../types/type';

function parseFormat(fmt: string) {
  let endian: EndianChar = '@';
  let pos = 0;
  if (['@', '=', '<', '>', '!'].includes(fmt[0])) {
    endian = fmt[0] as EndianChar;
    pos = 1;
  }
  let littleEndian: boolean;
  switch (endian) {
    case '<':
      littleEndian = true;
      break;
    case '>':
    case '!':
      littleEndian = false;
      break;
    case '=':
    case '@':
    default:
      littleEndian = isLE();
      break;
  }
  const tokens: Token[] = [];
  while (pos < fmt.length) {
    const m = /^(\d*)([xcbBhHiIlLqQfd\?s])/.exec(fmt.slice(pos));
    if (!m) throw new Error(`Invalid format at ${fmt.slice(pos)}`);
    const count = m[1] ? parseInt(m[1], 10) : 1;
    tokens.push({ code: m[2], count });
    pos += m[0].length;
  }
  return { tokens, littleEndian, native: endian === '@' };
}
export default parseFormat;
