import type { Token } from './types/type';
import { typeMap } from './constant';
function calcSizeByToken(tokens: Token[]): number {
  let total = 0;
  for (const t of tokens) {
    const type = typeMap[t.code];
    if (!type) throw new Error(`Unknown format code: ${t.code}`);
    total += type.size * t.count;
  }
  return total;
}
export default calcSizeByToken;
